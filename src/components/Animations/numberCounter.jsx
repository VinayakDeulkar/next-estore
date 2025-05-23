import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NumberCounter() {
  const [count, setCount] = useState(1);
  const [direction, setDirection] = useState(1);

  const handleIncrement = () => {
    setDirection(1);
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setDirection(-1);
      setCount((prev) => prev - 1);
    }
  };

  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? 20 : -20,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      y: 0,
      opacity: 1,
      position: "absolute",
    },
    exit: (direction) => ({
      y: direction > 0 ? -20 : 20,
      opacity: 0,
      position: "absolute",
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        className="flex items-center gap-6 bg-[#0E1414] p-4 rounded-full relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleDecrement}
          className="w-12 h-12 rounded-full bg-[#184B50] text-white text-2xl flex items-center justify-center"
        >
          -
        </motion.button>

        <div className="w-6 h-10 overflow-hidden relative">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.span
              key={count}
              className="text-white text-3xl font-semibold w-full text-center block"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleIncrement}
          className="w-12 h-12 rounded-full bg-[#184B50] text-white text-2xl flex items-center justify-center"
        >
          +
        </motion.button>
      </motion.div>
    </div>
  );
}
