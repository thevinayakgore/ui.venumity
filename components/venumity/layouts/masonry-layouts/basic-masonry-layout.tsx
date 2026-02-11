export default function BasicMasonryLayout() {
  const ITEMS = [
    { height: "h-40", color: "from-blue-500 to-sky-300" },
    { height: "h-44", color: "from-green-500 to-emerald-300" },
    { height: "h-48", color: "from-purple-500 to-violet-300" },
    { height: "h-52", color: "from-orange-500 to-yellow-300" },
    { height: "h-56", color: "from-rose-500 to-pink-300" },
    { height: "h-60", color: "from-teal-500 to-cyan-300" },
    { height: "h-42", color: "from-indigo-500 to-blue-300" },
    { height: "h-46", color: "from-lime-500 to-green-300" },
    { height: "h-50", color: "from-fuchsia-500 to-pink-300" },
    { height: "h-54", color: "from-amber-500 to-orange-300" },
    { height: "h-64", color: "from-sky-500 to-indigo-300" },
    { height: "h-58", color: "from-cyan-500 to-teal-300" },
  ];

  return (
    <main className="flex flex-col items-center justify-center m-auto w-full">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 p-6 text-white overflow-auto w-full">
        {ITEMS.map((item, index) => (
          <div
            key={index}
            className={`bg-linear-to-tl ${item.color} p-6 break-inside-avoid rounded-2xl ${item.height}`}
          >
            <h1 className="text-2xl font-medium mb-2">Item {index + 1}</h1>
            <p className="text-sm">
              Basic masonry item with variable height for visual interest
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
