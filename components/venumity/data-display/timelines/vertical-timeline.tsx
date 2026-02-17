interface ProjectMilestone {
  id: number;
  date: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  team: string[];
}

export default function VerticalTimeline() {
  const milestones: ProjectMilestone[] = [
    {
      id: 1,
      date: "Jan 15, 2024",
      title: "Project Kickoff",
      description: "Initial meeting with stakeholders and project planning",
      status: "completed",
      team: ["PM", "Lead"],
    },
    {
      id: 2,
      date: "Feb 1, 2024",
      title: "Requirements Gathering",
      description: "Collect and document all project requirements",
      status: "completed",
      team: ["BA", "PM"],
    },
    {
      id: 3,
      date: "Feb 28, 2024",
      title: "Design Phase",
      description: "UI/UX design and architecture planning",
      status: "completed",
      team: ["Designer", "Architect"],
    },
    {
      id: 4,
      date: "Mar 15, 2024",
      title: "Development Sprint 1",
      description: "First development sprint with core features",
      status: "completed",
      team: ["Dev Team"],
    },
    {
      id: 5,
      date: "Apr 1, 2024",
      title: "Development Sprint 2",
      description: "Second sprint with additional features",
      status: "in-progress",
      team: ["Dev Team", "QA"],
    },
    {
      id: 6,
      date: "Apr 30, 2024",
      title: "Testing Phase",
      description: "Quality assurance and bug fixing",
      status: "upcoming",
      team: ["QA Team"],
    },
    {
      id: 7,
      date: "May 15, 2024",
      title: "Deployment",
      description: "Production deployment and launch",
      status: "upcoming",
      team: ["DevOps", "PM"],
    },
    {
      id: 8,
      date: "May 30, 2024",
      title: "Post-Launch Review",
      description: "Performance review and feedback collection",
      status: "upcoming",
      team: ["All Teams"],
    },
  ];

  const getStatusColor = (status: ProjectMilestone["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "upcoming":
        return "bg-gray-300";
    }
  };

  const getStatusText = (status: ProjectMilestone["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "upcoming":
        return "Upcoming";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Project Timeline</h2>
          <p className="text-gray-500">Development milestones and progress</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span className="text-sm">Upcoming</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

        {/* Milestones */}
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={`relative flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Content */}
              <div
                className={`w-5/12 ${
                  index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                }`}
              >
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{milestone.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        milestone.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : milestone.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {getStatusText(milestone.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{milestone.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {milestone.date}
                    </div>
                    <div className="flex -space-x-2">
                      {milestone.team.map((member, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs"
                          title={member}
                        >
                          {member.charAt(0)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div
                  className={`w-6 h-6 ${getStatusColor(
                    milestone.status
                  )} rounded-full border-4 border-white`}
                ></div>
              </div>

              {/* Connector line to next milestone */}
              {index < milestones.length - 1 && (
                <div className="absolute left-1/2 top-full w-0.5 h-12 bg-gray-200 -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t text-center">
        <div className="text-sm text-gray-500">
          {milestones.filter((m) => m.status === "completed").length} of{" "}
          {milestones.length} milestones completed
        </div>
      </div>
    </div>
  );
}
