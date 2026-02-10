// app/components/ai-searches.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingUp,
  Clock,
  Star,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchResult {
  id: string;
  query: string;
  category: string;
  relevance: number;
  frequency: number;
  trending: boolean;
}

interface SearchSuggestion {
  id: string;
  query: string;
  description: string;
  type: "related" | "trending" | "ai-enhanced";
}

export default function AISearches() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([
    {
      id: "1",
      query: "AI image generation models",
      category: "Technology",
      relevance: 95,
      frequency: 234,
      trending: true,
    },
    {
      id: "2",
      query: "Machine learning algorithms",
      category: "Education",
      relevance: 92,
      frequency: 189,
      trending: true,
    },
    {
      id: "3",
      query: "Natural language processing",
      category: "Technology",
      relevance: 88,
      frequency: 156,
      trending: false,
    },
    {
      id: "4",
      query: "Neural networks tutorial",
      category: "Education",
      relevance: 85,
      frequency: 143,
      trending: true,
    },
    {
      id: "5",
      query: "Data science tools 2024",
      category: "Tools",
      relevance: 90,
      frequency: 178,
      trending: false,
    },
  ]);

  const [suggestions] = useState<SearchSuggestion[]>([
    {
      id: "s1",
      query: "How to fine-tune GPT models?",
      description: "Step-by-step guide with best practices",
      type: "ai-enhanced",
    },
    {
      id: "s2",
      query: "Transformer architecture explained",
      description: "Visual breakdown of attention mechanisms",
      type: "related",
    },
    {
      id: "s3",
      query: "Real-time AI applications",
      description: "Live use cases and implementations",
      type: "trending",
    },
    {
      id: "s4",
      query: "AI ethics and guidelines",
      description: "Latest regulatory frameworks",
      type: "ai-enhanced",
    },
  ]);

  const [recentSearches, setRecentSearches] = useState<string[]>([
    "AI model deployment",
    "Machine learning pipeline",
    "Deep learning frameworks",
  ]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const newResult: SearchResult = {
        id: Date.now().toString(),
        query: searchQuery,
        category: "User",
        relevance: Math.floor(Math.random() * 20) + 80,
        frequency: 1,
        trending: true,
      };
      setResults([newResult, ...results.slice(0, 4)]);
      setRecentSearches([searchQuery, ...recentSearches.slice(0, 2)]);
      setSearchQuery("");
    }
  };

  return (
    <Card className="border-2 border-primary/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>AI Search Intelligence</CardTitle>
            <p className="text-sm text-muted-foreground">
              Context-aware search with smart suggestions
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Ask AI anything or search..."
              className="pl-10 pr-20 py-6"
            />
            <Button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 gap-2"
            >
              <Zap className="h-4 w-4" />
              Search
            </Button>
          </div>

          <Tabs defaultValue="trending">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="suggestions">
                <Star className="h-4 w-4 mr-2" />
                Suggestions
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-4 pt-4">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium">{result.query}</span>
                      {result.trending && (
                        <Badge variant="outline" className="bg-orange-500/10">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{result.category}</span>
                      <span>•</span>
                      <span>{result.frequency} searches</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${result.relevance}%` }}
                          />
                        </div>
                        {result.relevance}% relevant
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4 pt-4">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-3 rounded-lg border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{suggestion.query}</h4>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.description}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`
                        ${
                          suggestion.type === "ai-enhanced"
                            ? "bg-purple-500/10 text-purple-700"
                            : suggestion.type === "trending"
                              ? "bg-orange-500/10 text-orange-700"
                              : "bg-blue-500/10 text-blue-700"
                        }
                      `}
                    >
                      {suggestion.type}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Explore this topic
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="recent" className="space-y-3 pt-4">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{search}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery(search)}
                  >
                    Search again
                  </Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
