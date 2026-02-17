import { useState } from "react";

interface TreeNode {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: TreeNode[];
  size?: string;
  modified?: string;
}

export default function BasicTreeView() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["root", "projects"])
  );

  const treeData: TreeNode = {
    id: "root",
    name: "My Documents",
    type: "folder",
    children: [
      {
        id: "projects",
        name: "Projects",
        type: "folder",
        children: [
          {
            id: "project1",
            name: "Website Redesign",
            type: "folder",
            children: [
              {
                id: "design",
                name: "Design",
                type: "folder",
                children: [
                  {
                    id: "mockups",
                    name: "Mockups.fig",
                    type: "file",
                    size: "2.4 MB",
                    modified: "Yesterday",
                  },
                  {
                    id: "assets",
                    name: "Assets.zip",
                    type: "file",
                    size: "15.2 MB",
                    modified: "2 days ago",
                  },
                ],
              },
              {
                id: "development",
                name: "Development",
                type: "folder",
                children: [
                  {
                    id: "src",
                    name: "src",
                    type: "folder",
                    children: [
                      { id: "components", name: "components", type: "folder" },
                      { id: "pages", name: "pages", type: "folder" },
                    ],
                  },
                  {
                    id: "package",
                    name: "package.json",
                    type: "file",
                    size: "1.2 KB",
                    modified: "Today",
                  },
                ],
              },
            ],
          },
          {
            id: "project2",
            name: "Mobile App",
            type: "folder",
            children: [
              { id: "research", name: "Research", type: "folder" },
              {
                id: "prototype",
                name: "Prototype.fig",
                type: "file",
                size: "4.8 MB",
                modified: "1 week ago",
              },
            ],
          },
        ],
      },
      {
        id: "personal",
        name: "Personal",
        type: "folder",
        children: [
          {
            id: "photos",
            name: "Photos",
            type: "folder",
            children: [
              { id: "vacation", name: "Vacation 2023", type: "folder" },
              { id: "family", name: "Family", type: "folder" },
            ],
          },
          { id: "taxes", name: "Tax Documents", type: "folder" },
        ],
      },
      {
        id: "archived",
        name: "Archived",
        type: "folder",
        children: [
          { id: "old-projects", name: "Old Projects", type: "folder" },
          { id: "backup", name: "Backup 2022", type: "folder" },
        ],
      },
    ],
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node: TreeNode, depth = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center py-2 px-2 rounded hover:bg-gray-50 cursor-pointer ${
            depth > 0 ? "ml-6" : ""
          }`}
          style={{ paddingLeft: `${depth * 20}px` }}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          <div className="flex items-center space-x-2 flex-1">
            {hasChildren ? (
              <span
                className={`transform transition-transform ${
                  isExpanded ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
            ) : (
              <span className="w-4"></span>
            )}
            <span className="text-lg">
              {node.type === "folder"
                ? hasChildren && isExpanded
                  ? "📂"
                  : "📁"
                : "📄"}
            </span>
            <span className="font-medium">{node.name}</span>
            {node.type === "file" && (
              <span className="text-sm text-gray-500">
                {node.size} • {node.modified}
              </span>
            )}
          </div>
          {hasChildren && (
            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
              {node.children?.length} items
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">File Explorer</h2>
          <p className="text-gray-500">Browse your documents and folders</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            New Folder
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Upload
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-4">{renderNode(treeData)}</div>

      <div className="mt-6 pt-6 border-t flex justify-between items-center text-sm text-gray-500">
        <div>{expandedNodes.size} folders expanded</div>
        <div className="flex space-x-4">
          <button
            onClick={() =>
              setExpandedNodes(
                new Set([...expandedNodes, ...getAllFolderIds(treeData)])
              )
            }
            className="text-blue-600 hover:text-blue-800"
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedNodes(new Set(["root"]))}
            className="text-blue-600 hover:text-blue-800"
          >
            Collapse All
          </button>
        </div>
      </div>
    </div>
  );
}

function getAllFolderIds(node: TreeNode): string[] {
  const ids: string[] = [];
  if (node.type === "folder" && node.children) {
    ids.push(node.id);
    node.children.forEach((child) => {
      if (child.type === "folder") {
        ids.push(...getAllFolderIds(child));
      }
    });
  }
  return ids;
}
