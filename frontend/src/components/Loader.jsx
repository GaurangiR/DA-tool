import { motion } from "framer-motion";

const createRingVariant = (dashArray, dashOffset, width) => ({
  animate: {
    strokeDasharray: dashArray,
    strokeDashoffset: dashOffset,
    strokeWidth: width,
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "linear",
      times: [0, 0.12, 0.32, 0.54, 0.62, 0.82, 1],
    },
  },
});

const ringA = createRingVariant(
  ["0 660", "60 600", "60 600", "0 660", "60 600", "60 600", "0 660"],
  [-330, -335, -595, -660, -665, -925, -990],
  [20, 30, 30, 20, 30, 30, 20]
);

const ringB = createRingVariant(
  ["0 220", "20 200", "20 200", "0 220", "20 200", "20 200", "0 220"],
  [-110, -115, -195, -220, -225, -305, -330],
  [20, 30, 30, 20, 30, 30, 20]
);

const ringC = createRingVariant(
  ["0 440", "40 400", "40 400", "0 440", "40 400", "40 400", "0 440"],
  [0, -5, -175, -220, -225, -395, -440],
  [20, 30, 30, 20, 30, 30, 20]
);

const ringD = createRingVariant(
  ["0 440", "40 400", "40 400", "0 440", "40 400", "40 400", "0 440"],
  [0, -5, -175, -220, -225, -395, -440],
  [20, 30, 30, 20, 30, 30, 20]
);

const wrapperVariants = {
  initial: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4 } },
};

const Loader = () => {
  return (
    <motion.div
      className="w-24 h-24 flex items-center justify-center"
      variants={wrapperVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <svg viewBox="0 0 240 240" className="w-full h-full">
        <motion.circle
          cx="120"
          cy="120"
          r="105"
          fill="none"
          stroke="#00ACC1" // primary cyan
          strokeLinecap="round"
          variants={ringA}
          animate="animate"
        />
        <motion.circle
          cx="120"
          cy="120"
          r="35"
          fill="none"
          stroke="#4DD0E1" // bright aqua
          strokeLinecap="round"
          variants={ringB}
          animate="animate"
          transition={{ delay: 0.2, ...ringB.animate.transition }}
        />
        <motion.circle
          cx="85"
          cy="120"
          r="70"
          fill="none"
          stroke="#2E3C43" // dark text color
          strokeLinecap="round"
          variants={ringC}
          animate="animate"
          transition={{ delay: 0.4, ...ringC.animate.transition }}
        />
        <motion.circle
          cx="155"
          cy="120"
          r="70"
          fill="none"
          stroke="#B2EBF2" // soft background shade
          strokeLinecap="round"
          variants={ringD}
          animate="animate"
          transition={{ delay: 0.6, ...ringD.animate.transition }}
        />
      </svg>
    </motion.div>
  );
};

export default Loader;
