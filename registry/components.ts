import { createComponents } from "./component-utils";

// Updated to include folder paths (auto-generated) with icon support
export const COMPONENTS = createComponents([
  {
    category: "Feedbacks",
    icon: "messages-square",
    tags: ["ui", "feedback", "notifications", "interaction", "frontend"],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "Alerts",
        description:
          "Alert UI components designed to deliver clear, immediate, and accessible feedback for system states, user actions, warnings, errors, and important application notifications.",
        tags: ["alert", "notifications", "banner", "action", "animated"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Standard Alert" },
          { itemName: "Banner Alert" },
          { itemName: "Action Alert" },
          { itemName: "Animated Alert" },
          { itemName: "Notification Bell" },
        ],
      },
      {
        name: "Popups",
        description:
          "Popup and modal UI components created to capture user attention for confirmations, forms, alerts, and critical interactions without navigating away from the current context.",
        tags: ["popup", "modal", "overlay", "interactive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Popup 1" }, { itemName: "Popup 2" }],
      },
      {
        name: "Modal Alerts",
        description:
          "Modal-based alert components intended for high-priority messages that require explicit user acknowledgment or confirmation before proceeding.",
        tags: ["modal", "critical", "confirmation", "blocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Standard Modal Alert" }],
      },
      {
        name: "Snackbars",
        description:
          "Snackbar UI components used to display brief, temporary, and auto-dismissable feedback related to user actions or background system events.",
        tags: ["snackbar", "temporary", "action", "nonblocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Snackbar 1" }, { itemName: "Snackbar 2" }],
      },
      {
        name: "Toasts",
        description:
          "Toast notification components optimized for lightweight, time-based feedback that informs users without interrupting their workflow.",
        tags: ["toast", "feedback", "ephemeral", "nonintrusive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Toast 1" }],
      },
    ],
  },
  {
    category: "Badges",
    icon: "badge-check",
    tags: ["ui", "feedback", "notifications", "interaction", "frontend"],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "Status Badges",
        description:
          "Status badge components designed to visually communicate system states, progress, priorities, and user or connection statuses at a glance.",
        tags: ["status", "system", "connection", "priority"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Basic Status Badge" },
          { itemName: "Connection Status Badge" },
          { itemName: "Priority Status Badge" },
          { itemName: "Progress Status Badge" },
          { itemName: "System Status Badge" },
          { itemName: "User Status Badge" },
        ],
      },
    ],
  },
  // Example of another category:
  // {
  //   category: "Forms",
  //   icon: "form-input", // Required category icon
  //   tags: ["form", "input", "validation"],
  //   techs: ["React Hook Form", "Zod"],
  //   subcategories: [
  //     {
  //       name: "Inputs",
  //       description: "Form input components",
  //       icon: "keyboard", // Optional subcategory icon
  //       tags: ["input", "text", "control"],
  //       techs: ["React", "Tailwind CSS"],
  //       items: [
  //         {
  //           itemName: "Text Input",
  //           description: "A text input field",
  //           tags: ["text", "input"],
  //         },
  //       ],
  //     },
  //   ],
  // },
]);
