export const GRADIENTS_12 = [
  "linear-gradient(to top right, #ea580c, #fed7aa)",
  "linear-gradient(to top right, #dc2626, #fecaca)",
  "linear-gradient(to top right, #db2777, #fbcfe8)",
  "linear-gradient(to top right, #9333ea, #e9d5ff)",
  "linear-gradient(to top right, #4f46e5, #c7d2fe)",
  "linear-gradient(to top right, #2563eb, #bfdbfe)",
  "linear-gradient(to top right, #0891b2, #a5f3fc)",
  "linear-gradient(to top right, #0d9488, #99f6e4)",
  "linear-gradient(to top right, #16a34a, #bbf7d0)",
  "linear-gradient(to top right, #65a30d, #d9f99d)",
  "linear-gradient(to top right, #ca8a04, #fef08a)",
  "linear-gradient(to top right, #d97706, #fde68a)",
];

export const GRADIENT_ANIMATION = {
  animate: { backgroundImage: GRADIENTS_12 },
  transition: {
    duration: 10,
    repeat: Infinity,
    ease: (t: number) => t,
  },
};