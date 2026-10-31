import { ChatSuggestions } from "./index";

const messages = [
  {
    id: "1",
    sender: "user" as const,
    text: "Hello Alex, tell me about yourself",
  },
  {
    id: "2",
    sender: "assistant" as const,
    text: "Good morning! Here's your daily brief.",
  },
  {
    id: "3",
    sender: "user" as const,
    text: "Perfect! Let's focus on finishing the homepage design.",
  },
];

const suggestions = [
  { text: "Can you summarize today's conversation and key points ?" },
  { text: "Help me create a task based on this discussion." },
  { text: "What are the main action items from this chat ?" },
  { text: "Draft a follow-up message for this conversation." },
];

export default function Demo() {
  return (
    <ChatSuggestions
      variant="floating"
      messages={messages}
      suggestions={suggestions}
      autoReply="Here is the drafted follow-up message."
    />
  );
}
