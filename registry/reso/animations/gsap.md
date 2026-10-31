## Lesson 1: What Is GSAP ?

GSAP is a JavaScript animation library that animates values over time. It can animate CSS properties, transforms, SVG attributes, JavaScript object values, colors, and even custom data.

Unlike CSS animations, GSAP gives developers imperative control over animation playback. You can play, pause, reverse, restart, seek, slow down, speed up, and sequence animations precisely.

### Basic example

```js
gsap.to(".box", {
  x: 200,
  opacity: 1,
  duration: 1,
  ease: "power2.out",
});
```

This moves every element with the class `.box` 200 pixels to the right and fades it in over one second.

### What GSAP can animate

- CSS properties such as `opacity`, `color`, and `background-color`
- Transform properties such as `x`, `y`, `scale`, and `rotation`
- SVG attributes and paths
- JavaScript object properties
- Canvas values
- Text content
- Timeline-based sequences
- Scroll-linked animations using ScrollTrigger

GSAP can animate HTML elements, CSS properties, SVG graphics, canvas elements, and JavaScript values with precise control. [129]

---

## Lesson 2: Installation and Setup

Install GSAP using npm:

```bash
npm install gsap
```

Or using pnpm:

```bash
pnpm add gsap
```

Import GSAP:

```js
import gsap from "gsap";
```

### Basic HTML setup

```html
<div class="box"></div>

<script>
  gsap.to(".box", {
    x: 300,
    rotation: 360,
    duration: 2,
  });
</script>
```

### Basic React setup

```jsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnimatedBox() {
  const boxRef = useRef(null);

  useGSAP(() => {
    gsap.to(boxRef.current, {
      x: 200,
      duration: 1,
      ease: "power2.out",
    });
  });

  return <div ref={boxRef} className="size-24 rounded-xl bg-blue-500" />;
}
```

The official React integration recommends using `useGSAP()` to avoid creating new animations on every render and to clean up animations when components unmount. [118]

---

## Lesson 3: Tweens

A **tween** is the basic GSAP animation unit. It animates one or more properties from one value to another over a duration.

### `gsap.to()`

Animates from the current value to a target value.

```js
gsap.to(".box", {
  x: 200,
  duration: 1,
});
```

### `gsap.from()`

Animates from defined values back to the current CSS values.

```js
gsap.from(".box", {
  opacity: 0,
  y: 50,
  duration: 1,
});
```

### `gsap.fromTo()`

Defines both the starting and ending values explicitly.

```js
gsap.fromTo(
  ".box",
  { opacity: 0, scale: 0.5 },
  { opacity: 1, scale: 1, duration: 1 }
);
```

### `gsap.set()`

Sets values immediately without animation.

```js
gsap.set(".box", {
  opacity: 0,
  x: 100,
});
```

### Tween comparison

| Method | Behavior |
|---|---|
| `gsap.to()` | Animates from current value to target value |
| `gsap.from()` | Animates from given value to current value |
| `gsap.fromTo()` | Animates from explicit start value to explicit end value |
| `gsap.set()` | Applies values instantly without animation |

---

## Lesson 4: Easing

Easing controls how an animation progresses over time. Instead of moving at a constant speed, easing can make motion start slowly, accelerate, decelerate, bounce, or overshoot.

### Common easing values

| Ease | Behavior |
|---|---|
| `none` | Linear movement |
| `power1.out` | Slight deceleration |
| `power2.out` | Stronger deceleration |
| `power3.out` | Very strong deceleration |
| `power2.in` | Starts slow, ends fast |
| `power2.inOut` | Slow start and slow end |
| `back.out` | Slight overshoot |
| `elastic.out` | Elastic bounce |
| `bounce.out` | Bouncing effect |
| `circ.out` | Circular deceleration |

### Example

```js
gsap.to(".box", {
  x: 300,
  duration: 1.2,
  ease: "back.out(1.7)",
});
```

### Choosing easing

- Use `power2.out` for most UI reveals.
- Use `power2.inOut` for smooth transitions.
- Use `back.out` for playful button or card animations.
- Use `elastic.out` carefully for exaggerated motion.
- Use `none` for scroll-linked or mechanical movement.

---

## Lesson 5: Timelines

A **timeline** is a container that sequences multiple tweens. It gives precise control over when animations start, overlap, repeat, reverse, and complete.

A GSAP timeline is a container for multiple tweens that can play in sequence or overlap. [123][128]

### Basic timeline

