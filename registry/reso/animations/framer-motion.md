## Lesson 1: What Is Framer Motion ?

Framer Motion is a React animation library that allows developers to animate HTML and SVG elements using declarative props. Instead of writing complex CSS keyframes or manually using `requestAnimationFrame`, developers describe animation states, and Motion handles interpolation, timing, physics, and DOM updates.

### Basic idea

```jsx
import { motion } from "framer-motion";

export default function FadeIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello, Framer Motion
    </motion.div>
  );
}
```

This component starts invisible and slightly below its final position, then animates to full opacity and its normal position.

### Why developers use it

- Simple declarative API.
- Smooth spring and physics-based animations.
- Built-in gesture support.
- Layout animations without manual calculations.
- Enter and exit animations for conditional UI.
- Scroll-based animations.
- Strong React integration.
- Suitable for modern React and Next.js applications.

Motion is designed for React, JavaScript, and Vue, and supports layout, scroll, gestures, 3D, and hardware-accelerated animations. [103]

---

## Lesson 2: Installation and Setup

Install Framer Motion in a React or Next.js project:

```bash
npm install framer-motion
```

Or using pnpm:

```bash
pnpm add framer-motion
```

Then import the `motion` component:

```jsx
import { motion } from "framer-motion";
```

### Basic animation

```jsx
"use client";

import { motion } from "framer-motion";

export default function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="size-40 rounded-xl bg-blue-500"
    />
  );
}
```

In Next.js App Router, animation components that use browser interactivity or client-side animation state should usually be Client Components.

---

## Lesson 3: Core Animation Props

Framer Motion uses a small set of core props to define animations.

| Prop | Purpose |
|---|---|
| `initial` | Starting state before animation |
| `animate` | Target state after mount or state change |
| `exit` | State before component unmounts |
| `transition` | Timing, easing, spring, delay, and repetition |
| `variants` | Named reusable animation states |
| `whileHover` | Animation during hover |
| `whileTap` | Animation while pressed |
| `whileFocus` | Animation while focused |
| `whileDrag` | Animation while dragging |
| `whileInView` | Animation when element enters viewport |

### Animating multiple properties

```jsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Animated content
</motion.div>
```

### Animating on state change

```jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ToggleBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>

      <motion.div
        animate={{
          width: isOpen ? 300 : 120,
          backgroundColor: isOpen ? "#22c55e" : "#3b82f6",
        }}
        transition={{ duration: 0.4 }}
        className="h-20 rounded-xl"
      />
    </>
  );
}
```

When `isOpen` changes, Motion animates from the current value to the new target value.

---

## Lesson 4: Transition Types

The `transition` prop controls how an animation behaves.

### Duration and easing

```jsx
<motion.div
  animate={{ x: 100 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
/>
```

### Delay

```jsx
<motion.div
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.5 }}
/>
```

### Repeat

```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    repeat: Infinity,
    repeatType: "loop",
    duration: 2,
    ease: "linear",
  }}
/>
```

### Spring animation

Springs are useful for natural, physical movement.

```jsx
<motion.div
  animate={{ scale: 1.1 }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 20,
  }}
/>
```

| Property | Meaning |
|---|---|
| `stiffness` | How quickly the spring reacts |
| `damping` | How much oscillation is reduced |
| `mass` | Simulated weight of the object |
| `velocity` | Initial velocity |

### Per-property transitions

```jsx
<motion.div
  animate={{
    x: 100,
    opacity: 1,
  }}
  transition={{
    x: {
      type: "spring",
      stiffness: 200,
    },
    opacity: {
      duration: 0.3,
    },
  }}
/>
```

---

## Lesson 5: Variants

Variants are named animation states. They make complex animations reusable and easier to coordinate across parent and child components.

Variants define named states that can be passed to `motion` components through the `variants` prop. [102]

### Basic variant

```jsx
"use client";

import { motion } from "framer-motion";

const boxVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function VariantBox() {
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      className="size-40 rounded-xl bg-purple-500"
    />
  );
}
```

### Parent and child variants

When a parent changes its animation state, child components with matching variant names can animate automatically.

