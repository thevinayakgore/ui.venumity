import { useState } from "react";

interface TreeItem {
  id: string;
  name: string;
  children?: TreeItem[];
}

export default function CheckboxTreeView() {
  const [treeData] = useState<TreeItem[]>([
    {
      id: "frontend",
      name: "Frontend",
      children: [
        {
          id: "react",
          name: "React",
          children: [
            { id: "hooks", name: "Hooks" },
            { id: "context", name: "Context API" },
            { id: "router", name: "React Router" },
          ],
        },
        {
          id: "vue",
          name: "Vue.js",
          children: [
            { id: "vuex", name: "Vuex" },
            { id: "vue-router", name: "Vue Router" },
          ],
        },
        { id: "angular", name: "Angular" },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      children: [
        {
          id: "nodejs",
          name: "Node.js",
          children: [
            { id: "express", name: "Express" },
            { id: "nest", name: "NestJS" },
          ],
        },
        { id: "python", name: "Python" },
        { id: "java", name: "Java" },
      ],
    },
    {
      id: "database",
      name: "Database",
      children: [
        { id: "postgresql", name: "PostgreSQL" },
        { id: "mongodb", name: "MongoDB" },
        { id: "redis", name: "Redis" },
      ],
    },
  ]);

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["frontend", "backend"])
  );

  // Get all descendant IDs
  const getDescendantIds = (item: TreeItem): string[] => {
    const ids: string[] = [item.id];
    if (item.children) {
      item.children.forEach((child) => {
        ids.push(...getDescendantIds(child));
      });
    }
    return ids;
  };

  // Get all ancestor IDs
  const getAncestorIds = (items: TreeItem[], targetId: string): string[] => {
    const findPath = (node: TreeItem, path: string[] = []): string[] | null => {
      if (node.id === targetId) return [...path, node.id];
      if (node.children) {
        for (const child of node.children) {
          const result = findPath(child, [...path, node.id]);
          if (result) return result;
        }
      }
      return null;
    };

    for (const item of items) {
      const path = findPath(item);
      if (path) return path.slice(0, -1); // Exclude the item itself
    }
    return [];
  };

  const handleCheck = (item: TreeItem) => {
    const descendantIds = getDescendantIds(item);
    const ancestorIds = getAncestorIds(treeData, item.id);
    const newChecked = new Set(checkedItems);

    // Check if all descendants are currently checked
    const allDescendantsChecked = descendantIds.every((id) =>
      newChecked.has(id)
    );

    if (allDescendantsChecked) {
      // Uncheck item and all descendants
      descendantIds.forEach((id) => newChecked.delete(id));
      // Uncheck ancestors if needed
      ancestorIds.forEach((ancestorId) => {
        const ancestor = findItem(treeData, ancestorId);
        if (ancestor) {
          const ancestorDescendants = getDescendantIds(ancestor);
          const allDescendantsUnchecked = ancestorDescendants.every(
            (id) => !newChecked.has(id)
          );
          if (allDescendantsUnchecked) {
            newChecked.delete(ancestorId);
          }
        }
      });
    } else {
      // Check item and all descendants
      descendantIds.forEach((id) => newChecked.add(id));
      // Check ancestors if all their children are checked
      ancestorIds.forEach((ancestorId) => {
        const ancestor = findItem(treeData, ancestorId);
        if (ancestor && ancestor.children) {
          const allChildrenChecked = ancestor.children.every((child) => {
            const childDescendants = getDescendantIds(child);
            return childDescendants.every((id) => newChecked.has(id));
          });
          if (allChildrenChecked) {
            newChecked.add(ancestorId);
          }
        }
      });
    }

    setCheckedItems(newChecked);
  };

  const findItem = (items: TreeItem[], id: string): TreeItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItem(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderTreeItem = (item: TreeItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isChecked = checkedItems.has(item.id);
    const descendantIds = getDescendantIds(item);
    const indeterminate =
      descendantIds.some((id) => checkedItems.has(id)) && !isChecked;

    return (
      <div key={item.id}>
        <div
          className="flex items-center py-2 px-2 rounded hover:bg-gray-50"
          style={{ paddingLeft: `${depth * 24}px` }}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(item.id);
              }}
              className="w-6 h-6 flex items-center justify-center"
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
          {!hasChildren && <span className="w-6"></span>}

          <input
            type="checkbox"
            checked={isChecked}
            ref={(el) => {
              if (el) {
                el.indeterminate = indeterminate;
              }
            }}
            onChange={() => handleCheck(item)}
            className="w-4 h-4 text-blue-600 rounded mr-3"
          />

          <span className="font-medium">{item.name}</span>

          {hasChildren && (
            <span className="ml-2 text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
              {item.children?.length}
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {item.children!.map((child) => renderTreeItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Technology Stack</h2>
          <p className="text-gray-500">Select skills for your profile</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {checkedItems.size} items selected
          </div>
          <button
            onClick={() => {
              const allIds = treeData.flatMap((item) => getDescendantIds(item));
              setCheckedItems(new Set(allIds));
            }}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Select All
          </button>
          <button
            onClick={() => setCheckedItems(new Set())}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-4 h-[400px] overflow-y-auto">
        {treeData.map((item) => renderTreeItem(item))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold mb-3">Selected Items:</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(checkedItems).map((id) => {
            const item = findItem(treeData, id);
            return item ? (
              <span
                key={id}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {item.name}
              </span>
            ) : null;
          })}
          {checkedItems.size === 0 && (
            <span className="text-gray-500">No items selected</span>
          )}
        </div>
      </div>
    </div>
  );
}
