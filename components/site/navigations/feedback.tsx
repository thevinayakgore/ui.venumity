// components/site/navigations/feedback.tsx
"use client";
import { useState } from "react";
import { toast } from "sonner";
import { MessageSquareQuote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Feedback() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPageUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedbackName.trim()) {
      toast.error("Please enter your username");
      return;
    }

    if (!feedbackMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: feedbackName.trim(),
          email: feedbackEmail.trim(),
          message: feedbackMessage.trim(),
          rating,
          sitePageUrl: currentPageUrl,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you for your feedback!", {
          description: "We'll use it to improve your experience.",
        });

        setFeedbackName("");
        setFeedbackEmail("");
        setFeedbackMessage("");
        setRating(0);
        setHoveredRating(null);
        setFeedbackOpen(false);
      } else {
        toast.error("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Popover open={feedbackOpen} onOpenChange={setFeedbackOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="h-8! bg-blue-500! border-0! text-white! hover:shadow-lg shadow-blue-500/40 transition-all duration-500 rounded-sm"
        >
          <MessageSquareQuote />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        className="absolute top-5 left-0 -translate-x-full font-semibold tracking-wide w-lg! p-0 rounded-2xl overflow-hidden border bg-background shadow-xl"
      >
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="size-5 text-blue-500" />

            <h3 className="text-xl font-semibold">Share your feedback</h3>
          </div>

          <p className="text-sm text-muted-foreground mt-1">
            Help us improve your experience. We read every message.
          </p>
        </div>

        <form onSubmit={handleFeedbackSubmit} className="p-6 pt-2 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="feedback-name" className="text-sm font-medium">
              Username <span className="text-red-400">*</span>
            </Label>

            <Input
              id="feedback-name"
              placeholder="thevinayakgore"
              value={feedbackName}
              onChange={(e) => setFeedbackName(e.target.value)}
              className="px-4! py-5! placeholder:text-foreground/40! border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-email" className="text-sm font-medium">
              Email <span className="text-muted-foreground">(optional)</span>
            </Label>

            <Input
              id="feedback-email"
              type="email"
              placeholder="alex@example.com"
              value={feedbackEmail}
              onChange={(e) => setFeedbackEmail(e.target.value)}
              className="px-4! py-5! placeholder:text-foreground/40! border-input"
            />

            <p className="text-[11px] text-muted-foreground">
              We will only use this to reply if you would like an answer.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-message" className="text-sm font-medium">
              Message <span className="text-red-400">*</span>
            </Label>

            <Textarea
              id="feedback-message"
              placeholder="What's on your mind? Suggestions, bugs, praise – all welcome."
              rows={4}
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              className="px-4! py-3! placeholder:text-foreground/40! border-input resize-none min-h-20 max-h-35"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Star Rating <span className="text-red-400">*</span>
            </Label>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoveredRating ?? rating) >= star;

                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    className="transition-transform duration-200 hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`size-6.5 stroke-1 transition-all duration-500 ${
                        active
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/40"
                      }`}
                    />
                  </button>
                );
              })}

              <span className="ml-2 text-xs text-muted-foreground">
                {rating > 0 ? `${rating}/5` : "Select rating"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 p-5! font-semibold! bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isSubmitting ? "Sending..." : "Send feedback"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setFeedbackOpen(false)}
              className="flex-1 p-5! font-semibold!"
            >
              Cancel
            </Button>
          </div>

          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground pt-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>Your feedback helps us build better products</span>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
