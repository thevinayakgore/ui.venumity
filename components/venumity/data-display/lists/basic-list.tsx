interface ListItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

export default function BasicList() {
  const items: ListItem[] = [
    {
      id: 1,
      title: "Project Planning",
      description: "Define project scope and requirements",
      icon: "📋",
      badge: "In Progress",
    },
    {
      id: 2,
      title: "Design Mockups",
      description: "Create UI/UX designs for approval",
      icon: "🎨",
      badge: "Pending",
    },
    {
      id: 3,
      title: "Development",
      description: "Code implementation and testing",
      icon: "💻",
      badge: "Next",
    },
    {
      id: 4,
      title: "Quality Assurance",
      description: "Testing and bug fixing",
      icon: "🧪",
      badge: "Upcoming",
    },
    {
      id: 5,
      title: "Deployment",
      description: "Launch and go live",
      icon: "🚀",
      badge: "Scheduled",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">{item.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{item.title}</h3>
                {item.badge && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            </div>
            {index < items.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-8 bg-gray-200 -z-10 transform translate-x-6"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
