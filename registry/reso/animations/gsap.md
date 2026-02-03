# GSAP (GreenSock Animation Platform)

### Professional Grade Animations

GSAP is a robust JavaScript animation library that works with any framework. It's known for its performance, flexibility, and timeline control.

**Key Features:**

- Incredible performance
- Timeline sequencing
- ScrollTrigger plugin
- Morph SVG
- Physics-based animations
- Cross-browser compatibility

---

## Installation

```bash
npm install gsap
```

**Install with plugins:**

```bash
npm install gsap @gsap/shockingly
```

**Basic Setup:**

```javascript
import gsap from "gsap";

// Basic animation
gsap.to(".box", {
  x: 100,
  duration: 1,
  ease: "power2.out",
});
```

---

## Core Concepts

### 1. gsap.to() - Animate TO values

```javascript
// Move element to x: 100 over 1 second
gsap.to(".element", {
  x: 100,
  duration: 1,
  ease: "power2.inOut",
});

// Animate multiple properties
gsap.to(".box", {
  x: 200,
  y: 100,
  rotation: 360,
  duration: 2,
  ease: "bounce.out",
});
```

### 2. gsap.from() - Animate FROM values

```javascript
// Animate from starting position
gsap.from(".card", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
});
```

### 3. gsap.fromTo() - Control both start and end

```javascript
gsap.fromTo(
  ".element",
  { opacity: 0, scale: 0 },
  { opacity: 1, scale: 1, duration: 1 },
);
```

---

## Basic Animations

### 1. Simple Movement

```javascript
// Horizontal movement
gsap.to(".box", {
  x: 300,
  duration: 2,
  ease: "power2.inOut",
});

// Vertical movement with easing
gsap.to(".box", {
  y: -100,
  duration: 1.5,
  ease: "elastic.out(1, 0.3)",
});
```

### 2. Fade Animations

```javascript
// Fade in
gsap.to(".element", {
  opacity: 1,
  duration: 0.8,
  delay: 0.5,
});

// Fade out
gsap.to(".element", {
  opacity: 0,
  duration: 0.5,
  onComplete: () => {
    // Remove element from DOM
    element.remove();
  },
});
```

### 3. Scale and Rotation

```javascript
gsap.to(".logo", {
  scale: 1.2,
  rotation: 360,
  duration: 1,
  ease: "back.out(1.7)",
});
```

---

## Timelines

### 1. Basic Timeline

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 100, duration: 0.5 }, "<") // Start with previous
  .to(".box3", { rotation: 360, duration: 2 }, "-=0.5") // Start 0.5s before end
  .to(".box4", { opacity: 0, duration: 1 });
```

### 2. Timeline Controls

```javascript
const animation = gsap.timeline({
  paused: true, // Start paused
  repeat: 2, // Repeat twice
  yoyo: true, // Play forward then backward
});

animation.to(".element", { x: 100, duration: 1 });

// Control methods
animation.play();
animation.pause();
animation.reverse();
animation.seek(0.5); // Jump to 0.5 seconds
animation.restart();
```

### 3. Nested Timelines

```javascript
const master = gsap.timeline();

const child1 = gsap.timeline();
child1.to(".a", { x: 100 }).to(".b", { y: 100 });

const child2 = gsap.timeline();
child2.from(".c", { opacity: 0 }).to(".d", { rotation: 180 });

master
  .add(child1)
  .add(child2, "+=1") // Start 1 second after child1
  .to(".e", { scale: 2 });
```

---

## ScrollTrigger Plugin

### 1. Basic Scroll Animation

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".element", {
  x: 500,
  rotation: 360,
  duration: 3,
  scrollTrigger: {
    trigger: ".container",
    start: "top center",
    end: "bottom top",
    scrub: true, // Smooth scrubbing
    markers: true, // Debug markers
  },
});
```

### 2. Pin Elements

```javascript
gsap.to(".sticky-element", {
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "+=1000",
    pin: true, // Pin element during scroll
    pinSpacing: false,
  },
});
```

### 3. Scroll Progress

```javascript
gsap.from(".progress-bar", {
  scaleX: 0,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
});
```

### 4. Sequential Reveal

```javascript
gsap.utils.toArray(".reveal").forEach((element) => {
  gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
});
```

---

## Staggers and Arrays

### 1. Basic Stagger

