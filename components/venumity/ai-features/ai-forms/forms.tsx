"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Bot, Zap } from "lucide-react";

export default function AIForms() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card className="border border-primary/15 bg-linear-to-br from-background to-primary/5 shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/20">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>AI Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">
              Ask anything. Get instant AI-powered results.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="prompt">Your prompt</Label>
          <Textarea
            id="prompt"
            placeholder="e.g. Write a landing page headline for a SaaS startup..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-28 transition-all focus:ring-2 focus:ring-primary/30"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{prompt.length} characters</span>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI Ready
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-border/60">
          <Button
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Generating
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Generate
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            Powered by AI • Responses may vary
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
