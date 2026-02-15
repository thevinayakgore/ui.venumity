// app/components/content/folder-structure.tsx
"use client";
import { useState, useEffect } from "react";
import JSZip from "jszip";
import {
  Folder,
  ChevronRight,
  ChevronDown,
  Search,
  X,
  Copy,
  Check,
  Terminal,
  ArrowDownToLine,
} from "lucide-react";
import CodeBlock from "@/components/site/common/code-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  path?: string;
}

interface FolderStructureProps {
  basePath: string;
  componentName: string;
}

export default function FolderStructure({
  basePath,
  componentName,
}: FolderStructureProps) {
  const [structure, setStructure] = useState<FileNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["root"]),
  );
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [fileLoading, setFileLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [filteredStructure, setFilteredStructure] = useState<FileNode | null>(
    null,
  );
  const [downloaded, setDownloaded] = useState(false);

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download folder as zip helper
  const downloadFolderAsZip = async () => {
    if (!structure) return;

    const zip = new JSZip();
    const rootName = structure.name || "component";

    const addNodeToZip = async (node: FileNode, folder: JSZip) => {
      if (node.type === "file" && node.path) {
        const res = await fetch(
          `/api/components/file?path=${encodeURIComponent(node.path)}`,
        );
        if (!res.ok) return;
        const data = await res.json();
        folder.file(node.name, data.content);
      }

      if (node.type === "folder" && node.children) {
        const dir = folder.folder(node.name)!;
        for (const child of node.children) {
          await addNodeToZip(child, dir);
        }
      }
    };

    await addNodeToZip(structure, zip);

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${rootName}.zip`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // Fetch folder structure
  useEffect(() => {
    const fetchStructure = async () => {
      try {
        setLoading(true);
        // If componentName is empty, use just basePath
        // Otherwise, combine them
        const fullPath = componentName
          ? `${basePath}/${componentName}`
          : basePath;

        const response = await fetch(
          `/api/components/structure?path=${fullPath}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch folder structure");
        }

        const data = await response.json();
        setStructure(data);
        setFilteredStructure(data);

        // Auto-expand ROOT folder and ONLY the first child folder
        const initialExpanded = new Set<string>();

        // expand root folder itself
        const rootPath = data.path || data.name;
        initialExpanded.add(rootPath);

        // expand first child folder only
        const firstFolder = data.children?.find(
          (child: FileNode) => child.type === "folder",
        );

        if (firstFolder) {
          initialExpanded.add(firstFolder.path || firstFolder.name);
        }

        setExpandedFolders(initialExpanded);

        // --- Restore initial file auto-selection logic ---
        const findFirstFile = (node: FileNode): FileNode | null => {
          // If the node itself is a file
          if (node.type === "file") return node;

          if (!node.children || node.children.length === 0) return null;

          // 1️⃣ Prefer a file directly under the root folder
          const directFile = node.children.find(
            (child) => child.type === "file",
          );
          if (directFile) return directFile;

          // 2️⃣ Otherwise, go into the first folder and recurse
          const firstFolder = node.children.find(
            (child) => child.type === "folder",
          );

          return firstFolder ? findFirstFile(firstFolder) : null;
        };
        const initialFile = findFirstFile(data);
        if (initialFile) {
          setSelectedFile(initialFile);
        }
        // --- end restore logic ---
      } catch (error) {
        console.error("Error fetching folder structure:", error);
        setStructure(null);
        setFilteredStructure(null);
      } finally {
        setLoading(false);
      }
    };

    if (basePath) {
      fetchStructure();
    }
  }, [basePath, componentName]);

  // Fetch file content when a file is selected
  useEffect(() => {
    const fetchFileContent = async () => {
      if (!selectedFile || selectedFile.type !== "file" || !selectedFile.path)
        return;

      try {
        setFileLoading(true);
        setFileContent("");

        const response = await fetch(
          `/api/components/file?path=${encodeURIComponent(selectedFile.path)}`,
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("File fetch error response:", errorText);
          throw new Error(`Failed to fetch file content: ${response.status}`);
        }

        const data = await response.json();
        setFileContent(data.content);
      } catch (error) {
        console.error("Error fetching file content:", error);
        setFileContent("// Error loading file content");
      } finally {
        setFileLoading(false);
      }
    };

    fetchFileContent();
  }, [selectedFile]);

  // Filter structure based on search query
  useEffect(() => {
    if (!structure) return;

    if (!searchQuery.trim()) {
      setFilteredStructure(structure);
      return;
    }

    const filterNode = (node: FileNode): FileNode | null => {
      const matchesSearch = node.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (node.type === "file") {
        return matchesSearch ? node : null;
      }

      // For folders, filter children
      const filteredChildren = node.children
        ?.map((child) => filterNode(child))
        .filter((child): child is FileNode => child !== null);

      if (matchesSearch || (filteredChildren && filteredChildren.length > 0)) {
        return {
          ...node,
          children: filteredChildren,
        };
      }

      return null;
    };

    const filtered = filterNode(structure);
    setFilteredStructure(filtered);
  }, [structure, searchQuery]);

  const handleDownload = async () => {
    await downloadFolderAsZip();
    setDownloaded(true);

    setTimeout(() => setDownloaded(false), 2000);
  };

  const renderTree = (
    node: FileNode,
    level: number = 0,
    parentPath: string = "",
  ) => {
    const currentPath =
      node.path || (parentPath ? `${parentPath}/${node.name}` : node.name);
    const isExpanded = expandedFolders.has(currentPath);
    const isSelected = selectedFile?.path === currentPath;

    if (node.type === "folder") {
      return (
        <div key={currentPath} className="select-none">
          <div
            className="flex items-center gap-1 p-1.5 border border-transparent hover:border-border hover:bg-muted/70 rounded-sm cursor-pointer transition-all group"
            style={{ marginLeft: `${level * 20}px` }}
            onClick={() => toggleFolder(currentPath)}
          >
            <div className="text-muted-foreground group-hover:text-foreground transition-colors">
              {isExpanded ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </div>
            <Folder
              className={cn(
                "size-4 transition-colors",
                isExpanded
                  ? "text-blue-500 fill-blue-500"
                  : "text-blue-500/50 fill-blue-500/70",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium truncate",
                isExpanded ? "text-foreground" : "text-foreground/50",
              )}
            >
              {node.name}
            </span>
            {node.children && (
              <Badge
                variant="outline"
                className="ml-auto text-[10px] h-5 px-1.5"
              >
                {node.children.length}
              </Badge>
            )}
          </div>

          {isExpanded && node.children && (
            <div className="animate-in slide-in-from-top-1 duration-500">
              {node.children.map((child) =>
                renderTree(child, level + 1, currentPath),
              )}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          key={currentPath}
          className="flex items-center gap-2 py-1.5 px-2 whitespace-nowrap border border-transparent hover:border-border hover:bg-muted/70 text-foreground/50 hover:text-foreground group rounded-sm cursor-pointer transition-all duration-500"
          style={{ marginLeft: `${level * 15 + 25}px` }}
          onClick={() => setSelectedFile(node)}
        >
          <Terminal className={`size-3.5 ${isSelected && "text-blue-500"}`} />
          <span
            className={cn(
              "text-sm flex-1 truncate",
              isSelected && "text-blue-500",
            )}
          >
            {node.name}
          </span>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading folder structure...
          </p>
        </div>
      </div>
    );
  }

  if (!structure) {
    return (
      <div className="flex items-center justify-center p-12 h-96">
        <div className="text-center">
          <Folder className="size-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">
            No folder structure found
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="border rounded-lg overflow-hidden">
      {/* Main content */}
      <div className="grid grid-cols-6 divide-x h-130">
        {/* Tree View */}
        <div className="col-span-2 overflow-auto bg-muted/5">
          {/* Search */}
          <div className="relative border-b">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 z-30 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8.5 h-11 text-sm rounded-none border-none ring-0!"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <div className="py-2 px-3 space-y-0.5">
            {filteredStructure && renderTree(filteredStructure)}
            {filteredStructure?.children?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No files match your search
              </div>
            )}
          </div>
        </div>

        {/* File Content */}
        <div className="col-span-4 flex flex-col overflow-hidden">
          {selectedFile && (
            <>
              {/* File header */}
              <div className="flex items-center justify-between py-1.5 px-3 border-b">
                <div className="flex items-center gap-2 min-w-0">
                  <Terminal className="size-3.5 text-blue-500" />
                  <span className="text-sm font-medium truncate">
                    {selectedFile.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Copy to clipboard"
                        onClick={() => copyToClipboard(fileContent)}
                        className="size-8 cursor-pointer rounded text-foreground/50 hover:text-foreground transition-all duration-500"
                      >
                        {copied ? (
                          <Check className="size-4 text-green-500" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy to clipboard</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Download Folder (.zip)"
                        className="size-8 cursor-pointer rounded text-foreground/50 hover:text-foreground transition-all duration-500"
                        onClick={handleDownload}
                      >
                        {downloaded ? (
                          <Check className="size-4 text-green-500" />
                        ) : (
                          <ArrowDownToLine className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download Folder (.zip)</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Code content */}
              <div className="flex-1 overflow-auto">
                {fileLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      <p className="text-xs opacity-50">Loading file...</p>
                    </div>
                  </div>
                ) : (
                  <CodeBlock
                    code={fileContent}
                    language="tsx"
                    hasCopyBtn={false}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
