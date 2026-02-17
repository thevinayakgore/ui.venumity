import { useState, useRef, useEffect } from "react";

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  category: "product" | "company" | "team" | "milestone";
}

export default function HorizontalTimeline() {
  const [activeItem, setActiveItem] = useState<number>(3);
  const timelineRef = useRef<HTMLDivElement>(null);

  const items: TimelineItem[] = [
    {
      id: 1,
      date: "Q1 2020",
      title: "Company Founded",
      description: "Started operations with initial team of 5",
      category: "company",
    },
    {
      id: 2,
      date: "Q3 2020",
      title: "First Prototype",
      description: "Developed and tested initial product prototype",
      category: "product",
    },
    {
      id: 3,
      date: "Q1 2021",
      title: "Seed Funding",
      description: "Raised $2M in seed funding from investors",
      category: "milestone",
    },
    {
      id: 4,
      date: "Q3 2021",
      title: "Beta Launch",
      description: "Launched beta version to first 1000 users",
      category: "product",
    },
    {
      id: 5,
      date: "Q1 2022",
      title: "Team Expansion",
      description: "Grew team to 50 employees across departments",
      category: "team",
    },
    {
      id: 6,
      date: "Q3 2022",
      title: "Series A",
      description: "Secured $10M in Series A funding round",
      category: "milestone",
    },
    {
      id: 7,
      date: "Q1 2023",
      title: "Product V2",
      description: "Launched major update with new features",
      category: "product",
    },
    {
      id: 8,
      date: "Q3 2023",
      title: "Global Launch",
      description: "Expanded to international markets",
      category: "company",
    },
    {
      id: 9,
      date: "Q1 2024",
      title: "100K Users",
      description: "Reached 100,000 active users milestone",
      category: "milestone",
    },
  ];

  const activeItemData =
    items.find((item) => item.id === activeItem) || items[2];

  const getCategoryColor = (category: TimelineItem["category"]) => {
    switch (category) {
      case "product":
        return "bg-blue-100 text-blue-800";
      case "company":
        return "bg-green-100 text-green-800";
      case "team":
        return "bg-purple-100 text-purple-800";
      case "milestone":
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getCategoryIcon = (category: TimelineItem["category"]) => {
    switch (category) {
      case "product":
        return "📦";
      case "company":
        return "🏢";
      case "team":
        return "👥";
      case "milestone":
        return "🎯";
    }
  };

  useEffect(() => {
    if (timelineRef.current && activeItem > 3) {
      const container = timelineRef.current;
      const activeElement = container.children[activeItem - 1] as HTMLElement;
      if (activeElement) {
        const scrollLeft =
          activeElement.offsetLeft -
          container.offsetWidth / 2 +
          activeElement.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeItem]);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Growth Timeline</h2>
          <p className="text-gray-500">Our journey from startup to scale-up</p>
        </div>
        <div className="flex items-center space-x-4">
          {["product", "company", "team", "milestone"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  category === "product"
                    ? "bg-blue-500"
                    : category === "company"
                    ? "bg-green-500"
                    : category === "team"
                    ? "bg-purple-500"
                    : "bg-yellow-500"
                }`}
              ></div>
              <span className="text-sm capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal timeline */}
      <div className="relative mb-12">
        {/* Progress line */}
        <div className="absolute left-0 right-0 top-8 h-1 bg-gray-200"></div>
        <div
          className="absolute left-0 h-1 bg-blue-500 transition-all duration-500"
          style={{
            width: `${((activeItem - 1) / (items.length - 1)) * 100}%`,
            top: "32px",
          }}
        ></div>

        {/* Timeline items */}
        <div
          ref={timelineRef}
          className="flex space-x-8 overflow-x-auto pb-4 scrollbar-hide"
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className="shrink-0 flex flex-col items-center w-32"
            >
              {/* Date */}
              <div
                className={`mb-8 text-sm font-semibold ${
                  item.id === activeItem ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {item.date}
              </div>

              {/* Marker */}
              <div
                className={`relative mb-4 w-16 h-16 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                  item.id === activeItem
                    ? "bg-white border-4 border-blue-500 shadow-lg scale-125"
                    : "bg-gray-100 border-4 border-gray-300 hover:border-gray-400"
                }`}
              >
                {getCategoryIcon(item.category)}
              </div>

              {/* Title */}
              <div
                className={`text-center font-medium ${
                  item.id === activeItem ? "text-gray-900" : "text-gray-600"
                }`}
              >
                {item.title}
              </div>

              {/* Category */}
              <div
                className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                  item.category
                )}`}
              >
                {item.category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active item details */}
      <div className="bg-linear-to-r from-blue-50 to-gray-50 rounded-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  activeItemData.category === "product"
                    ? "bg-blue-100 text-blue-600"
                    : activeItemData.category === "company"
                    ? "bg-green-100 text-green-600"
                    : activeItemData.category === "team"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {getCategoryIcon(activeItemData.category)}
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  {activeItemData.date}
                </div>
                <h3 className="text-2xl font-bold">{activeItemData.title}</h3>
              </div>
            </div>
            <p className="text-gray-700 text-lg">
              {activeItemData.description}
            </p>
          </div>

          {/* Timeline progress */}
          <div className="bg-white rounded-lg p-6 border">
            <h4 className="font-semibold mb-4">Timeline Progress</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    Milestone {activeItem} of {items.length}
                  </span>
                  <span>{Math.round((activeItem / items.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(activeItem / items.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveItem(Math.max(1, activeItem - 1))}
                  disabled={activeItem === 1}
                  className="w-full py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ← Previous
                </button>
                <button
                  onClick={() =>
                    setActiveItem(Math.min(items.length, activeItem + 1))
                  }
                  disabled={activeItem === items.length}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