```js
const tl = gsap.timeline();

tl.to(".title", {
  opacity: 1,
  y: 0,
  duration: 0.6,
});

tl.to(".subtitle", {
  opacity: 1,
  y: 0,
  duration: 0.6,
});

tl.to(".button", {
  opacity: 1,
  scale: 1,
  duration: 0.4,
});
```

### Position parameter

The second parameter controls when an animation starts.

```js
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 });
tl.to(".box2", { x: 100, duration: 1 }, "<"); // starts with previous tween
tl.to(".box3", { x: 100, duration: 1 }, ">"); // starts after previous tween
tl.to(".box4", { x: 100, duration: 1 }, "-=0.5"); // starts 0.5s before end
tl.to(".box5", { x: 100, duration: 1 }, "+=0.5"); // starts 0.5s after end
```

### Position parameter reference

| Value | Meaning |
|---|---|
| No value | Starts after the previous animation ends |
| `"<"` | Starts at the same time as the previous animation |
| `">"` | Starts after the previous animation ends |
| `"-=0.5"` | Starts 0.5 seconds before the previous animation ends |
| `"+=0.5"` | Starts 0.5 seconds after the previous animation ends |
| `1` | Starts at exactly 1 second on the timeline |

### Timeline controls

```js
const tl = gsap.timeline();

tl.to(".box", { x: 200, duration: 1 });

tl.play();
tl.pause();
tl.reverse();
tl.restart();
tl.seek(0.5);
tl.progress(0.75);
tl.timeScale(2);
```

---

## Lesson 6: Stagger Animations

Staggering delays each target element’s animation slightly, creating a wave-like effect.

```js
gsap.from(".card", {
  opacity: 0,
  y: 40,
  duration: 0.6,
  stagger: 0.15,
  ease: "power2.out",
});
```

### Stagger object

```js
gsap.from(".card", {
  opacity: 0,
  y: 40,
  duration: 0.6,
  stagger: {
    each: 0.1,
    from: "start",
    grid: "auto",
  },
});
```

### Stagger options

| Option | Meaning |
|---|---|
| `each` | Delay between each element |
| `amount` | Total stagger duration across all elements |
| `from` | Starting point: `"start"`, `"center"`, `"end"`, or an index |
| `grid` | Animates elements in a grid pattern |
| `ease` | Easing applied to the stagger distribution |

---

## Lesson 7: ScrollTrigger

ScrollTrigger is GSAP’s plugin for creating scroll-based animations. It can trigger animations when elements enter the viewport, scrub animations with scroll position, pin sections, and create parallax effects.

ScrollTrigger improves performance by debouncing scroll events, synchronizing updates with GSAP and screen refreshes, and recalculating positions on resize. [117]

### Installation

```bash
npm install gsap
```

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

### Basic scroll reveal

```js
gsap.from(".section", {
  opacity: 0,
  y: 60,
  duration: 1,
  scrollTrigger: {
    trigger: ".section",
    start: "top 80%",
    end: "top 30%",
    toggleActions: "play none none none",
  },
});
```

### ScrollTrigger properties

| Property | Meaning |
|---|---|
| `trigger` | Element that controls when the animation starts |
| `start` | Scroll position where animation begins |
| `end` | Scroll position where animation ends |
| `scrub` | Links animation progress to scroll position |
| `pin` | Pins an element while scrolling |
| `markers` | Shows debug markers |
| `toggleActions` | Controls play, pause, reverse, and restart behavior |
| `anticipatePin` | Reduces pinning jitter |

### Scrubbed animation

