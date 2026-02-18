"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Building2,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const user = {
  name: "Vinayak Gore",
  role: "Website Developer",
  company: "Venumity",
  location: "Solapur, India",
  email: "thevinayakgore@gmail.com",
  phone: "(91+) 123-4567-890",
  bio: "Full-stack developer with 8+ years of experience in building scalable web applications. Passionate about React, Node.js, and cloud technologies.",
  skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL", "Docker"],
  stats: {
    projects: 42,
    followers: 1248,
    following: 562,
  },
};

export default function ProfileCard1() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <main className="bg-linear-to-t from-foreground/20 dark:from-slate-900 p-6 md:p-10 lg:p-20">
      <Card className="py-0! max-w-2xl w-full mx-auto overflow-hidden rounded-2xl shadow-lg/10 hover:shadow-2xl transition-all duration-500">
        {/* Cover Image */}
        <div className="relative border-b h-60">
          <Image
            src="/banner.png"
            alt="Banner Image"
            width={2000}
            height={2000}
            priority
            className="absolute inset-0 z-0 object-cover w-full h-full"
          />
        </div>

        {/* Avatar Section */}
        <div className="relative px-6">
          <Avatar className="absolute -top-25 size-40 border-10 bg-background/5 backdrop-blur-sm">
            <AvatarImage src="/vinu.jpg" alt={user.name} />
            <AvatarFallback className="text-2xl bg-linear-to-br from-blue-600 to-purple-600 text-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        <CardContent className="pt-12 pb-8 px-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
            <div className="space-y-1">
              <h1 className="text-5xl font-semibold capitalize mb-3">
                {user.name}
              </h1>
              <div className="flex items-center gap-2 text-foreground/60 flex-wrap">
                <Briefcase className="h-4 w-4" />
                <span>{user.role}</span>
                <Building2 className="h-4 w-4 ml-1" />
                <span>{user.company}</span>
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => setIsFollowing(!isFollowing)}
              variant={isFollowing ? "outline" : "default"}
              className={`px-7 hover:px-10 cursor-pointer font-semibold transition-all duration-500 ${
                isFollowing
                  ? "border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                  : "bg-linear-to-tl from-primary to-yellow-400 cursor-pointer text-white shadow-md hover:shadow-lg"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>

          {/* Bio */}
          <p className="text-foreground/60 mb-8 text-l borderg leading-relaxed tracking-wide w-full">
            {user.bio}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {Object.entries(user.stats).map(([key, value]) => (
              <div
                key={key}
                className="text-center p-4 rounded-lg bg-muted/50 backdrop-blur-sm border"
              >
                <div className="text-4xl font-bold bg-linear-to-tl from-primary to-yellow-400 bg-clip-text text-transparent">
                  {value.toLocaleString()}
                </div>
                <div className="text-sm text-foreground/60 capitalize mt-3">
                  {key}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-5 flex items-center">
                <ChevronRight className="size-6" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 text-foreground/60 bg-muted/30 border p-3 rounded-md">
                  <MapPin className="size-5" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/60 bg-muted/30 border p-3 rounded-md">
                  <Mail className="size-5" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/60 bg-muted/30 border p-3 rounded-md md:col-span-2">
                  <Phone className="size-5" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-medium mb-5 flex items-center">
                <ChevronRight className="size-6" />
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-4 py-1 bg-green-600/10 text-green-500 border-green-500/50 rounded-full text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
