"use client";
import { cn } from "cn";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/venumity/primitives/actions/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Building2,
  BellRing,
} from "lucide-react";

const USER_DATA = {
  name: "The Vinayak Gore",
  username: "@thevinayakgore",
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
      <Card className="p-0! gap-0! bg-foreground/5! border-2 border-background ring-5 md:ring-10 ring-foreground/10 mx-auto overflow-hidden rounded-4xl shadow-lg/10 hover:shadow-2xl transition-all duration-500 max-w-lg w-full">
        {/* Cover Image */}
        <div className="relative border-b overflow-hidden h-35 md:h-40">
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

        <div className="flex flex-col items-center gap-4 p-1.5 w-full">
          {/* Avatar Section */}
          <div className="relative flex items-start justify-between m-auto w-full">
            <div className="absolute -top-6 size-25 ml-3 p-1.5 bg-foreground/15 backdrop-blur-md rounded-full">
              <Avatar className="w-full h-full">
                <AvatarImage src="/vinu.jpeg" alt={USER_DATA.name} />
                <AvatarFallback className="text-2xl bg-linear-to-br from-blue-600 to-purple-600 text-white">
                  {USER_DATA.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center gap-5 p-2 pb-0 ml-auto">
              <div className="hidden md:flex text-right gap-5">
                {Object.entries(USER_DATA.stats).map(([key, value], i) => (
                  <div
                    key={key}
                    className={cn(
                      i === 1 && "px-3 border-x border-foreground/20",
                    )}
                  >
                    <div className="text-sm font-semibold tracking-tight leading-none">
                      {value.toLocaleString()}
                    </div>
                    <div className="text-[0.7rem] font-medium capitalize text-muted-foreground">{key}</div>
                  </div>
                ))}
              </div>
              <Button
                rippleLayers={2}
                animation="ripple"
                iconMotion="wiggle"
                rippleDuration={1.5}
                leftIcon={<BellRing />}
                onClick={() => setIsFollowing(!isFollowing)}
                className="text-white inset-shadow-sm inset-shadow-white/50"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>

          <CardContent className="p-6! bg-background border rounded-2xl">
            {/* Header Section */}
            <div className="flex flex-col gap-3">
              <div>
                <h1 className="text-2xl font-semibold tracking-wide">
                  {USER_DATA.name}
                </h1>
                <p className="text-xs font-medium tracking-wide text-muted-foreground">
                  {USER_DATA.username}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Briefcase className="size-3.5" />
                <span>{USER_DATA.role}</span>
                <Separator
                  orientation="vertical"
                  className="bg-foreground/20"
                />
                <Building2 className="size-3.5 ml-1" />
                <span>{USER_DATA.company}</span>
              </div>
            </div>

            <div className="flex md:hidden gap-5">
              {Object.entries(USER_DATA.stats).map(([key, value]) => (
                <div key={key}>
                  <div className="text-sm font-medium tracking-tight">
                    {value.toLocaleString()}
                  </div>
                  <div className="text-xs capitalize text-muted-foreground">
                    {key}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p className="text-sm tracking-wide w-full">{USER_DATA.bio}</p>

            <Separator className="my-2" />

            {/* Contact Information */}
            <div className="space-y-5 font-medium">
              <div className="space-y-3">
                <p className="text-sm font-mono tracking-wider uppercase">
                  Contact Information
                </p>
                <div className="text-xs space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5" />
                    <span>{USER_DATA.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5" />
                    <span className="truncate">{USER_DATA.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5" />
                    <span>{USER_DATA.phone}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Skills */}
              <div className="space-y-3">
                <p className="font-mono tracking-wider text-sm uppercase">
                  Skills & Expertise
                </p>
                <div className="flex flex-wrap gap-2 md:gap-5">
                  {USER_DATA.skills.map((skill) => (
                    <span key={skill} className="text-xs text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
