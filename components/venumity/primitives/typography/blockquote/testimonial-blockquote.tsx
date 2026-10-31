import { BlockquoteList } from "./index";

const testimonials = [
  {
    id: "1",
    quote:
      "The motion presets in Venumity are the first I have seen that actually respect the ban on scale and blur. It feels like a design system built by someone who reads specs.",
    cite: "Nina Park",
    role: "Design Lead · Atlas",
    avatar: "https://i.pravatar.cc/150?img=44",
    rating: 3,
  },
  {
    id: "2",
    quote:
      "Shipped our onboarding in a day. Every primitive worked out of the box, keyboard nav included. The reduced-motion handling is flawless.",
    cite: "Marcus Chen",
    role: "Engineer · Nova",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Finally, structural motion that does not feel like a demo. Height collapse, clip-path wipes, stroke draws — everything has a purpose.",
    cite: "Sofia Reyes",
    role: "Staff Engineer · Orbit",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 4,
  },
];

export default function TestimonialBlockquoteDemo() {
  return (
    <div className="max-w-3xl space-y-3">
      <BlockquoteList
        columns={2}
        tone="info"
        items={testimonials}
        variant="testimonial"
      />
    </div>
  );
}
