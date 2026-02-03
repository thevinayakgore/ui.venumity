# Make React Animations Easy

Framer Motion is a production-ready motion library for React. It makes creating animations simple with a declarative API.

#### Key Features

- Declarative animations
- Gesture support (drag, tap, hover)
- Layout animations
- Scroll-triggered animations
- SVG animations

---

## Installation

```bash
npm install framer-motion
```

**Basic Setup:**

```jsx
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div animate={{ x: 100 }} transition={{ duration: 0.5 }}>
      Animated Element
    </motion.div>
  );
}
```

---

## Basic Animations

### 1. Simple Animation

```jsx
import { motion } from "framer-motion";

function Box() {
  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  );
}
```

### 2. Entry Animations

```jsx
function Card() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Card Title</h2>
      <p>Card content goes here</p>
    </motion.div>
  );
}
```

### 3. Hover Effects

```jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="px-4 py-2 bg-blue-500 text-white"
>
  Click Me
</motion.button>
```

---

## Advanced Animations

### 1. Staggered Children

```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function List() {
  return (
    <motion.ul variants={container} initial="hidden" animate="show">
      <motion.li variants={item}>Item 1</motion.li>
      <motion.li variants={item}>Item 2</motion.li>
      <motion.li variants={item}>Item 3</motion.li>
    </motion.ul>
  );
}
```

### 2. Drag and Drop

```jsx
<motion.div
  drag
  dragConstraints={{
    top: -50,
    left: -50,
    right: 50,
    bottom: 50,
  }}
  whileDrag={{ scale: 1.1 }}
  className="w-20 h-20 bg-blue-500 rounded-lg"
/>
```

### 3. Scroll Animations

```jsx
import { useInView } from "framer-motion";
import { useRef } from "react";

function ScrollComponent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <motion.div
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        Content that animates when scrolled into view
      </motion.div>
    </section>
  );
}
```

---

## Layout Animations

### 1. Animate Layout Changes

```jsx
function ToggleBox() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="p-4 bg-gray-100 rounded-lg"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.h2 layout="position">Click to Expand</motion.h2>
      {isExpanded && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Additional content that appears
        </motion.p>
      )}
    </motion.div>
  );
}
```

### 2. Shared Layout Animations

```jsx
function ImageGallery() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      {items.map((item) => (
        <motion.div
          key={item.id}
          layoutId={item.id}
          onClick={() => setSelectedId(item.id)}
        >
          <motion.h5>{item.title}</motion.h5>
          <motion.h2>{item.subtitle}</motion.h2>
        </motion.div>
      ))}

      {selectedId && (
        <motion.div layoutId={selectedId}>
          {/* Expanded view with same layoutId */}
        </motion.div>
      )}
    </>
  );
}
```

---

## SVG Animations

### 1. Path Drawing

```jsx
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
};

function SVGIcon() {
  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={1}
      />
    </motion.svg>
  );
}
```

### 2. Morphing SVG

```jsx
const pathVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 2 },
  },
};

function AnimatedLogo() {
  return (
    <svg viewBox="0 0 100 100">
      <motion.path
        d="M20,50 Q50,10 80,50"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        stroke="black"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
```

---

## Gesture Animations

### 1. Hover Gestures

```jsx
<motion.div
  whileHover="hover"
  variants={{
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  }}
>
  <motion.div
    variants={{
      hover: {
        rotate: 180,
        transition: { duration: 0.4 },
      },
    }}
  >
    🔄
  </motion.div>
</motion.div>
```

### 2. Tap Gestures

```jsx
<motion.button
  whileTap="tap"
  variants={{
    tap: {
      scale: 0.95,
      boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
    },
  }}
>
  Press Me
</motion.button>
```

---

## Page Transitions

### 1. Page Exit/Enter

```jsx
const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
```

### 2. Router Integration (Next.js)

```jsx
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  );
}
```

---

## Performance Optimization

### 1. Use will-change

```jsx
<motion.div style={{ willChange: "transform, opacity" }} animate={{ x: 100 }} />
```

### 2. Optimize Expensive Animations

```jsx
const optimizedVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Use transform properties instead of layout
      opacity: { duration: 0.3 },
      // Use hardware acceleration
      x: { type: "spring", stiffness: 300, damping: 30 },
    },
  },
};
```

### 3. Reduce Motion for Accessibility

```jsx
import { motion, useReducedMotion } from "framer-motion";

function AccessibleAnimation() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { x: 100 }}
      transition={{ duration: 1 }}
    >
      Content
    </motion.div>
  );
}
```

---

## Common Patterns

### 1. Loading Spinner

```jsx
function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
    />
  );
}
```

### 2. Notification Toast

```jsx
function Toast({ message, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 3. Accordion

```jsx
function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
      >
        {title}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## Best Practices

### Do:

- Use `initial` and `animate` for entry animations
- Implement exit animations with `AnimatePresence`
- Use hardware-accelerated properties (transform, opacity)
- Add `transition` properties for smooth animations
- Consider accessibility with `useReducedMotion`
- Test animations on mobile devices

### Avoid:

- Animating layout properties (margin, padding)
- Too many simultaneous animations
- Long duration animations that block interaction
- Animations that cause content shift
- Forgetting exit animations

---

## Resources

**Official Documentation:**

- [Framer Motion Docs](https://www.framer.com/motion/)
- [API Reference](https://www.framer.com/motion/component/)
- [Examples](https://www.framer.com/motion/examples/)

**Community Resources:**

- [Framer Motion Examples](https://github.com/framer/motion/tree/main/examples)
- [Animation Recipes](https://www.framer.com/motion/recipes/)
- [Showcase](https://www.framer.com/showcase/)
