import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface TreeNode {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: TreeNode[];
}

export default function DragDropTreeView() {
  const [treeData, setTreeData] = useState<TreeNode[]>([
    {
      id: "projects",
      name: "Projects",
      type: "folder",
      children: [
        {
          id: "website",
          name: "Website",
          type: "folder",
          children: [
            { id: "index", name: "index.html", type: "file" },
            { id: "styles", name: "styles.css", type: "file" },
            { id: "scripts", name: "scripts.js", type: "file" },
          ],
        },
        {
          id: "mobile",
          name: "Mobile App",
          type: "folder",
          children: [
            { id: "screens", name: "Screens", type: "folder" },
            { id: "components", name: "Components", type: "folder" },
          ],
        },
      ],
    },
    {
      id: "documents",
      name: "Documents",
      type: "folder",
      children: [
        { id: "report", name: "Annual Report.pdf", type: "file" },
        { id: "proposal", name: "Project Proposal.docx", type: "file" },
        { id: "meeting", name: "Meeting Notes.txt", type: "file" },
      ],
    },
    {
      id: "assets",
      name: "Assets",
      type: "folder",
      children: [
        { id: "images", name: "Images", type: "folder" },
        { id: "videos", name: "Videos", type: "folder" },
      ],
    },
  ]);

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["projects", "website", "mobile"])
  );

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside the list or same position
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    // Find source and destination nodes
    const sourcePath = source.droppableId.split("-");
    const destPath = destination.droppableId.split("-");

    const newTreeData = [...treeData];
    const sourceNode = findNode(newTreeData, sourcePath);
    const destNode = findNode(newTreeData, destPath);

    if (sourceNode && destNode && sourceNode.children && destNode.children) {
      // Remove from source
      const [removed] = sourceNode.children.splice(source.index, 1);

      // Add to destination
      destNode.children.splice(destination.index, 0, removed);

      setTreeData(newTreeData);
    }
  };

  const findNode = (nodes: TreeNode[], path: string[]): TreeNode | null => {
    let currentNodes = nodes;
    let currentNode: TreeNode | null = null;

    for (const id of path) {
      if (id === "root") continue;
      currentNode = currentNodes.find((n) => n.id === id) || null;
      if (!currentNode || !currentNode.children) return currentNode;
      currentNodes = currentNode.children;
    }

    return currentNode;
  };

  const renderTreeNode = (node: TreeNode, depth = 0, parentId = "root") => {
    const droppableId =
      parentId === "root" ? node.id : `${parentId}-${node.id}`;
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <Draggable key={node.id} draggableId={node.id} index={0}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="mb-2"
          >
            <div
              className={`flex items-center py-2 px-3 rounded-lg border ${
                node.type === "folder" ? "bg-gray-50" : "bg-white"
              }`}
              style={{ paddingLeft: `${depth * 24}px` }}
            >
              <div
                {...provided.dragHandleProps}
                className="mr-3 text-gray-400 cursor-move"
              >
                ⠿
              </div>

              {hasChildren && (
                <button
                  onClick={() => toggleNode(node.id)}
                  className="mr-3 w-6 h-6 flex items-center justify-center"
                >
                  <span
                    className={`transform transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  >
                    ▶
                  </span>
                </button>
              )}
              {!hasChildren && <span className="w-6 mr-3"></span>}

              <span className="text-lg mr-3">
                {node.type === "folder" ? (isExpanded ? "📂" : "📁") : "📄"}
              </span>

              <span className="font-medium flex-1">{node.name}</span>

              <span className="text-sm text-gray-500">
                {node.type === "folder" ? "Folder" : "File"}
              </span>
            </div>

            {hasChildren && isExpanded && (
              <Droppable droppableId={droppableId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mt-2"
                  >
                    {node.children!.map((child) => (
                      <div key={child.id}>
                        {renderTreeNode(child, depth + 1, droppableId)}
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">File Organizer</h2>
          <p className="text-gray-500">Drag and drop to organize files</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            New Folder
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="root">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="border rounded-lg p-4 h-[500px] overflow-y-auto"
            >
              {treeData.map((node) => (
                <div key={node.id}>{renderTreeNode(node, 0, "root")}</div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>Drag the ⠿ icon to move items</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>📁</span>
              <span>Folder</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📄</span>
              <span>File</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
