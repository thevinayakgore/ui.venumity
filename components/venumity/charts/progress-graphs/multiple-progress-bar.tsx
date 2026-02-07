export default function MultipleProgressBars() {
  const tasks = [
    { name: "Design", progress: 90, color: "hsl(24 100% 55%)" },
    { name: "Development", progress: 75, color: "hsl(220 90% 56%)" },
    { name: "Testing", progress: 50, color: "hsl(142 76% 36%)" },
    { name: "Deployment", progress: 25, color: "hsl(45 93% 58%)" },
  ];

  return (
    <main className="flex flex-col justify-center m-auto p-8 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <div className="space-y-6">
        {tasks.map((task, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{task.name}</span>
              <span className="text-muted-foreground">{task.progress}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${task.progress}%`,
                  backgroundColor: task.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Project Tasks Progress</h3>
        <p className="text-sm text-muted-foreground">Overall: 60% Complete</p>
      </div>
    </main>
  );
}
