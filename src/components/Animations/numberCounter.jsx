// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// export default function NumberCounter() {
//   const [count, setCount] = useState(1);
//   const [direction, setDirection] = useState(1);

//   const handleIncrement = () => {
//     setDirection(1);
//     setCount((prev) => prev + 1);
//   };

//   const handleDecrement = () => {
//     if (count > 1) {
//       setDirection(-1);
//       setCount((prev) => prev - 1);
//     }
//   };

//   const variants = {
//     enter: (direction) => ({
//       y: direction > 0 ? 20 : -20,
//       opacity: 0,
//       position: "absolute",
//     }),
//     center: {
//       y: 0,
//       opacity: 1,
//       position: "absolute",
//     },
//     exit: (direction) => ({
//       y: direction > 0 ? -20 : 20,
//       opacity: 0,
//       position: "absolute",
//     }),
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <motion.div
//         className="flex items-center gap-1 bg-[#000] px-[8px] py-[5px] rounded-full relative"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <motion.button
//           whileTap={{ scale: 0.8 }}
//           onClick={handleDecrement}
//           className="w-6 h-6 rounded-full bg-[#fff] text-black text-xl flex items-center justify-center"
//         >
//           -
//         </motion.button>

//         <div className="w-7 h-7 overflow-hidden relative">
//           <AnimatePresence custom={direction} mode="popLayout">
//             <motion.span
//               key={count}
//               className="text-white text-[18px] font-semibold w-full text-center block"
//               custom={direction}
//               variants={variants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{ duration: 0.2 }}
//             >
//               {count}
//             </motion.span>
//           </AnimatePresence>
//         </div>

//         <motion.button
//           whileTap={{ scale: 0.8 }}
//           onClick={handleIncrement}
//           className="w-6 h-6 rounded-full bg-[#fff] text-black text-xl flex items-center justify-center"
//         >
//           +
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }

// import { useState, useEffect, useContext } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { AppContext } from "@/context/AppContext";

// export default function NumberCounter({
//   count = 1,
//   addClick,
//   removeClick,
//   loading = false,
// }) {
//   const [direction, setDirection] = useState(1);
//   const [prevCount, setPrevCount] = useState(count);
//   const { homePageDetails } = useContext(AppContext);

//   useEffect(() => {
//     if (count > prevCount) {
//       setDirection(1);
//     } else if (count < prevCount) {
//       setDirection(-1);
//     }
//     setPrevCount(count);
//   }, [count, prevCount]);

//   const variants = {
//     enter: (direction) => ({
//       y: direction > 0 ? 20 : -20,
//       opacity: 0,
//       position: "absolute",
//     }),
//     center: {
//       y: 0,
//       opacity: 1,
//       position: "absolute",
//     },
//     exit: (direction) => ({
//       y: direction > 0 ? -20 : 20,
//       opacity: 0,
//       position: "absolute",
//     }),
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <motion.div
//         className="flex items-center px-[5px] py-[1px] rounded-full relative"
//         style={{ backgroundColor: homePageDetails?.vendor_data?.vendor_color }}
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <motion.button
//           whileTap={{ scale: 0.8 }}
//           onClick={() => {
//             setDirection(-1);
//             removeClick();
//           }}
//           className="w-5 h-5 rounded-full bg-[#fff] text-black text-[16px] flex items-center justify-center"
//         >
//           -
//         </motion.button>

//         <div className="w-7 h-7 overflow-hidden relative flex items-center justify-center">
//           {loading ? (
//             <span className="text-white text-[14px]">...</span>
//           ) : (
//             <AnimatePresence custom={direction} mode="popLayout">
//               <motion.span
//                 key={count}
//                 className="text-white text-[14px] font-semibold w-full text-center block"
//                 custom={direction}
//                 variants={variants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.2 }}
//               >
//                 {count}
//               </motion.span>
//             </AnimatePresence>
//           )}
//         </div>

//         <motion.button
//           whileTap={{ scale: 0.8 }}
//           onClick={() => {
//             setDirection(1);
//             addClick();
//           }}
//           className="w-5 h-5 rounded-full bg-[#fff] text-black text-[16px] flex items-center justify-center"
//         >
//           +
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }

import { useState, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppContext } from "@/context/AppContext";
import Spinner from "../common/Spinner/spinner";

export default function NumberCounter({
  count = 1,
  addClick,
  removeClick,
  loading = false,
}) {
  const [direction, setDirection] = useState(1);
  const [prevCount, setPrevCount] = useState(count);
  const { homePageDetails } = useContext(AppContext);

  useEffect(() => {
    if (count > prevCount) {
      setDirection(1);
    } else if (count < prevCount) {
      setDirection(-1);
    }
    setPrevCount(count);
  }, [count]);

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
    <div className="flex items-center justify-center">
      <motion.div
        className="flex items-center px-[5px] py-[1px] rounded-full relative"
        style={{ backgroundColor: homePageDetails?.vendor_data?.vendor_color }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Remove Button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={removeClick}
          className="w-5 h-5 rounded-full bg-[#fff] text-black text-[16px] flex items-center justify-center"
        >
          -
        </motion.button>

        {/* Count Display */}
        <div className="w-7 h-7 overflow-hidden relative flex items-center justify-center">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner
                height="13px"
                size="2px"
                color={"#fff"}
              />
            </div>
          ) : (
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.span
                key={count}
                className="text-white text-[14px] font-semibold w-full text-center block"
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
          )}
        </div>

        {/* Add Button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={addClick}
          className="w-5 h-5 rounded-full bg-[#fff] text-black text-[16px] flex items-center justify-center"
        >
          +
        </motion.button>
      </motion.div>
    </div>
  );
}
