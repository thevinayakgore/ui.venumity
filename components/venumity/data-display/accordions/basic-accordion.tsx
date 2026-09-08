"use client";

import { useState, type ReactNode } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  badge?: string;
}

const demoItems: AccordionItem[] = [
  {
    id: "item1",
    title: "Account Settings",
    badge: "3 Updates",
    content: (
      <div className="space-y-2 text-sm">
        <p>Manage your account preferences and security settings.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Change password</li>
          <li>Two-factor authentication</li>
          <li>Privacy settings</li>
        </ul>
      </div>
    ),
  },
  {
    id: "item2",
    title: "Billing Information",
    badge: "Active",
    content: (
      <div className="space-y-3">
        <p>View and manage your billing details and subscription.</p>
        <div className="space-y-1 bg-foreground/5 backdrop-blur-lg p-3 text-xs border rounded-sm">
          <div className="flex justify-between">
            <span className="text-foreground/60">Current Plan</span>
            <span className="font-medium">Pro Plan</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/60">Next Billing</span>
            <span className="font-medium">May 15, 2024</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "item3",
    title: "Notifications",
    badge: "Configure",
    content: (
      <div className="space-y-3">
        <p>Customize how and when you receive notifications.</p>
        <RadioGroup defaultValue="email" className="text-xs font-medium">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <label htmlFor="email">Email notifications</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="push" id="push" />
            <label htmlFor="push">Push notifications</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sms" id="sms" />
            <label htmlFor="sms">SMS alerts</label>
          </div>
        </RadioGroup>
      </div>
    ),
  },
  {
    id: "item4",
    title: "Team Members",
    badge: "5 Members",
    content: (
      <div className="space-y-3">
        <p>Manage team members and their permissions.</p>
        <div className="space-y-2">
          {[
            "John Doe",
            "Jane Smith",
            "Bob Johnson",
            "Alice Brown",
            "Charlie Wilson",
          ].map((name) => (
            <div
              key={name}
              className="flex items-center justify-between py-1.5 px-3 bg-foreground/5 backdrop-blur-lg border rounded-sm"
            >
              <span>{name}</span>
              <span className="text-[0.6rem] px-1.5 py-0.5 bg-green-500 text-white rounded">
                Admin
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "item5",
    title: "API Keys",
    badge: "2 Keys",
    content: (
      <div className="space-y-3">
        <p>Manage your API keys and access tokens.</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 py-2 bg-foreground/5 backdrop-blur-lg border rounded-sm">
            <div>
              <div className="font-medium">Production Key</div>
              <div className="text-sm text-foreground/40">
                Created: Apr 12, 2024
              </div>
            </div>
            <button className="py-1 px-3 cursor-pointer text-sm bg-red-500 text-white rounded-sm">
              Revoke
            </button>
          </div>
          <div className="flex items-center justify-between px-3 py-2 bg-foreground/5 backdrop-blur-lg border rounded-sm">
            <div>
              <div className="font-medium">Development Key</div>
              <div className="text-sm text-foreground/40">
                Created: Apr 1, 2024
              </div>
            </div>
            <button className="py-1 px-3 cursor-pointer text-sm bg-red-500 text-white rounded-sm">
              Revoke
            </button>
          </div>
        </div>
      </div>
    ),
  },
];

export default function BasicAccordionDemo() {
  const [openItem, setOpenItem] = useState<string | null>("item1");

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-2 p-5 md:p-10 overflow-auto m-auto max-w-2xl w-full h-full">
      {demoItems.map((item) => {
        const isOpen = openItem === item.id;

        return (
          <div
            key={item.id}
            className="w-full border rounded-lg overflow-hidden hover:shadow-lg/10 transition-all duration-500"
          >
            {/* Accordion Header / Trigger */}
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer"
            >
              <div className="flex-1 flex items-center gap-3">
                <span className="font-semibold">{item.title}</span>
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            {/* Accordion Content Wrapper - CSS Grid Auto-Height */}
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-4 pt-2 border-t">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