```javascript
// Stagger children
gsap.to(".item", {
  y: 50,
  opacity: 1,
  duration: 0.5,
  stagger: 0.1, // 0.1 seconds between each
  ease: "power2.out",
});

// Grid stagger
gsap.from(".grid-item", {
  scale: 0,
  duration: 0.5,
  stagger: {
    amount: 1, // Total stagger time
    grid: "auto", // Grid layout
    from: "center", // Start from center
  },
});
```

### 2. Randomized Stagger

```javascript
gsap.from(".elements", {
  x: 100,
  duration: 1,
  stagger: {
    each: 0.1,
    from: "random", // Random order
    repeat: -1, // Infinite repeat
    yoyo: true,
  },
});
```

---

## Easing Functions

### 1. Built-in Eases

```javascript
// Basic eases
gsap.to(".el", { x: 100, ease: "power1" });
gsap.to(".el", { x: 100, ease: "power2" });
gsap.to(".el", { x: 100, ease: "power3" });
gsap.to(".el", { x: 100, ease: "power4" });

// In/Out variations
gsap.to(".el", { x: 100, ease: "power2.in" });
gsap.to(".el", { x: 100, ease: "power2.out" });
gsap.to(".el", { x: 100, ease: "power2.inOut" });

// Special eases
gsap.to(".el", { x: 100, ease: "bounce" });
gsap.to(".el", { x: 100, ease: "elastic" });
gsap.to(".el", { x: 100, ease: "back" });
gsap.to(".el", { x: 100, ease: "circ" });
```

### 2. Custom Ease

```javascript
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

// Create custom ease
CustomEase.create(
  "myEase",
  "M0,0 C0.126,0.382 0.44,0.841 0.58,0.898 0.715,0.952 0.858,1 1,1",
);

gsap.to(".element", {
  x: 500,
  duration: 2,
  ease: "myEase",
});
```

---

## SVG Animations

### 1. Path Drawing

```javascript
gsap.to("path", {
  strokeDashoffset: 0,
  duration: 2,
  ease: "power2.inOut",
});
```

### 2. Morph SVG

```javascript
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

gsap.to(".shape", {
  duration: 2,
  morphSVG: "#newShape",
  repeat: -1,
  yoyo: true,
});
```

### 3. SVG Stagger

```javascript
gsap.fromTo(
  "circle",
  { attr: { r: 0 } },
  {
    attr: { r: 10 },
    duration: 0.5,
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
  },
);
```

---

## Text Animations

### 1. Split Text

```javascript
import { SplitText } from "gsap/SplitText";

const split = new SplitText(".text", { type: "chars" });

gsap.from(split.chars, {
  opacity: 0,
  y: 50,
  rotationX: 90,
  duration: 1,
  stagger: 0.02,
  ease: "back.out(1.7)",
});
```

### 2. Typewriter Effect

```javascript
const text = "Hello, World!";
const element = document.querySelector(".typewriter");

gsap.to(element, {
  duration: text.length * 0.1,
  text: text,
  ease: "none",
});
```

---

## React Integration

### 1. useGSAP Hook

```javascript
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function AnimatedComponent() {
  const container = useRef();

  useGSAP(
    () => {
      // GSAP animations here
      gsap.from(".box", {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
    },
    { scope: container },
  ); // Scope to container

  return (
    <div ref={container}>
      <div className="box">Box 1</div>
      <div className="box">Box 2</div>
    </div>
  );
}
```

### 2. Component Animations

```javascript
import { useRef, useEffect } from "react";
import gsap from "gsap";

function FadeIn({ children }) {
  const ref = useRef();

  useEffect(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return <div ref={ref}>{children}</div>;
}
```

---

## Performance Optimization

### 1. Use will-change

```javascript
gsap.set(".element", {
  willChange: "transform, opacity",
});
```

### 2. Batch Updates

```javascript
// Instead of multiple .to() calls:
gsap.to(".element", {
  x: 100,
  rotation: 360,
  scale: 2,
  duration: 1,
});
```

### 3. Use force3D

```javascript
gsap.to(".element", {
  x: 100,
  force3D: true, // Use GPU acceleration
  duration: 1,
});
```

### 4. Reuse Animations

```javascript
const fadeIn = gsap.to(".element", {
  opacity: 1,
  duration: 0.5,
  paused: true, // Create but don't play
});

// Reuse later
fadeIn.play();
```

