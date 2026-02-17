import { useState, useMemo, useEffect } from "react";

interface TreeNode {
  id: string;
  name: string;
  type: "department" | "team" | "employee";
  children?: TreeNode[];
  role?: string;
  email?: string;
}

const treeData: TreeNode[] = [
  {
    id: "engineering",
    name: "Engineering",
    type: "department",
    children: [
      {
        id: "frontend",
        name: "Frontend Team",
        type: "team",
        children: [
          {
            id: "john",
            name: "John Smith",
            type: "employee",
            role: "Senior Developer",
            email: "john@company.com",
          },
          {
            id: "sarah",
            name: "Sarah Johnson",
            type: "employee",
            role: "UI Developer",
            email: "sarah@company.com",
          },
          {
            id: "mike",
            name: "Mike Chen",
            type: "employee",
            role: "React Specialist",
            email: "mike@company.com",
          },
        ],
      },
      {
        id: "backend",
        name: "Backend Team",
        type: "team",
        children: [
          {
            id: "david",
            name: "David Brown",
            type: "employee",
            role: "Backend Lead",
            email: "david@company.com",
          },
          {
            id: "emma",
            name: "Emma Wilson",
            type: "employee",
            role: "API Developer",
            email: "emma@company.com",
          },
        ],
      },
      {
        id: "devops",
        name: "DevOps Team",
        type: "team",
        children: [
          {
            id: "alex",
            name: "Alex Garcia",
            type: "employee",
            role: "DevOps Engineer",
            email: "alex@company.com",
          },
        ],
      },
    ],
  },
  {
    id: "design",
    name: "Design",
    type: "department",
    children: [
      {
        id: "ux",
        name: "UX Team",
        type: "team",
        children: [
          {
            id: "lisa",
            name: "Lisa Taylor",
            type: "employee",
            role: "UX Lead",
            email: "lisa@company.com",
          },
          {
            id: "tom",
            name: "Tom Wilson",
            type: "employee",
            role: "UX Designer",
            email: "tom@company.com",
          },
        ],
      },
      {
        id: "ui",
        name: "UI Team",
        type: "team",
        children: [
          {
            id: "anna",
            name: "Anna Clark",
            type: "employee",
            role: "UI Designer",
            email: "anna@company.com",
          },
        ],
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    type: "department",
    children: [
      {
        id: "content",
        name: "Content Team",
        type: "team",
        children: [
          {
            id: "robert",
            name: "Robert Miller",
            type: "employee",
            role: "Content Manager",
            email: "robert@company.com",
          },
          {
            id: "sophia",
            name: "Sophia Lee",
            type: "employee",
            role: "Content Writer",
            email: "sophia@company.com",
          },
        ],
      },
    ],
  },
];

export default function SearchableTreeView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Filter tree data based on search term
  const filteredTreeData = useMemo(() => {
    if (!searchTerm.trim()) return treeData;

    const filterNode = (node: TreeNode): TreeNode | null => {
      const matchesSearch =
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (node.role &&
          node.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (node.email &&
          node.email.toLowerCase().includes(searchTerm.toLowerCase()));

      if (matchesSearch) {
        return { ...node };
      }

      if (node.children) {
        const filteredChildren = node.children
          .map(filterNode)
          .filter((child): child is TreeNode => child !== null);

        if (filteredChildren.length > 0) {
          return { ...node, children: filteredChildren };
        }
      }

      return null;
    };

    return treeData
      .map(filterNode)
      .filter((node): node is TreeNode => node !== null);
  }, [searchTerm]);

  // Expand all nodes when searching
  useEffect(() => {
    setTimeout(() => {
      if (searchTerm.trim()) {
        const expandAll = (nodes: TreeNode[]): string[] => {
          const ids: string[] = [];
          nodes.forEach((node) => {
            ids.push(node.id);
            if (node.children) {
              ids.push(...expandAll(node.children));
            }
          });
          return ids;
        };
        setExpandedNodes(new Set(expandAll(filteredTreeData)));
      } else {
        setExpandedNodes(new Set());
      }
    }, 0);
  }, [searchTerm, filteredTreeData]);

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderTreeNode = (node: TreeNode, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <div key={node.id}>
        <div
          className={`flex items-center py-3 px-4 rounded-lg hover:bg-gray-50 cursor-pointer ${
            node.type === "department"
              ? "bg-gray-100"
              : node.type === "team"
              ? "bg-gray-50"
              : ""
          }`}
          style={{ paddingLeft: `${depth * 24 + 16}px` }}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          <div className="flex items-center space-x-3 flex-1">
            {hasChildren && (
              <span
                className={`transform transition-transform ${
                  isExpanded ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
            )}
            {!hasChildren && <span className="w-4"></span>}

            <span className="text-lg">
              {node.type === "department"
                ? "🏢"
                : node.type === "team"
                ? "👥"
                : "👤"}
            </span>

            <div>
              <div className="font-medium">{node.name}</div>
              {node.type === "employee" && (
                <div className="text-sm text-gray-500">
                  {node.role} • {node.email}
                </div>
              )}
            </div>
          </div>

          {hasChildren && (
            <span className="text-xs text-gray-500 px-2 py-1 bg-white rounded">
              {node.children?.length}{" "}
              {node.type === "department" ? "teams" : "members"}
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Company Structure</h2>
          <p className="text-gray-500">Browse departments and employees</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Export Chart
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search departments, teams, or employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            🔍
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results info */}
      {searchTerm && (
        <div className="mb-4 text-sm text-gray-500">
          Found {countNodes(filteredTreeData)} results for &quot;{searchTerm}&ldquo;
        </div>
      )}

      {/* Tree view */}
      <div className="border rounded-lg overflow-hidden">
        {filteredTreeData.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto">
            {filteredTreeData.map((node) => renderTreeNode(node))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t flex justify-between items-center text-sm text-gray-500">
        <div>
          {searchTerm ? "Showing filtered results" : "Showing all departments"}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>🏢</span>
            <span>Department</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>👥</span>
            <span>Team</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>👤</span>
            <span>Employee</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function countNodes(nodes: TreeNode[]): number {
  let count = 0;
  nodes.forEach((node) => {
    count++;
    if (node.children) {
      count += countNodes(node.children);
    }
  });
  return count;
}
