"use client";
import { Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

export default function AboutTeamSection() {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      bio: '15+ years in tech industry, passionate about innovation',
      image: '/team/sarah.jpg',
      socials: {
        twitter: '#',
        linkedin: '#',
        email: '#',
      },
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO',
      bio: 'Expert in AI and machine learning technologies',
      image: '/team/michael.jpg',
      socials: {
        twitter: '#',
        linkedin: '#',
      },
    },
    {
      name: 'Jessica Williams',
      role: 'Head of Design',
      bio: 'Award-winning designer with focus on UX',
      image: '/team/jessica.jpg',
      socials: {
        twitter: '#',
        linkedin: '#',
        instagram: '#',
      },
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      bio: 'Full-stack wizard with 10+ years experience',
      image: '/team/david.jpg',
      socials: {
        twitter: '#',
        linkedin: '#',
        github: '#',
      },
    },
    {
      name: 'Emma Thompson',
      role: 'Marketing Director',
      bio: 'Digital marketing expert and growth strategist',
      image: '/team/emma.jpg',
      socials: {
        twitter: '#',
        linkedin: '#',
      },
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate professionals dedicated to excellence and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-64 bg-linear-to-r from-blue-400 to-purple-500">
                {/* Placeholder for image - in real app use next/image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-28 h-28 bg-white/30 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {member.bio}
                </p>

                <div className="flex space-x-3">
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </a>
                  )}
                  {member.socials.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium">
            View All Team Members
          </button>
        </div>
      </div>
    </section>
  );
}