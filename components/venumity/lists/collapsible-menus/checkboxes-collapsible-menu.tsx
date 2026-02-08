"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, Check, Minus } from "lucide-react";

interface TreeNode {
  id: string;
  label: string;
  checked: boolean;
  children?: TreeNode[];
}

export default function CollapsibleMenuWithCheckboxes() {
  const [treeData, setTreeData] = useState<TreeNode[]>([
    {
      id: "1",
      label: "Frontend",
      checked: false,
      children: [
        { id: "1-1", label: "React", checked: false },
        { id: "1-2", label: "Vue.js", checked: false },
        { id: "1-3", label: "Angular", checked: false },
      ],
    },
    {
      id: "2",
      label: "Backend",
      checked: false,
      children: [
        { id: "2-1", label: "Node.js", checked: false },
        { id: "2-2", label: "Python", checked: false },
        { id: "2-3", label: "Java", checked: false },
      ],
    },
  ]);

  const [expanded, setExpanded] = useState<Set<string>>(new Set(["1", "2"]));

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const updateNode = (id: string, checked: boolean) => {
    const updateTree = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          const updatedNode = { ...node, checked };
          if (node.children) {
            updatedNode.children = node.children.map((child) => ({
              ...child,
              checked,
            }));
          }
          return updatedNode;
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }
        return node;
      });
    };

    setTreeData(updateTree(treeData));
  };

  const getCheckedState = (
    node: TreeNode
  ): "checked" | "unchecked" | "indeterminate" => {
    if (!node.children) return node.checked ? "checked" : "unchecked";

    const childStates = node.children.map(getCheckedState);
    const allChecked = childStates.every((state) => state === "checked");
    const allUnchecked = childStates.every((state) => state === "unchecked");

    if (allChecked) return "checked";
    if (allUnchecked) return "unchecked";
    return "indeterminate";
  };

  const renderTreeNode = (node: TreeNode, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);
    const checkedState = getCheckedState(node);

    return (
      <div key={node.id}>
        <div
          className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
          style={{ paddingLeft: `${level * 24 + 12}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpand(node.id)}
              className="mr-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-6" />}

          <button
            onClick={() => updateNode(node.id, checkedState !== "checked")}
            className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${
              checkedState === "checked"
                ? "bg-primary border-primary"
                : checkedState === "indeterminate"
                ? "bg-primary/50 border-primary"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            {checkedState === "checked" && (
              <Check className="w-3 h-3 text-white" />
            )}
            {checkedState === "indeterminate" && (
              <Minus className="w-3 h-3 text-white" />
            )}
          </button>

          <span className="text-gray-700 dark:text-gray-300">{node.label}</span>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Collapsible Menu with Checkboxes
      </h3>
      <div className="space-y-1">
        {treeData.map((node) => renderTreeNode(node))}
      </div>
    </div>
  );
}
