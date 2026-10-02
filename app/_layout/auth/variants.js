/** @type {import('framer-motion').Variants} */
export const slideUp = {
  initial: {
    y: 120,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 2.4 },
  },
};

/** @type {import('framer-motion').Variants} */
export const stagger = {
  initial: {},
  enter: {
    transition: { staggerChildren: 0.08, delayChildren: 2.6 },
  },
};

/** @type {import('framer-motion').Variants} */
export const stepItem = {
  initial: {
    y: 40,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    y: -24,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
};
