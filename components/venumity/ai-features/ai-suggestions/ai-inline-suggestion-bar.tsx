"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bot,
  User,
  Briefcase,
  Zap,
  Paperclip,
  Link2,
  FileText,
  Send,
  X,
  Mic,
  Smile,
  Bold,
  Italic,
  Underline,
  MoreVertical,
  Trash2,
  ImageIcon,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
    isAI?: boolean;
  };
  content: string;
  timestamp: Date;
  subject?: string;
  isEnhancing?: boolean;
  attachments?: Attachment[];
}

interface Attachment {
  id: string;
  type: "image" | "document" | "link";
  name: string;
  size?: string;
  url?: string;
  icon?: string;
}

export default function AIInlineSuggestionBar() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: {
        name: "Aiden Smith",
        email: "aiden.smith@gmail.com",
      },
      subject: "Client resources",
      content: `Dear John,

I hope this email finds you well. I'm reaching out from BrightPath Solutions regarding an exciting opportunity to join our team as a Product Designer. As we continue to grow, we're looking for talented individuals who can contribute to the success of our company.

If you are interested in this opportunity, please share your resume and a brief cover letter outlining why you would be a great fit for our team. I would love to discuss this opportunity further.

Best regards,
Aiden Smith`,
      timestamp: new Date("2024-01-30T10:53:20"),
    },
  ]);

  // Compose mail state
  const [showCompose, setShowCompose] = useState(false);
  const [composeSubject, setComposeSubject] = useState("");
  const [composeContent, setComposeContent] = useState("");
  const [composeTo, setComposeTo] = useState("aiden.smith@gmail.com");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isEnhancingCompose, setIsEnhancingCompose] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const [showEnhanceOptions, setShowEnhanceOptions] = useState<string | null>(
    null,
  );

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const enhanceComposeMessage = async (
    type: "professional" | "friendly" | "concise",
  ) => {
    setIsEnhancingCompose(true);

    let enhancedContent = "";
    if (type === "professional") {
      enhancedContent = `Dear Aiden,

Thank you for reaching out regarding the Product Designer position at BrightPath Solutions. I am writing to express my strong interest in this opportunity and to submit my application for your consideration.

With my background in product design and passion for creating user-centered solutions, I am confident in my ability to contribute effectively to your team. I have attached my resume for your review and would welcome the opportunity to discuss my qualifications further.

Thank you for your time and consideration.

Best regards,
John`;
    } else if (type === "friendly") {
      enhancedContent = `Hi Aiden!

Thanks so much for reaching out about the Product Designer role! 😊 I'm really excited about the opportunity to join BrightPath Solutions.

I've attached my resume - would love to chat more about how I can contribute to your team's success. Let me know when works best for a call!

Cheers,
John`;
    } else {
      enhancedContent = `Hi Aiden,

Thank you for the opportunity. I'm very interested in the Product Designer position at BrightPath Solutions.

Please find my resume attached. I'd welcome the chance to discuss how my experience aligns with your team's needs.

Best,
John`;
    }

    // Animate word by word
    const words = enhancedContent.split(" ");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= words.length) {
        setComposeContent(words.slice(0, currentIndex).join(" "));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsEnhancingCompose(false);
      }
    }, 40);
  };

  const handleAddAttachment = (type: "image" | "document" | "link") => {
    const newAttachment: Attachment = {
      id: Date.now().toString() + Math.random(),
      type,
      name:
        type === "image"
          ? "image.jpg"
          : type === "document"
            ? "document.pdf"
            : "https://example.com",
      size: type !== "link" ? "2.3 MB" : undefined,
    };
    setAttachments([...attachments, newAttachment]);
    setShowAttachmentMenu(false);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter((att) => att.id !== id));
  };

  const handleSendMail = () => {
    if (!composeContent.trim() || !composeSubject.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: {
        name: "John (You)",
        email: "john.doe@gmail.com",
        isAI: false,
      },
      subject: composeSubject,
      content: composeContent,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    setMessages([...messages, newMessage]);
    setShowCompose(false);
    setComposeSubject("");
    setComposeContent("");
    setComposeTo("aiden.smith@gmail.com");
    setAttachments([]);
  };

  const summary = {
    text: `Aiden Smith from BrightPath Solutions Inc. has emailed John, extending an exciting opportunity to join their team as a Product Designer. The role involves working with a dynamic team and contributing to the company's growth. Aiden requests John to respond with his resume and a brief cover letter if interested, to discuss the opportunity further.`,
    aiGenerated: true,
    messages: 1,
  };

  return (
    <main className="flex items-center justify-center m-auto p-10 md:p-20 overflow-auto min-h-screen">
      <div className="max-w-3xl mx-auto w-full">
        {/* Email Thread Container */}
        <div className="border shadow-lg rounded-4xl overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-foreground/5 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Email Thread</h2>
            <Button
              onClick={() => setShowCompose(true)}
              className="px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full flex items-center gap-2 h-auto"
            >
              <Send className="size-3.5" />
              Compose
            </Button>
          </div>

          {/* Messages */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Sender Info */}
                <div className="flex items-start justify-between p-5 border-b">
                  <div className="flex items-start gap-3">
                    <Avatar className="size-10 rounded-full bg-foreground/5 border-2 border-foreground/10 backdrop-blur-lg">
                      <AvatarFallback className="bg-transparent">
                        {message.sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {message.sender.name}
                          </span>
                          <span className="text-sm text-foreground/40">
                            {`<${message.sender.email}>`}
                          </span>
                        </div>
                      </div>
                      {/* Sending to */}
                      <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <span className="font-medium">To :</span>
                        <span>me</span>
                      </div>
                      {/* Subject */}
                      {message.subject && (
                        <span className="flex items-center gap-2 my-0.5 text-sm text-foreground/80">
                          Subject :{" "}
                          <span className="text-foreground/50">
                            {message.subject}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-foreground/40">
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>

                {/* Message Content with Enhancement Animation */}
                <motion.div
                  className="ml-12 p-5 prose prose-sm dark:prose-invert max-w-none text-sm text-foreground/50 whitespace-pre-wrap font-mono"
                  animate={{
                    opacity: message.isEnhancing ? [1, 0.8, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: message.isEnhancing ? Infinity : 0,
                  }}
                >
                  {message.content}
                </motion.div>

                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="ml-12 px-5 pb-5 flex flex-wrap gap-2">
                    {message.attachments.map((att) => (
                      <Badge
                        key={att.id}
                        variant="secondary"
                        className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 rounded-full border border-foreground/10 hover:bg-foreground/10"
                      >
                        {att.type === "image" && (
                          <ImageIcon className="size-3.5 text-green-500" />
                        )}
                        {att.type === "document" && (
                          <FileText className="size-3.5 text-blue-500" />
                        )}
                        {att.type === "link" && (
                          <Link2 className="size-3.5 text-purple-500" />
                        )}
                        <span className="text-xs">{att.name}</span>
                        {att.size && (
                          <span className="text-xs text-foreground/40">
                            {att.size}
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Summary AI Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blue-500/10 border-t border-blue-500/30"
          >
            <Button
              onClick={() => setShowSummary(!showSummary)}
              variant="ghost"
              className="w-full px-6 py-3 flex items-center justify-between text-left bg-blue-500/10! border-b border-blue-500/20 cursor-pointer transition-all duration-500 h-auto rounded-none"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-7 rounded-full bg-blue-500 text-white backdrop-blur-lg">
                  <Bot className="size-4" />
                </div>
                <span className="font-medium">Summary AI</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Mon, 30 January 2024
                </span>
              </div>
              {showSummary ? (
                <ChevronUp className="size-4 text-gray-500" />
              ) : (
                <ChevronDown className="size-4 text-gray-500" />
              )}
            </Button>

            <AnimatePresence>
              {showSummary && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3">
                    <div className="p-4 bg-background rounded-lg border border-blue-500/30">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {summary.text}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                          AI-generated
                        </Badge>
                        <span className="text-gray-500 dark:text-gray-400">
                          using {summary.messages} message
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Compose Mail Modal */}
        <AnimatePresence>
          {showCompose && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 w-lg bg-background rounded-2xl shadow-2xl border border-foreground/10 overflow-hidden"
            >
              {/* Compose Header */}
              <div className="px-4 py-3 bg-foreground/5 border-b border-foreground/5 flex items-center justify-between">
                <h3 className="font-medium">New Message</h3>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setShowCompose(false);
                    setAttachments([]);
                    setComposeContent("");
                    setComposeSubject("");
                  }}
                  className="p-1 hover:bg-foreground/10 cursor-pointer rounded-full h-auto w-auto"
                >
                  <X className="size-4" />
                </Button>
              </div>

              {/* Compose Body */}
              <div className="px-4 py-3">
                {/* To Field */}
                <div className="flex items-center gap-2 border-b border-foreground/10">
                  <span className="text-sm font-medium">To :</span>
                  <Input
                    type="email"
                    value={composeTo}
                    onChange={(e) => setComposeTo(e.target.value)}
                    className="flex-1 bg-transparent! text-sm outline-none border-0 shadow-none focus-visible:ring-0 px-0"
                    placeholder="Recipient email"
                  />
                </div>

                {/* Subject Field */}
                <div className="flex items-center gap-2 border-b border-foreground/10">
                  <span className="text-sm font-medium">Subject :</span>
                  <Input
                    type="text"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    className="flex-1 bg-transparent! text-sm outline-none border-0 shadow-none focus-visible:ring-0 px-0"
                    placeholder="Subject"
                  />
                </div>

                {/* Message Content */}
                <div className="relative">
                  <Textarea
                    value={composeContent}
                    onChange={(e) => setComposeContent(e.target.value)}
                    rows={6}
                    className="w-full bg-transparent! text-sm resize-none font-mono border-0 shadow-none focus-visible:ring-0 px-0 h-60"
                    placeholder="Write your message..."
                  />
                </div>
                {/* Formatting Toolbar */}
                <div className="flex items-center gap-1 p-1 mt-2 bg-foreground/5 rounded-lg w-fit">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1.5 h-auto w-auto rounded-md cursor-pointer"
                      >
                        <Bold className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bold</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1.5 h-auto w-auto rounded-md cursor-pointer"
                      >
                        <Italic className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Italic</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1.5 h-auto w-auto rounded-md cursor-pointer"
                      >
                        <Underline className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Underline</TooltipContent>
                  </Tooltip>
                  <Separator
                    orientation="vertical"
                    className="bg-foreground/15 h-5 my-auto mx-1"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1.5 h-auto w-auto rounded-md cursor-pointer"
                      >
                        <Link2 className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Link</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1.5 h-auto w-auto rounded-md cursor-pointer"
                      >
                        <Smile className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add Emoji</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1.5 h-auto w-auto rounded-md cursor-pointer"
                      >
                        <Mic className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Voice Input</TooltipContent>
                  </Tooltip>
                </div>

                {/* Attachments */}
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((att) => (
                      <Badge
                        key={att.id}
                        variant="secondary"
                        className="flex items-center gap-2 px-2 py-1 bg-foreground/5 rounded-full border border-foreground/10 group hover:bg-foreground/10"
                      >
                        {att.type === "image" && (
                          <ImageIcon className="size-3 text-green-500" />
                        )}
                        {att.type === "document" && (
                          <FileText className="size-3 text-blue-500" />
                        )}
                        {att.type === "link" && (
                          <Link2 className="size-3 text-purple-500" />
                        )}
                        <span className="text-xs">{att.name}</span>
                        {att.size && (
                          <span className="text-xs text-foreground/40">
                            {att.size}
                          </span>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemoveAttachment(att.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0 h-auto w-auto ml-1"
                        >
                          <X className="size-3 text-foreground/50 hover:text-red-500" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Compose Footer */}
              <div className="px-4 py-2 bg-foreground/5 border-t flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {/* Attachment Menu */}
                  <DropdownMenu
                    open={showAttachmentMenu}
                    onOpenChange={setShowAttachmentMenu}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer hover:bg-foreground/10 transition-all duration-500 rounded-full"
                      >
                        <Paperclip className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      side="top"
                      className="w-40"
                    >
                      <DropdownMenuItem
                        onClick={() => handleAddAttachment("document")}
                        className="flex items-center gap-2 text-xs cursor-pointer"
                      >
                        <FileText className="size-3.5 text-blue-500" />
                        Document
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleAddAttachment("image")}
                        className="flex items-center gap-2 text-xs cursor-pointer"
                      >
                        <ImageIcon className="size-3.5 text-green-500" />
                        Image
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleAddAttachment("link")}
                        className="flex items-center gap-2 text-xs cursor-pointer"
                      >
                        <Link2 className="size-3.5 text-purple-500" />
                        Link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Enhance Menu */}
                  <DropdownMenu
                    open={showEnhanceOptions === "compose"}
                    onOpenChange={(open) =>
                      setShowEnhanceOptions(open ? "compose" : null)
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={isEnhancingCompose}
                        className="cursor-pointer hover:bg-foreground/10 transition-all duration-500 rounded-full"
                      >
                        {isEnhancingCompose ? (
                          <Loader className="size-4 animate-spin" />
                        ) : (
                          <Sparkles className="size-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      side="top"
                      className="w-32"
                    >
                      <DropdownMenuItem
                        onClick={() => enhanceComposeMessage("professional")}
                        disabled={isEnhancingCompose}
                        className="flex items-center gap-2 text-xs cursor-pointer"
                      >
                        <Briefcase className="size-3 text-blue-500" />
                        Professional
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => enhanceComposeMessage("friendly")}
                        disabled={isEnhancingCompose}
                        className="flex items-center gap-2 text-xs cursor-pointer"
                      >
                        <User className="size-3 text-green-500" />
                        Friendly
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => enhanceComposeMessage("concise")}
                        disabled={isEnhancingCompose}
                        className="flex items-center gap-2 text-xs cursor-pointer"
                      >
                        <Zap className="size-3 text-yellow-500" />
                        Concise
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    onClick={handleSendMail}
                    disabled={!composeContent.trim() || !composeSubject.trim()}
                    className="px-4 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed h-auto"
                  >
                    <Send className="size-3.5" />
                    Send
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setShowCompose(false);
                          setAttachments([]);
                          setComposeContent("");
                          setComposeSubject("");
                        }}
                        className="p-1.5 hover:bg-red-500/20 cursor-pointer text-foreground/50 hover:text-red-500 rounded-full"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Draft</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1.5 hover:bg-blue-500/20 text-foreground/50 hover:text-blue-500 cursor-pointer rounded-full transition-all duration-500"
                      >
                        <MoreVertical className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>More Options</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
