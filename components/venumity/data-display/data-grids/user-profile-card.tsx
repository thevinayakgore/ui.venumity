import React, { useState } from "react";

export default function UserProfileCard() {
  const [isFollowing, setIsFollowing] = useState(false);

  const user = {
    name: "Alex Johnson",
    role: "Senior Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    email: "alex.johnson@techcorp.com",
    phone: "(555) 123-4567",
    bio: "Full-stack developer with 8+ years of experience in building scalable web applications. Passionate about React, Node.js, and cloud technologies.",
    skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL", "Docker"],
    stats: {
      projects: 42,
      followers: 1248,
      following: 562,
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border max-w-md mx-auto overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-500 to-purple-600 h-32 relative">
        <div className="absolute -bottom-16 left-6">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-4xl">
            👨‍💻
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 px-6 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">
              {user.role} • {user.company}
            </p>
          </div>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isFollowing
                ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        <p className="text-gray-700 mb-6">{user.bio}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.entries(user.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold">{value.toLocaleString()}</div>
              <div className="text-sm text-gray-500 capitalize">{key}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <span className="w-6">📍</span>
                <span>{user.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-6">📧</span>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-6">📱</span>
                <span>{user.phone}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
