"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  TrendingUp,
  Zap,
  Users,
  Clock,
  ChevronRight,
} from "lucide-react";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  confidence: number;
  category: "optimization" | "growth" | "content" | "technical";
  votes: number;
  status: "new" | "trending" | "popular";
}

export default function AISuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "1",
      title: "Add dark mode toggle",
      description: "Implement system-aware dark mode with smooth transitions",
      confidence: 92,
      category: "optimization",
      votes: 45,
      status: "trending",
    },
    {
      id: "2",
      title: "Create video tutorials",
      description: "Short explainer videos for new features",
      confidence: 87,
      category: "content",
      votes: 32,
      status: "new",
    },
    {
      id: "3",
      title: "Add keyboard shortcuts",
      description: "Productivity shortcuts for power users",
      confidence: 95,
      category: "technical",
      votes: 67,
      status: "popular",
    },
    {
      id: "4",
      title: "Implement AI chat assistant",
      description: "Context-aware help throughout the platform",
      confidence: 89,
      category: "growth",
      votes: 28,
      status: "new",
    },
    {
      id: "5",
      title: "Add collaborative editing",
      description: "Real-time collaboration on documents",
      confidence: 84,
      category: "optimization",
      votes: 51,
      status: "trending",
    },
    {
      id: "6",
      title: "Create mobile app",
      description: "Native mobile experience for on-the-go usage",
      confidence: 91,
      category: "growth",
      votes: 89,
      status: "popular",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleVote = (id: string, type: "up" | "down") => {
    setSuggestions(
      suggestions.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            votes: type === "up" ? s.votes + 1 : Math.max(0, s.votes - 1),
          };
        }
        return s;
      }),
    );
  };

  const filteredSuggestions =
    selectedCategory === "all"
      ? suggestions
      : suggestions.filter((s) => s.category === selectedCategory);

  const categories = [
    { id: "all", label: "All", icon: <Sparkles className="h-4 w-4" /> },
    {
      id: "optimization",
      label: "Optimization",
      icon: <Zap className="h-4 w-4" />,
    },
    { id: "growth", label: "Growth", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "content", label: "Content", icon: <Users className="h-4 w-4" /> },
    {
      id: "technical",
      label: "Technical",
      icon: <Clock className="h-4 w-4" />,
    },
  ];

  return (
    <Card className="border-2 border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>AI Suggestions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Smart recommendations based on usage patterns
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            {suggestions.length} suggestions
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="gap-2"
              >
                {cat.icon}
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {filteredSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group rounded-xl border p-4 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <Badge
                          variant="secondary"
                          className={`${
                            suggestion.status === "trending"
                              ? "bg-orange-500/10 text-orange-700"
                              : suggestion.status === "popular"
                                ? "bg-green-500/10 text-green-700"
                                : "bg-blue-500/10 text-blue-700"
                          }`}
                        >
                          {suggestion.status}
                        </Badge>
                        <Badge variant="outline">
                          {suggestion.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleVote(suggestion.id, "up")}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium">
                            {suggestion.votes}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleVote(suggestion.id, "down")}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Implement <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