```js
gsap.to(".image", {
  scale: 1.5,
  rotation: 20,
  scrollTrigger: {
    trigger: ".image-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

With `scrub: true`, the animation progress is directly tied to scroll position.

### Smooth scrub

```js
scrollTrigger: {
  trigger: ".section",
  start: "top top",
  end: "bottom top",
  scrub: 1,
}
```

`scrub: 1` adds a one-second smoothing delay.

### Pinning

```js
gsap.to(".panel", {
  xPercent: -100,
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    end: "+=2000",
  },
});
```

Pinning keeps an element fixed while the user scrolls through a defined distance.

---

## Lesson 8: GSAP in React

GSAP is framework-agnostic and can be used in any JavaScript framework, but React requires careful handling of component mounting, updates, and cleanup. [120]

### Install React integration

```bash
npm install gsap @gsap/react
```

### Basic `useGSAP()` example

```jsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
      });
    },
    {
      scope: container,
    }
  );

  return (
    <section ref={container}>
      <h1 className="hero-title">Build with GSAP</h1>
      <p className="hero-title">High-performance web animation</p>
    </section>
  );
}
```

### Why use `useGSAP()`

- Creates animations after the component mounts.
- Avoids creating duplicate timelines on every render.
- Automatically reverts animations and ScrollTriggers on unmount.
- Supports scoped selectors.
- Handles React Strict Mode double-invocation more safely. [118][120]

### Timeline in React

```jsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TimelineExample() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
      });

      tl.to(".card", {
        scale: 1.05,
        duration: 0.3,
        stagger: 0.1,
      });
    },
    {
      scope: container,
    }
  );

  return (
    <div ref={container}>
      <div className="card">One</div>
      <div className="card">Two</div>
      <div className="card">Three</div>
    </div>
  );
}
```

### Important React rule

Create timelines inside `useGSAP()`, not directly in the component body. Creating a timeline during every render can cause duplicate animations and memory issues. [118]

---

## Lesson 9: Animating SVG

GSAP can animate SVG elements, attributes, strokes, fills, transforms, and paths.

### Basic SVG animation

```js
gsap.to("circle", {
  attr: {
    r: 60,
  },
  duration: 1,
});
```

### Stroke drawing animation

```js
gsap.fromTo(
  "#path",
  {
    strokeDasharray: 300,
    strokeDashoffset: 300,
  },
  {
    strokeDashoffset: 0,
    duration: 2,
    ease: "power2.out",
  }
);
```

### Morphing SVG paths

With the MorphSVG plugin, GSAP can morph one SVG path into another.

```js
gsap.to("#shape1", {
  morphSVG: "#shape2",
  duration: 1.5,
  ease: "power2.inOut",
});
```

---

## Lesson 10: Animating Text

GSAP can animate text using plugins such as SplitText or by manually splitting characters into spans.

### Simple text reveal

```js
gsap.from(".text", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.05,
});
```

### Character-by-character animation

```jsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TextReveal({ text }) {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".char", {
        opacity: 0,
        y: 30,
        rotateX: -90,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.out",
      });
    },
    {
      scope: container,
    }
  );

  return (
    <h1 ref={container}>
      {text.split("").map((char, index) => (
        <span key={index} className="char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}
```

---

## Lesson 11: GSAP Utilities

GSAP provides utility methods for common animation tasks.

### `gsap.utils.toArray()`

Converts a selector or collection into an array.

```js
const cards = gsap.utils.toArray(".card");

cards.forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    y: 40,
    delay: index * 0.1,
  });
});
```

### `gsap.utils.random()`

Generates random values.

```js
gsap.to(".particle", {
  x: () => gsap.utils.random(-200, 200),
  y: () => gsap.utils.random(-200, 200),
  duration: 1,
});
```

### `gsap.utils.wrap()`

Wraps values within a range.

```js
const value = gsap.utils.wrap(0, 360, 400); // 40
```

### `gsap.utils.interpolate()`

Interpolates between values.

```js
const value = gsap.utils.interpolate(0, 100, 0.5); // 50
```

---

## Lesson 12: Performance Optimization

GSAP is optimized for high-performance animation, but developers must still animate efficiently. GSAP’s ScrollTrigger is optimized through debounced scroll events, synchronized updates, and throttled resize recalculations. [117]

### Prefer transform and opacity

| Preferred | Avoid where possible |
|---|---|
| `x` | `left` |
| `y` | `top` |
| `scale` | `width` |
| `rotation` | `height` |
| `opacity` | `margin` |
| `filter` | `padding` |

### Good animation

```js
gsap.to(".card", {
  y: 0,
  opacity: 1,
  scale: 1,
  duration: 0.6,
});
```

### Expensive animation

```js
gsap.to(".card", {
  width: 400,
  height: 300,
  marginTop: 40,
  duration: 0.6,
});
```

### Performance tips

- Animate `transform` and `opacity` whenever possible.
- Avoid animating layout properties.
- Use ScrollTrigger only when needed.
- Avoid creating animations inside render functions.
- Kill animations when components unmount.
- Use `will-change` sparingly.
- Avoid animating too many DOM nodes at once.
- Use `quickTo()` or `quickSetter()` for high-frequency events such as mouse movement. [118]
- Test on real mobile devices.

---

## Lesson 13: GSAP vs Framer Motion

| Feature | GSAP | Framer Motion |
|---|---|---|
| Type | Imperative JavaScript animation library | Declarative React animation library |
| Best for | Complex sequences, scroll storytelling, precise control | React state-driven UI animations |
| React integration | Requires `useGSAP()` or manual cleanup | Native React-style API |
| Timeline control | Extremely powerful | Good but less low-level |
| ScrollTrigger | Industry-leading scroll animation system | Scroll hooks available |
| SVG animation | Very strong | Strong |
| Learning curve | Higher for advanced features | Lower for basic React animations |
| Bundle size | Can be larger depending on plugins | Generally smaller for basic use |
| Framework support | Framework-agnostic | Primarily React-focused |

GSAP gives developers more imperative control and is framework-agnostic, while Framer Motion is more declarative and naturally aligned with React component state. [120][104]

---

## Lesson 14: Advantages of GSAP

- Extremely powerful timeline system.
- Precise control over playback, sequencing, and synchronization.
- Excellent scroll animation support through ScrollTrigger.
- Framework-agnostic and reusable across projects.
- Strong SVG and canvas animation support.
- High-performance animation engine.
- Rich plugin ecosystem.
- Suitable for creative websites, marketing pages, games, and interactive storytelling.
- Works well with React when cleanup is handled correctly. [120]

---

## Lesson 15: Disadvantages and Limitations

| Limitation | Explanation |
|---|---|
| Imperative style | More manual control can mean more code |
| React cleanup complexity | Incorrect usage can cause memory leaks or duplicate animations |
| Learning curve | Timelines, ScrollTrigger, and plugins require practice |
| Bundle size | Core GSAP plus plugins can increase JavaScript bundle size |
| Over-animation risk | Too much motion can reduce usability |
| Plugin licensing | Some advanced GSAP plugins may have licensing considerations |
| Not always necessary | Simple hover or fade effects may be better with CSS |
| Debugging complexity | Complex timelines can become hard to maintain |

---

## Lesson 16: Most Important Interview Questions

### 1. What is GSAP?

GSAP is a high-performance JavaScript animation library used to animate DOM elements, CSS properties, SVG, canvas, and JavaScript objects.

### 2. What is a tween in GSAP?

A tween is a single animation that changes one or more properties over time.

```js
gsap.to(".box", {
  x: 100,
  duration: 1,
});
```

### 3. What is the difference between `gsap.to()`, `gsap.from()`, and `gsap.fromTo()`?

| Method | Behavior |
|---|---|
| `gsap.to()` | Animates from current value to target value |
| `gsap.from()` | Animates from given value to current value |
| `gsap.fromTo()` | Animates from explicit start value to explicit end value |

### 4. What is a GSAP timeline?

A timeline is a container that sequences multiple tweens. It allows developers to control when animations start, overlap, repeat, reverse, and complete. [123][128]

### 5. What is easing?

Easing defines how an animation progresses over time, such as linear, accelerating, decelerating, bouncing, or elastic movement.

### 6. What is ScrollTrigger?

ScrollTrigger is a GSAP plugin that links animations to scroll position. It can trigger animations, scrub timelines, pin sections, and create parallax effects. [117]

### 7. What is scrubbing?

Scrubbing links an animation’s progress directly to scroll position. As the user scrolls forward or backward, the animation moves forward or backward.

### 8. What is pinning in ScrollTrigger?

Pinning keeps an element fixed on the screen while the user scrolls through a defined scroll distance.

### 9. What is stagger?

Stagger delays the animation of multiple target elements by a small interval, creating a sequential or wave-like effect.

### 10. What is `gsap.set()`?

`gsap.set()` applies property values immediately without animation.

### 11. What is the position parameter in a timeline?

The position parameter determines when a tween starts within a timeline, such as immediately after, overlapping, or at a specific time.

### 12. What is `gsap.utils.toArray()`?

It converts a selector string, NodeList, or array-like collection into a JavaScript array.

### 13. What is `gsap.utils.random()`?

It generates a random number within a specified range.

### 14. What is `gsap.utils.interpolate()`?

It calculates an intermediate value between two values based on a progress value.

### 15. What is `useGSAP()`?

`useGSAP()` is the official React hook for GSAP. It helps create animations after mount and automatically reverts animations and ScrollTriggers when the component unmounts. [118][120]

### 16. Why should you not create GSAP timelines directly in a React component body?

A component body runs on every render. Creating a timeline there can create duplicate animations and memory leaks. Timelines should be created inside `useGSAP()`. [118]

### 17. What is `gsap.context()`?

`gsap.context()` groups GSAP animations and ScrollTriggers so they can be reverted together. The `useGSAP()` hook uses this internally for React cleanup. [120]

### 18. Which properties should be animated for performance?

Prefer `transform` properties such as `x`, `y`, `scale`, and `rotation`, plus `opacity`. Avoid animating layout-heavy properties such as `width`, `height`, `top`, `left`, `margin`, and `padding`. [123][128]

### 19. What is `quickTo()`?

`quickTo()` creates a highly optimized function for repeatedly updating a property, making it useful for mouse movement, drag interactions, and other high-frequency events. [118]

### 20. What is the difference between GSAP and CSS animations?

CSS animations are declarative and best for simple effects. GSAP is imperative, framework-agnostic, and better for complex sequencing, dynamic values, scroll interactions, SVG animation, and playback control.

---

## Lesson 17: Senior-Level Interview Questions

### 1. How does GSAP achieve high performance?

GSAP uses an optimized animation ticker, batches DOM reads and writes, synchronizes updates with screen refreshes, and favors GPU-accelerated transform and opacity animations. ScrollTrigger also debounces scroll events and throttles resize recalculations. [117][123]

### 2. How would you use GSAP safely in React?

Use `useGSAP()`, create animations inside the hook, scope selectors using a ref, avoid creating timelines during render, and allow the hook to clean up animations and ScrollTriggers on unmount. [118][120]

### 3. What happens if you create a GSAP animation inside `useEffect` without cleanup?

The animation or ScrollTrigger may remain active after the component unmounts. This can cause memory leaks, duplicate animations, and unexpected behavior.

### 4. How does ScrollTrigger calculate animation progress?

It calculates the trigger element’s start and end scroll positions, compares them with the current scroll position, and maps that progress to the linked tween or timeline.

### 5. What is the difference between `scrub: true` and `scrub: 1`?

`scrub: true` links animation progress directly to scroll position. `scrub: 1` adds one second of smoothing, making the animation follow scroll movement with a slight delay.

### 6. How would you optimize a scroll-heavy GSAP page?

Use transform and opacity animations, avoid pinning too many sections, reduce the number of ScrollTriggers, avoid animating large numbers of elements, use `once: true` where appropriate, and refresh ScrollTrigger after layout changes.

### 7. How would you animate a list without layout thrashing?

Animate `y`, `opacity`, and `scale` instead of `height`, `top`, or `margin`. Use stable keys, batch animations, and avoid repeatedly forcing layout calculations.

### 8. What is the difference between GSAP and Framer Motion?

GSAP is imperative and framework-agnostic, with powerful timelines and ScrollTrigger. Framer Motion is declarative and React-focused, with strong support for component state, gestures, layout animations, and exit animations.

### 9. How would you handle GSAP animations in Next.js App Router?

Use Client Components for animation logic, import GSAP and plugins on the client, create animations in `useGSAP()`, and ensure cleanup happens when components unmount.

### 10. How would you debug a GSAP animation?

Use `markers: true` in ScrollTrigger, inspect timeline positions with `tl.progress()`, check whether animations are created multiple times, verify selectors, inspect conflicting CSS, and test after layout changes using `ScrollTrigger.refresh()`.

---

## Lesson 18: Best Practices

- Use GSAP for complex or interactive animations.
- Use CSS for simple hover, focus, and loading effects.
- Create animations inside `useGSAP()` in React.
- Store timelines in refs when they must be accessed later.
- Scope selectors to avoid affecting unrelated elements.
- Use `gsap.context()` or `useGSAP()` for cleanup.
- Prefer `transform` and `opacity` animations.
- Avoid animating layout-heavy CSS properties.
- Use ScrollTrigger efficiently.
- Respect reduced-motion preferences.
- Avoid excessive animation on mobile devices.
- Test performance using production builds.

---

## Summary

GSAP is a professional-grade JavaScript animation library designed for precise, high-performance web animation. Its core strengths are tweens, timelines, easing, stagger effects, SVG animation, and ScrollTrigger-based scroll experiences.

For beginners, start with `gsap.to()`, `gsap.from()`, `gsap.fromTo()`, timelines, easing, and stagger. For interviews, focus on timelines, ScrollTrigger, scrubbing, pinning, React cleanup, performance optimization, and the difference between GSAP and Framer Motion.

This content is provided for learning purposes only. While we aim to keep it accurate and up to date, technologies evolve quickly. Please refer to the official GSAP documentation for the latest guidance.