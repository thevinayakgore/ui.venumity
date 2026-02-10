"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Wand2,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Video,
  Copy,
  Download,
  RefreshCw,
  Zap,
  CheckCircle,
} from "lucide-react";

type ContentType = "article" | "image" | "video" | "code" | "social";
type Tone = "professional" | "casual" | "persuasive" | "technical" | "creative";

interface GeneratedContent {
  id: string;
  type: ContentType;
  title: string;
  content: string;
  parameters: Record<string, unknown>;
  timestamp: Date;
}

const INITIAL_GENERATED_CONTENTS: GeneratedContent[] = (() => {
  const now = new Date();
  return [
    {
      id: "1",
      type: "article",
      title: "The Future of AI in 2024",
      content:
        "Artificial Intelligence continues to revolutionize industries...",
      parameters: { tone: "professional", length: 800 },
      timestamp: new Date(now.getTime() - 3600000),
    },
    {
      id: "2",
      type: "social",
      title: "Twitter Thread: AI Ethics",
      content: "🧵 AI ethics isn't just about algorithms...",
      parameters: { tone: "casual", platform: "twitter" },
      timestamp: new Date(now.getTime() - 7200000),
    },
    {
      id: "3",
      type: "code",
      title: "React AI Component",
      content: "import { useState } from 'react';\n// AI-powered component...",
      parameters: { language: "typescript", framework: "react" },
      timestamp: new Date(now.getTime() - 10800000),
    },
  ];
})();

export default function AIContentGenerators() {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState<ContentType>("article");
  const [tone, setTone] = useState<Tone>("professional");
  const [length, setLength] = useState([500]);
  const [creativity, setCreativity] = useState([70]);
  const [includeSEO, setIncludeSEO] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContents, setGeneratedContents] = useState<
    GeneratedContent[]
  >(() => INITIAL_GENERATED_CONTENTS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const contentTypes = [
    {
      value: "article",
      label: "Article",
      icon: <FileText className="h-4 w-4" />,
    },
    { value: "image", label: "Image", icon: <ImageIcon className="h-4 w-4" /> },
    { value: "video", label: "Video", icon: <Video className="h-4 w-4" /> },
    { value: "code", label: "Code", icon: <Copy className="h-4 w-4" /> },
    {
      value: "social",
      label: "Social Media",
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  const tones = [
    { value: "professional", label: "Professional", color: "bg-blue-500" },
    { value: "casual", label: "Casual", color: "bg-green-500" },
    { value: "persuasive", label: "Persuasive", color: "bg-purple-500" },
    { value: "technical", label: "Technical", color: "bg-orange-500" },
    { value: "creative", label: "Creative", color: "bg-pink-500" },
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        type: contentType,
        title: `Generated ${contentType}: ${prompt.substring(0, 30)}...`,
        content:
          contentType === "article"
            ? `This is an AI-generated article about "${prompt}". The content is written in a ${tone} tone with approximately ${length[0]} words. ${includeSEO ? "SEO optimized keywords have been included." : ""}`
            : contentType === "code"
              ? `// AI-generated ${tone} code\nfunction handleAIRequest() {\n  // Implementation for: ${prompt}\n  return "AI response";\n}`
              : `Generated ${contentType} content based on: "${prompt}"`,
        parameters: {
          tone,
          length: length[0],
          creativity: creativity[0],
          includeSEO,
          prompt,
        },
        timestamp: new Date(),
      };

      setGeneratedContents([newContent, ...generatedContents.slice(0, 2)]);
      setIsGenerating(false);
      setPrompt("");
    }, 2000);
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIcon = (type: ContentType) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "code":
        return <Copy className="h-4 w-4" />;
      case "social":
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-2 border-primary/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Wand2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>AI Content Generator</CardTitle>
            <p className="text-sm text-muted-foreground">
              Create content 10x faster with AI assistance
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>What do you want to create?</Label>
                <div className="flex flex-wrap gap-2">
                  {contentTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={
                        contentType === type.value ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setContentType(type.value as ContentType)}
                      className="gap-2"
                    >
                      {type.icon}
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Describe your content</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to create..."
                  className="min-h-25"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <Label>Tone & Style</Label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((t) => (
                      <Badge
                        key={t.value}
                        variant={tone === t.value ? "default" : "outline"}
                        className={`cursor-pointer gap-1 ${tone === t.value ? t.color : ""}`}
                        onClick={() => setTone(t.value as Tone)}
                      >
                        {t.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="creativity">
                      Creativity: {creativity[0]}%
                    </Label>
                    <Badge variant="outline">
                      {creativity[0] < 50
                        ? "Conservative"
                        : creativity[0] < 80
                          ? "Balanced"
                          : "Creative"}
                    </Badge>
                  </div>
                  <Slider
                    id="creativity"
                    value={creativity}
                    onValueChange={setCreativity}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              {contentType === "article" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="length">Length: {length[0]} words</Label>
                    <Badge variant="outline">
                      {length[0] < 300
                        ? "Short"
                        : length[0] < 700
                          ? "Medium"
                          : "Long"}
                    </Badge>
                  </div>
                  <Slider
                    id="length"
                    value={length}
                    onValueChange={setLength}
                    max={1500}
                    step={50}
                    className="w-full"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="seo">Include SEO optimization</Label>
                  <Switch
                    id="seo"
                    checked={includeSEO}
                    onCheckedChange={setIncludeSEO}
                  />
                </div>
                <Badge variant="outline" className="gap-1">
                  <Zap className="h-3 w-3" />
                  AI Enhanced
                </Badge>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full gap-2 py-6 text-lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Content
                </>
              )}
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Recent Generations</h3>
                <Badge variant="outline">
                  {generatedContents.length} items
                </Badge>
              </div>

              <AnimatePresence>
                <div className="space-y-4">
                  {generatedContents.map((content, index) => (
                    <motion.div
                      key={content.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-lg border p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            {getIcon(content.type)}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">
                              {content.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {content.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{content.type}</Badge>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {content.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-2"
                          onClick={() =>
                            handleCopy(content.id, content.content)
                          }
                        >
                          {copiedId === content.id ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                          {copiedId === content.id ? "Copied!" : "Copy"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">AI Tips</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                      Be specific with your prompts for better results
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                      Adjust creativity based on content type
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                      Use tone settings to match your brand voice
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
