export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: customDelay,
    },
  }),
};