---

## Common Patterns

### 1. Loading Animation

```javascript
const tl = gsap.timeline({ repeat: -1 });

tl.to(".dot", {
  y: -20,
  stagger: 0.2,
  duration: 0.5,
  yoyo: true,
  repeat: 1,
  ease: "power2.inOut",
});
```

### 2. Hamburger Menu

```javascript
function toggleMenu(isOpen) {
  const tl = gsap.timeline();

  if (isOpen) {
    tl.to(".line-top", { rotation: 45, y: 8, duration: 0.3 })
      .to(".line-middle", { opacity: 0, duration: 0.1 }, 0)
      .to(".line-bottom", { rotation: -45, y: -8, duration: 0.3 }, 0);
  } else {
    tl.to(".line-top", { rotation: 0, y: 0, duration: 0.3 })
      .to(".line-middle", { opacity: 1, duration: 0.1 }, 0)
      .to(".line-bottom", { rotation: 0, y: 0, duration: 0.3 }, 0);
  }
}
```

### 3. Modal Animation

```javascript
function openModal() {
  const tl = gsap.timeline();

  tl.set(".modal", { display: "block" })
    .from(".modal-overlay", { opacity: 0, duration: 0.3 })
    .from(
      ".modal-content",
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.7)",
      },
      "-=0.2",
    );
}

function closeModal() {
  gsap.to(".modal-content", {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      gsap.set(".modal", { display: "none" });
    },
  });
}
```

---

## Best Practices

### Do:

- Use GSAP's utility methods
- Chain animations with timelines
- Utilize ScrollTrigger for scroll-based animations
- Use `gsap.context()` for React cleanup
- Optimize with `will-change` and `force3D`
- Implement proper cleanup in React effects

### Avoid:

- Direct DOM manipulation in React
- Forgetting to kill animations on unmount
- Animating layout properties (use transform)
- Overusing complex easings
- Blocking the main thread with heavy calculations

---

## Resources

**Official Documentation:**

- [GSAP Docs](https://greensock.com/docs/)
- [GSAP React](https://gsap.com/react/)
- [ScrollTrigger Docs](https://greensock.com/scrolltrigger/)

**Learning Resources:**

- [GSAP Learning Center](https://greensock.com/learning/)
- [CodePen Demos](https://codepen.io/collection/DqBvGZ)
- [Tutorials](https://greensock.com/get-started/)

**Plugins:**

- [ScrollTrigger](https://greensock.com/scrolltrigger/)
- [MorphSVG](https://greensock.com/morphsvg/)
- [Draggable](https://greensock.com/draggable/)
- [CustomEase](https://greensock.com/customease/)

---

## Quick Comparison

### Framer Motion:

```jsx
// React-first, declarative
<motion.div animate={{ x: 100 }} transition={{ duration: 1 }} />
```

### GSAP:

```javascript
// Framework-agnostic, imperative
gsap.to(".element", {
  x: 100,
  duration: 1,
});
```

### When to use Framer Motion:

- React/Next.js projects
- Simple declarative animations
- Built-in React compatibility
- Component-based animations
- Gesture-based interactions

### When to use GSAP:

- Complex timeline animations
- Scroll-triggered animations
- SVG morphing
- Physics-based animations
- Cross-framework projects
- Maximum performance needs

---

## Migration Tips

### From CSS to GSAP:

1. Replace CSS transitions with `gsap.to()`
2. Convert keyframes to timelines
3. Use ScrollTrigger for scroll animations
4. Implement proper cleanup

### From Anime.js to GSAP:

1. Replace anime() with gsap methods
2. Convert timelines
3. Update easing functions
4. Use GSAP's plugin system

---

## Community Examples

🌟 Inspiration:

- [GSAP Showcase](https://greensock.com/showcase/)
- [Awwwards GSAP Sites](https://www.awwwards.com/websites/gsap/)
- [CodePen Trending](https://codepen.io/trending)

📦 Starter Templates:

```bash
# GSAP + React Template
npx create-react-app my-app --template gsap

# GSAP + Vite Template
npm create vite@latest my-app -- --template react
# Then install GSAP
```

---

Remember: Both libraries are excellent choices. Framer Motion offers better React integration out of the box, while GSAP provides more control and features for complex animations. Choose based on your project requirements and team expertise.
