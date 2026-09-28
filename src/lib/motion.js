export const easeOut = [0.22, 1, 0.36, 1];

export const pageEntrance = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: easeOut },
};

export const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: easeOut },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: easeOut },
};

export const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.38, ease: easeOut },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.28, ease: easeOut },
  },
};

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const mobileNavVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: easeOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.22, ease: easeOut },
  },
};

export const heroImageExit = {
  scale: 1.03,
  x: -20,
  opacity: 0,
  transition: { duration: 0.45, ease: easeOut },
};

export const heroImageEnter = {
  initial: { scale: 0.98, x: 20, opacity: 0 },
  animate: {
    scale: 1,
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const heroTextEnter = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: easeOut },
  },
};
