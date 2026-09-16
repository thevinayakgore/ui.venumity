"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Phone, Briefcase, Building2 } from "lucide-react";

const USER_DATA = {
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

export default function SimpleProfileCard() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="p-5 md:p-10 w-full">
      <Card className="p-0! gap-0! bg-foreground/5! border-2 border-background ring-10 ring-foreground/15 mx-auto overflow-hidden rounded-4xl shadow-lg/10 hover:shadow-2xl transition-all duration-500 max-w-xl w-full">
        {/* Cover Image */}
        <div className="relative border-b h-50">
          <Image
            src="/banner.png"
            alt="Banner Image"
            width={2000}
            height={2000}
            priority
            unoptimized
            loading="eager"
            className="absolute inset-0 z-0 object-cover w-full h-full"
          />
        </div>

        {/* Avatar Section */}
        <div className="relative flex items-start justify-between px-6 m-auto w-full">
          <Avatar className="absolute -top-15 size-30 border-6 bg-background/5 backdrop-blur-sm">
            <AvatarImage src="/vinu.jpeg" alt={USER_DATA.name} />
            <AvatarFallback className="text-2xl bg-linear-to-br from-blue-600 to-purple-600 text-white">
              {USER_DATA.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-5 pt-2 -mr-4 ml-auto">
            <div className="flex text-end gap-5">
              {Object.entries(USER_DATA.stats).map(([key, value]) => (
                <div key={key}>
                  <div className="text-base font-bold tracking-tight">
                    {value.toLocaleString()}
                  </div>
                  <div className="text-xs capitalize opacity-50">{key}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`p-5! font-semibold shadow-lg w-30 ${
                isFollowing
                  ? "bg-primary! text-white!"
                  : "bg-foreground! text-secondary!"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </div>

        <CardContent className="p-6!">
          {/* Header Section */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold uppercase tracking-wide">
              {USER_DATA.name}
            </h1>
            <div className="flex items-center gap-2 text-sm opacity-60">
              <Briefcase className="size-4" />
              <span>{USER_DATA.role}</span>
              <Separator
                orientation="vertical"
                className="mx-2 bg-foreground/50!"
              />
              <Building2 className="size-4 ml-1" />
              <span>{USER_DATA.company}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-4 text-sm font-medium tracking-wide opacity-80 w-full">
            {USER_DATA.bio}
          </p>

          <Separator className="my-5" />

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="font-mono tracking-wider text-base uppercase">
                Contact Information
              </p>
              <div className="space-y-2 opacity-50">
                <div className="flex items-center gap-3">
                  <MapPin className="size-4" />
                  <span>{USER_DATA.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-4" />
                  <span className="truncate">{USER_DATA.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-4" />
                  <span>{USER_DATA.phone}</span>
                </div>
              </div>
            </div>

            <Separator className="my-5" />

            {/* Skills */}
            <div className="space-y-3">
              <p className="font-mono tracking-wider text-base uppercase">
                Skills & Expertise
              </p>
              <div className="flex flex-wrap gap-5">
                {USER_DATA.skills.map((skill) => (
                  <span key={skill} className="text-sm opacity-60">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