```jsx
"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function StaggeredList() {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {["React", "Next.js", "Framer Motion"].map((text) => (
        <motion.li key={text} variants={item}>
          {text}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### Why variants matter

- Avoid repeating animation objects.
- Coordinate parent and child animations.
- Support staggered list animations.
- Make animation logic reusable.
- Improve readability for complex UI sequences.

---

## Lesson 6: Gesture Animations

Framer Motion provides built-in gesture props for common user interactions. Supported gestures include hover, tap, focus, drag, and in-view interactions. [102][108]

### Hover animation

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="rounded-lg bg-blue-600 px-5 py-2 text-white"
>
  Hover Me
</motion.button>
```

### Tap animation

```jsx
<motion.div
  whileTap={{ scale: 0.9 }}
  className="size-24 rounded-full bg-red-500"
/>
```

### Focus animation

```jsx
<motion.input
  whileFocus={{
    scale: 1.02,
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.4)",
  }}
  className="rounded-lg border px-4 py-2"
/>
```

### Drag animation

```jsx
<motion.div
  drag
  dragConstraints={{
    left: -100,
    right: 100,
    top: -50,
    bottom: 50,
  }}
  whileDrag={{ scale: 1.1 }}
  className="size-24 rounded-xl bg-green-500"
/>
```

### Drag with momentum

```jsx
<motion.div
  drag
  dragElastic={0.2}
  dragMomentum={true}
  className="size-24 rounded-xl bg-orange-500"
/>
```

---

## Lesson 7: Enter and Exit Animations

When a component is conditionally rendered, it normally disappears instantly. Framer Motion’s `AnimatePresence` allows components to animate before they are removed from the DOM.

```jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl bg-white p-6 shadow-xl"
          >
            <h2>Modal Title</h2>
            <button onClick={() => setIsOpen(false)}>
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### Important rule

The `exit` animation works only when the component is rendered inside `AnimatePresence`.

---

## Lesson 8: Layout Animations

Layout animations animate changes in an element’s position or size. This is useful for sorting lists, expanding cards, moving elements between containers, and responsive UI changes.

Framer Motion uses a FLIP-based approach: it measures the element before and after the DOM update, applies a transform to preserve the old visual position, then animates it to the new position. [112]

### Basic layout animation

```jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LayoutAnimation() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer rounded-xl bg-indigo-500 p-4 text-white"
      style={{
        width: isExpanded ? 400 : 200,
      }}
    >
      Click to {isExpanded ? "collapse" : "expand"}
    </motion.div>
  );
}
```

### Animating list order

```jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SortableList() {
  const [items, setItems] = useState(["A", "B", "C"]);

  function shuffle() {
    setItems([...items].sort(() => Math.random() - 0.5));
  }

  return (
    <>
      <button onClick={shuffle}>Shuffle</button>

      <ul>
        {items.map((item) => (
          <motion.li
            key={item}
            layout
            className="rounded-lg bg-gray-100 p-4"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </>
  );
}
```

### Shared layout animation

Use `layoutId` when the same visual element moves between different components or states.

```jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SharedLayout() {
  const [selected, setSelected] = useState("home");

  return (
    <div className="flex gap-2">
      {["home", "profile", "settings"].map((tab) => (
        <button
          key={tab}
          onClick={() => setSelected(tab)}
          className="relative px-4 py-2"
        >
          {selected === tab && (
            <motion.span
              layoutId="active-tab"
              className="absolute inset-0 rounded-lg bg-blue-500"
            />
          )}
          <span className="relative">{tab}</span>
        </button>
      ))}
    </div>
  );
}
```

When two components share the same `layoutId`, Motion automatically animates between their positions and sizes. [106]

---

## Lesson 9: Scroll-Based Animations

Framer Motion can animate elements when they enter the viewport or based on scroll progress.

### Animate when in view

```jsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  This animates when scrolled into view.
</motion.div>
```

| Option | Meaning |
|---|---|
| `once: true` | Animation runs only once |
| `amount: 0.3` | Animation starts when 30% of element is visible |
| `margin` | Adjusts the viewport detection area |

### Scroll progress animation

```jsx
"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "left",
      }}
      className="fixed top-0 left-0 h-1 w-full bg-blue-600"
    />
  );
}
```

### Parallax effect

```jsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY,, [0, -100]);[0][500]

  return (
    <motion.div style={{ y }} className="h-64 bg-linear-to-tl from-blue-500 to-purple-500">
      Parallax content
    </motion.div>
  );
}
```

---

## Lesson 10: Animating React Router and Next.js Pages

In React Router or Next.js, page transitions can be handled using `AnimatePresence` and route keys.

### Basic page transition pattern

```jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition({ routeKey, children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Important consideration in Next.js App Router

Page transitions in the App Router require careful handling because Server Components and route segments have their own rendering behavior. For most applications, animate smaller UI sections, modals, lists, and shared layout elements rather than forcing complex full-page transitions.

---

## Lesson 11: Animating SVG

Framer Motion can animate SVG attributes and path drawing.

```jsx
"use client";

import { motion } from "framer-motion";

export default function AnimatedSvg() {
  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 100 100"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke="#3b82f6"
        strokeWidth="5"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2 }}
      />
    </motion.svg>
  );
}
```

### Common SVG animations

| Property | Use |
|---|---|
| `pathLength` | Draw or erase SVG paths |
| `fill` | Animate fill color |
| `stroke` | Animate stroke color |
| `scale` | Scale SVG elements |
| `rotate` | Rotate SVG elements |
| `opacity` | Fade SVG elements |

---

## Lesson 12: Custom Hooks in Framer Motion

Framer Motion provides hooks for advanced animation control.

| Hook | Purpose |
|---|---|
| `useAnimation` | Manually start, stop, and sequence animations |
| `useScroll` | Track scroll position or progress |
| `useTransform` | Transform one motion value into another |
| `useSpring` | Add spring physics to a motion value |
| `useMotionValue` | Create a standalone animatable value |
| `useInView` | Detect when an element enters the viewport |
| `useAnimate` | Create imperative animations |

### useAnimation example

```jsx
"use client";

import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ControlledAnimation() {
  const controls = useAnimation();

  async function startAnimation() {
    await controls.start({
      x: 100,
      transition: { duration: 0.5 },
    });

    await controls.start({
      x: 0,
      transition: { duration: 0.5 },
    });
  }

  return (
    <>
      <motion.div
        animate={controls}
        className="size-24 rounded-xl bg-pink-500"
      />
      <button onClick={startAnimation}>Animate</button>
    </>
  );
}
```

### useMotionValue example

```jsx
"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

export default function MotionValueExample() {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ef4444", "#3b82f6", "#22c55e"]
  );

  return (
    <motion.div
      drag="x"
      style={{ x, background }}
      className="size-24 rounded-xl"
    />
  );
}
```

---

## Lesson 13: Performance Optimization

Animation performance depends heavily on which CSS properties are animated. Motion recommends animating transform and opacity-related properties for smooth high-frame-rate experiences. [105]

### Prefer performant properties

| Preferred | Avoid where possible |
|---|---|
| `x`, `y`, `scale`, `rotate` | `top`, `left`, `right`, `bottom` |
| `opacity` | `width`, `height` |
| `transform` | `margin`, `padding` |
| `filter` | Complex layout changes |

### Good example

```jsx
<motion.div
  animate={{ opacity: 1, y: 0, scale: 1 }}
/>
```

### Less performant example

```jsx
<motion.div
  animate={{
    width: 400,
    height: 300,
    marginTop: 40,
  }}
/>
```

### Optimization tips

- Animate `transform` and `opacity` whenever possible.
- Avoid animating layout properties on large lists.
- Use `layout` only where necessary.
- Use `will-change` carefully and sparingly.
- Avoid animating too many elements at the same time.
- Use `once: true` for in-view animations.
- Respect user accessibility preferences.
- Use production builds for accurate performance measurement.

Motion can use hardware acceleration and transforms to keep animations smooth, but layout-heavy animations can still be expensive. [103][105]

---

## Lesson 14: Accessibility and Reduced Motion

Animations should improve user experience, not create discomfort. Some users prefer reduced motion due to motion sensitivity or accessibility needs.

### Respect reduced motion

```jsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AccessibleAnimation() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      Accessible animated content
    </motion.div>
  );
}
```

### Accessibility best practices

- Avoid large or repeated movement.
- Do not rely only on animation to communicate state.
- Keep animations short and purposeful.
- Respect the user’s reduced-motion preference.
- Ensure animated controls remain keyboard accessible.
- Avoid flashing or high-contrast rapid motion.

---

## Lesson 15: Framer Motion vs CSS Animation

| Feature | CSS Animation | Framer Motion |
|---|---|---|
| Best for | Simple loops and hover effects | State-driven and interactive UI animations |
| React integration | Manual | Native |
| Gesture support | Limited | Built-in |
| Exit animations | Difficult | Built-in with `AnimatePresence` |
| Layout animations | Manual | Built-in with `layout` |
| Spring physics | Limited | Built-in |
| Scroll animations | Limited | Built-in hooks |
| Bundle size | No extra library | Adds JavaScript bundle size |
| Complexity | Simple animations | Complex sequences and interactions |

Use CSS animations for simple, static effects such as hover states, loading spinners, and basic transitions. Use Framer Motion when animations depend on React state, gestures, layout changes, conditional rendering, or sequencing.

---

## Lesson 16: Advantages of Framer Motion

- Declarative and easy-to-read API.
- Strong React integration.
- Smooth spring and physics-based animations.
- Built-in gesture handling.
- Layout animations without manual DOM measurement.
- Exit animations through `AnimatePresence`.
- Scroll-linked animations.
- SVG animation support.
- Useful for modern React and Next.js interfaces.
- Good developer experience for component-level animation.

---

## Lesson 17: Disadvantages and Limitations

| Limitation | Explanation |
|---|---|
| Extra bundle size | Adds JavaScript to the client bundle |
| Overuse risk | Too many animations can harm usability and performance |
| Learning curve | Variants, layout animations, and motion values require practice |
| Not ideal for every animation | Simple CSS effects may not need a library |
| Server Component limitations | Animation logic is client-side and usually requires Client Components |
| Layout animation cost | Animating layout can be expensive for large or complex DOM trees |
| Debugging complexity | Complex sequences can become difficult to maintain |

Framer Motion is more feature-rich but larger than lighter animation libraries; it is designed to provide a complete declarative animation system for React. [104]

---

## Lesson 18: Most Important Interview Questions

### 1. What is Framer Motion?

Framer Motion, now known as Motion, is a React animation library used to create declarative animations, gestures, layout transitions, scroll effects, and enter/exit animations.

### 2. What is the difference between CSS animations and Framer Motion?

CSS animations are best for simple, static effects. Framer Motion is better for animations controlled by React state, user gestures, conditional rendering, layout changes, and complex sequences.

### 3. What is the `motion` component?

`motion` is a wrapper around HTML and SVG elements that adds animation capabilities.

```jsx
<motion.div animate={{ opacity: 1 }} />
```

### 4. What is the difference between `initial` and `animate`?

`initial` defines the starting state, while `animate` defines the target state. Motion animates from `initial` to `animate`.

### 5. What is the `transition` prop?

The `transition` prop controls animation timing, duration, delay, easing, spring physics, and repetition.

### 6. What are variants?

Variants are named animation states that can be reused and coordinated across parent and child components. [102]

### 7. How do parent and child variants work?

When a parent changes to a variant name, child components with matching variant names animate automatically without needing their own `animate` prop.

### 8. What is `AnimatePresence`?

`AnimatePresence` enables exit animations for components that are removed from the React tree.

### 9. Why is `exit` not working?

The `exit` prop works only when the conditional component is wrapped inside `AnimatePresence`.

### 10. What is `whileHover`?

`whileHover` defines the animation state applied while the user hovers over an element.

### 11. What is `whileTap`?

`whileTap` defines the animation state applied while the user presses an element.

### 12. What is `whileInView`?

`whileInView` animates an element when it enters the browser viewport.

### 13. What is a layout animation?

A layout animation animates an element’s position or size when the layout changes. It is enabled using the `layout` prop.

### 14. What is `layoutId`?

`layoutId` enables shared layout animations between components. Elements with the same `layoutId` animate smoothly from one position or size to another. [106]

### 15. What is FLIP?

FLIP stands for **First, Last, Invert, Play**. It is a technique used to animate layout changes by measuring positions before and after a DOM update, applying an inverse transform, and animating back to the final position. [112]

### 16. What is `useScroll`?

`useScroll` tracks page or element scroll position and exposes scroll progress as a motion value.

### 17. What is `useTransform`?

`useTransform` converts one motion value into another. For example, it can convert scroll progress into opacity, scale, or translation.

### 18. What is `useMotionValue`?

`useMotionValue` creates an independent animatable value that can be used for advanced animations without triggering React re-renders.

### 19. What is `useAnimation`?

`useAnimation` provides manual control over animations, allowing developers to start, stop, delay, or sequence animations programmatically.

### 20. Which properties should you animate for performance?

Prefer `opacity`, `x`, `y`, `scale`, and `rotate`. Avoid animating layout-heavy properties such as `width`, `height`, `top`, `left`, `margin`, and `padding` when possible. [105]

---

## Lesson 19: Senior-Level Interview Questions

### 1. How does Framer Motion handle layout animations?

It uses a FLIP-based technique. It measures the element’s position and size before and after a DOM update, applies a transform to preserve the old visual position, and animates that transform back to zero. [112]

### 2. Why can animating `width` and `height` be slow?

These properties can trigger browser layout and paint operations. Transform-based properties such as `scale`, `x`, `y`, and `rotate` are generally more performant because they can be handled by the compositor. [105]

### 3. What is the difference between `animate` and `useAnimation`?

`animate` is declarative and tied to props or state. `useAnimation` is imperative and useful when animations must be started, stopped, delayed, or sequenced manually.

### 4. How does `AnimatePresence` work internally?

It keeps exiting components mounted temporarily, applies the `exit` animation, and removes them from the DOM after the animation completes.

### 5. How would you animate a list efficiently?

Use stable keys, animate transform-based properties, use variants with `staggerChildren`, avoid animating container layout repeatedly, and use `layout` only when list order or size changes.

### 6. How would you implement a modal animation?

Use `AnimatePresence`, conditionally render the modal, define `initial`, `animate`, and `exit` states, and animate only `opacity`, `scale`, and `y` for performance.

### 7. How would you create a page transition in Next.js?

Wrap route content in `AnimatePresence`, provide a stable route key, and animate the wrapper component. Keep transitions simple because App Router rendering and Server Components add complexity.

### 8. How do you prevent animations from hurting accessibility?

Use `useReducedMotion`, avoid excessive movement, keep durations short, preserve keyboard accessibility, and ensure animation is not the only way users understand UI state.

### 9. When would you choose GSAP over Framer Motion?

Choose GSAP for complex timeline-based animations, advanced sequencing, non-React-heavy projects, or highly customized scroll and canvas interactions. Choose Framer Motion for React component state, gestures, layout transitions, and enter/exit animations.

### 10. How would you debug a broken Framer Motion animation?

Check whether the component is a Client Component, verify `initial` and `animate` values, ensure stable keys, confirm `AnimatePresence` usage for exit animations, inspect conflicting CSS transforms, and check whether layout animations are being triggered unnecessarily.

---

## Lesson 20: Best Practices

- Use animations to improve clarity, not decoration.
- Keep animations short and purposeful.
- Prefer `opacity` and transform properties.
- Use variants for reusable animation logic.
- Use `AnimatePresence` for conditional UI.
- Use `layout` only when layout actually changes.
- Respect reduced-motion preferences.
- Avoid animating large lists or complex layouts.
- Use stable keys for animated list items.
- Keep animation components modular and reusable.
- Test animations on low-end devices.
- Use production builds for performance measurement.

---

## Summary

Framer Motion is a powerful animation library for React applications. It simplifies animations through declarative props, variants, gestures, layout animations, scroll effects, and exit transitions.

For beginners, start with `motion.div`, `initial`, `animate`, `transition`, and `AnimatePresence`. For interviews, focus on variants, gestures, layout animations, `layoutId`, FLIP, `AnimatePresence`, `useScroll`, `useTransform`, and animation performance.

This content is provided for learning purposes only. While we aim to keep it accurate and up to date, technologies evolve quickly. Please refer to the official Motion documentation for the latest guidance.