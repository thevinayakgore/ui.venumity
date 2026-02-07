export default function CircularProgressChart() {
  const progress = 75;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <main className="flex flex-col items-center justify-center m-auto p-10 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="hsl(215 20% 65% / 0.1)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 80 80)"
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="hsl(24 100% 55%)" />
              <stop offset="100%" stopColor="hsl(45 93% 58%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-bold text-foreground">{progress}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Project Progress</h3>
        <p className="text-sm text-muted-foreground">Target: 100% by Dec 31</p>
      </div>
    </main>
  );
}
