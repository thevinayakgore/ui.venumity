"use client";
import * as React from "react";
import {
  Globe,
  Settings,
  Database,
  Rocket,
  CloudCog,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./index";

interface Item {
  title: string;
  description: string;
  bullets: string[];
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  tools: Item[];
}

const DATA: Category[] = [
  {
    id: "blog-strategy",
    title: "Blog strategy",
    description: "Plan and position your blog for growth and impact.",
    icon: <Globe />,
    badge: "3 topics",
    tools: [
      {
        title: "Niche & positioning",
        description:
          "Define your blog’s focus, audience, and unique angle in a crowded space.",
        bullets: [
          "Identify a clear target reader and their problems",
          "Choose a specific niche instead of “everything”",
          "Craft a one‑sentence positioning statement",
        ],
      },
      {
        title: "Content pillars",
        description:
          "Organize your blog into 3–5 core themes that guide every post.",
        bullets: [
          "Pick 3–5 high‑level topics you can write about repeatedly",
          "Map subtopics and post ideas under each pillar",
          "Use pillars to keep your blog coherent and focused",
        ],
      },
    ],
  },
  {
    id: "content-creation",
    title: "Content creation",
    description: "Write and produce posts that people actually read and share.",
    icon: <Settings />,
    badge: "3 topics",
    tools: [
      {
        title: "Post structure",
        description:
          "Use proven structures to make your posts scannable and valuable.",
        bullets: [
          "Start with a clear promise in the intro",
          "Use headings, lists, and short paragraphs",
          "End with a concrete next step or summary",
        ],
      },
      {
        title: "Headlines & hooks",
        description:
          "Craft titles and opening lines that earn the click and the read.",
        bullets: [
          "Write 5–10 headline options before picking one",
          "Use specific outcomes, numbers, and curiosity",
          "Test hooks that state a problem, promise, or insight",
        ],
      },
      {
        title: "Visuals & formatting",
        description:
          "Make posts visually easy to consume with simple design choices.",
        bullets: [
          "Add screenshots, diagrams, or simple images",
          "Use consistent heading and code styles",
          "Highlight key lines with callouts or quotes",
        ],
      },
    ],
  },
  {
    id: "seo-distribution",
    title: "SEO & distribution",
    description:
      "Get your posts found and shared beyond your existing audience.",
    icon: <Database />,
    badge: "3 topics",
    tools: [
      {
        title: "Keyword research",
        description:
          "Find topics people search for and match them to your blog’s strengths.",
        bullets: [
          "Use free tools to find low‑competition keywords",
          "Focus on intent: informational, commercial, navigational",
          "Turn keyword clusters into series of posts",
        ],
      },
      {
        title: "On‑page SEO",
        description:
          "Optimize each post so search engines understand and rank it.",
        bullets: [
          "Write clear title tags and meta descriptions",
          "Use descriptive headings and internal links",
          "Add alt text and semantic HTML where it matters",
        ],
      },
      {
        title: "Promotion channels",
        description: "Share your posts where your readers already spend time.",
        bullets: [
          "Post in relevant communities without spamming",
          "Repurpose posts into threads, carousels, or short videos",
          "Build an email list and send each new post",
        ],
      },
    ],
  },
  {
    id: "monetization",
    title: "Monetization",
    description: "Turn your blog into a sustainable source of income.",
    icon: <Rocket />,
    badge: "3 topics",
    tools: [
      {
        title: "Offers & products",
        description:
          "Design simple offers that solve real problems for your readers.",
        bullets: [
          "Start with services, templates, or small digital products",
          "Validate ideas with your audience before building",
          "Keep your offer tightly aligned with your content",
        ],
      },
      {
        title: "Affiliate & sponsorships",
        description:
          "Earn by recommending tools and partnering with relevant brands.",
        bullets: [
          "Only promote tools you genuinely use and trust",
          "Create dedicated comparison or “best of” posts",
          "Set clear rates and expectations for sponsors",
        ],
      },
      {
        title: "Email & community",
        description:
          "Build owned audiences that increase lifetime value per reader.",
        bullets: [
          "Use lead magnets tied to your best posts",
          "Send consistent, valuable emails (not just links)",
          "Consider paid newsletters or member communities",
        ],
      },
    ],
  },
  {
    id: "analytics-improvement",
    title: "Analytics & improvement",
    description: "Measure what matters and continuously improve your blog.",
    icon: <CloudCog />,
    badge: "2 topics",
    tools: [
      {
        title: "Key metrics",
        description: "Track a small set of metrics that reflect real progress.",
        bullets: [
          "Traffic sources and top posts",
          "Email signups and conversion rates",
          "Revenue per post and per visitor",
        ],
      },
      {
        title: "Iteration loop",
        description:
          "Use data and feedback to refine topics, formats, and distribution.",
        bullets: [
          "Review performance monthly, not daily",
          "Double down on topics and formats that work",
          "Kill or update underperforming content systematically",
        ],
      },
    ],
  },
];

export default function NestedAccordionDemo() {
  return (
    <Accordion
      variant="minimal"
      behavior="multiple"
      className="p-5 md:p-10 max-w-2xl"
    >
      {DATA.map((DataProps) => (
        <AccordionItem key={DataProps.id} value={DataProps.id}>
          <AccordionTrigger># {DataProps.title}</AccordionTrigger>
          <AccordionContent className="py-0">
            <Accordion variant="minimal" behavior="multiple">
              {DataProps.tools.map((tool) => (
                <AccordionItem
                  key={tool.title}
                  value={`${DataProps.id}-${tool.title}`}
                >
                  <AccordionTrigger># {tool.title}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {tool.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
