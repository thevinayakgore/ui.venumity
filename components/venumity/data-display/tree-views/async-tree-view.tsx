import { useState, useEffect, useCallback } from "react";

interface TreeNode {
  id: string;
  name: string;
  type: "folder" | "file";
  hasChildren?: boolean;
  children?: TreeNode[];
  size?: string;
  modified?: string;
}

export default function AsyncTreeView() {
  const [treeData, setTreeData] = useState<TreeNode[]>([
    {
      id: "root",
      name: "Cloud Storage",
      type: "folder",
      hasChildren: true,
    },
  ]);

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const fetchChildren = useCallback(
    async (parentId: string): Promise<TreeNode[]> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data based on parent ID
      if (parentId === "root") {
        return [
          {
            id: "documents",
            name: "Documents",
            type: "folder",
            hasChildren: true,
          },
          { id: "images", name: "Images", type: "folder", hasChildren: true },
          { id: "videos", name: "Videos", type: "folder", hasChildren: true },
          {
            id: "readme",
            name: "README.md",
            type: "file",
            size: "2.1 KB",
            modified: "Today",
          },
        ];
      } else if (parentId === "documents") {
        return [
          { id: "reports", name: "Reports", type: "folder", hasChildren: true },
          {
            id: "presentations",
            name: "Presentations",
            type: "folder",
            hasChildren: false,
          },
          {
            id: "proposal",
            name: "Project Proposal.pdf",
            type: "file",
            size: "4.2 MB",
            modified: "Yesterday",
          },
          {
            id: "contract",
            name: "Contract.docx",
            type: "file",
            size: "1.8 MB",
            modified: "2 days ago",
          },
        ];
      } else if (parentId === "images") {
        return [
          {
            id: "vacation",
            name: "Vacation Photos",
            type: "folder",
            hasChildren: true,
          },
          {
            id: "work",
            name: "Work Screenshots",
            type: "folder",
            hasChildren: false,
          },
          {
            id: "logo",
            name: "Company Logo.png",
            type: "file",
            size: "850 KB",
            modified: "1 week ago",
          },
        ];
      } else if (parentId === "reports") {
        return [
          {
            id: "q1",
            name: "Q1 Report.pdf",
            type: "file",
            size: "3.5 MB",
            modified: "Apr 1, 2024",
          },
          {
            id: "q2",
            name: "Q2 Report.pdf",
            type: "file",
            size: "4.1 MB",
            modified: "Jul 1, 2024",
          },
          {
            id: "annual",
            name: "Annual Report.pdf",
            type: "file",
            size: "8.9 MB",
            modified: "Jan 15, 2024",
          },
        ];
      } else if (parentId === "vacation") {
        return [
          {
            id: "beach",
            name: "Beach Photos",
            type: "folder",
            hasChildren: false,
          },
          {
            id: "mountains",
            name: "Mountain Photos",
            type: "folder",
            hasChildren: false,
          },
          {
            id: "sunset",
            name: "Sunset.jpg",
            type: "file",
            size: "2.4 MB",
            modified: "Mar 20, 2024",
          },
        ];
      }

      return [];
    },
    []
  );

  const loadChildren = useCallback(
    async (nodeId: string) => {
      if (loadingNodes.has(nodeId)) return;

      setLoadingNodes((prev) => new Set(prev).add(nodeId));

      try {
        const children = await fetchChildren(nodeId);

        setTreeData((prev) => {
          const updateNode = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map((node) => {
              if (node.id === nodeId) {
                return { ...node, children, hasChildren: children.length > 0 };
              }
              if (node.children) {
                return { ...node, children: updateNode(node.children) };
              }
              return node;
            });
          };

          return updateNode(prev);
        });
      } catch (error) {
        console.error("Failed to load children:", error);
      } finally {
        setLoadingNodes((prev) => {
          const newSet = new Set(prev);
          newSet.delete(nodeId);
          return newSet;
        });
      }
    },
    [loadingNodes, fetchChildren]
  );

  const handleNodeClick = async (node: TreeNode) => {
    setSelectedNode(node.id);

    if (node.type === "folder" && node.hasChildren && !node.children) {
      await loadChildren(node.id);
    }

    if (node.type === "folder") {
      const newExpanded = new Set(expandedNodes);
      if (newExpanded.has(node.id)) {
        newExpanded.delete(node.id);
      } else {
        newExpanded.add(node.id);
      }
      setExpandedNodes(newExpanded);
    }
  };

  const renderTreeNode = (node: TreeNode, depth = 0) => {
    const hasChildren = node.hasChildren;
    const isExpanded = expandedNodes.has(node.id);
    const isLoading = loadingNodes.has(node.id);
    const isSelected = selectedNode === node.id;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center py-2 px-4 rounded-lg cursor-pointer transition-colors ${
            isSelected
              ? "bg-blue-50 border border-blue-200"
              : "hover:bg-gray-50"
          }`}
          style={{ paddingLeft: `${depth * 24 + 16}px` }}
          onClick={() => handleNodeClick(node)}
        >
          <div className="flex items-center space-x-3 flex-1">
            {hasChildren ? (
              <button
                className="w-6 h-6 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                ) : (
                  <span
                    className={`transform transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  >
                    ▶
                  </span>
                )}
              </button>
            ) : (
              <span className="w-6"></span>
            )}

            <span className="text-lg">
              {node.type === "folder" ? (isExpanded ? "📂" : "📁") : "📄"}
            </span>

            <div>
              <div className="font-medium">{node.name}</div>
              {node.type === "file" && (
                <div className="text-sm text-gray-500">
                  {node.size} • {node.modified}
                </div>
              )}
            </div>
          </div>

          {hasChildren && node.children && (
            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
              {node.children.length} items
            </span>
          )}
        </div>

        {hasChildren && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Load root children on mount
  useEffect(() => {
    loadChildren("root");
  }, [loadChildren]);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Cloud File Explorer</h2>
          <p className="text-gray-500">Browse files with async loading</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setExpandedNodes(new Set())}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Collapse All
          </button>
          <button
            onClick={() => {
              const expandAll = (nodes: TreeNode[]): string[] => {
                const ids: string[] = [];
                nodes.forEach((node) => {
                  if (node.type === "folder" && node.hasChildren) {
                    ids.push(node.id);
                    if (node.children) {
                      ids.push(...expandAll(node.children));
                    }
                  }
                });
                return ids;
              };
              setExpandedNodes(new Set(expandAll(treeData)));
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Expand All
          </button>
        </div>
      </div>

      {/* Status bar */}
      <div className="mb-4 flex items-center justify-between text-sm">
        <div className="text-gray-500">
          {loadingNodes.size > 0 ? "Loading..." : "Ready"}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Folder</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>File</span>
          </div>
        </div>
      </div>

      {/* Tree view */}
      <div className="border rounded-lg p-4 h-[500px] overflow-y-auto">
        {treeData.map((node) => renderTreeNode(node))}
      </div>

      {/* Selected node info */}
      {selectedNode && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold mb-3">Selected Item</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {(() => {
              const findNode = (
                nodes: TreeNode[],
                id: string
              ): TreeNode | null => {
                for (const node of nodes) {
                  if (node.id === id) return node;
                  if (node.children) {
                    const found = findNode(node.children, id);
                    if (found) return found;
                  }
                }
                return null;
              };

              const node = findNode(treeData, selectedNode);
              return node ? (
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">
                    {node.type === "folder" ? "📁" : "📄"}
                  </span>
                  <div>
                    <div className="font-bold">{node.name}</div>
                    <div className="text-sm text-gray-500">
                      Type: {node.type === "folder" ? "Folder" : "File"}
                      {node.size && ` • Size: ${node.size}`}
                      {node.modified && ` • Modified: ${node.modified}`}
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
