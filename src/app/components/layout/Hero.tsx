"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const fadeIn = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: "easeOut" },
});

const Hero = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    const animation = animate(count, 14000, { duration: 3 });
    return animation.stop;
  }, [count]);

  return (
    <Box
      as="section"
      minH={"100vh"}
      className="relative overflow-hidden py-20 sm:py-28 text-center items-center flex justify-center"
      bg="white"
    >
      <Box
        as="div"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <Box as="div" className="w-[1000px] h-[1000px] rounded-full" />
      </Box>

      <Box
        as="div"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h1 {...fadeIn(0.2)} className="text-4xl sm:text-6xl text-black">
          Stay fit, healthy <br className="sm:hidden" />
          <span className="text-[#AAFF03] dark:text-[#AAFF03] font-bold">
            with HandFit
          </span>
        </motion.h1>

        <motion.p
          {...fadeIn(0.4)}
          className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-gray-500"
        >
          **Personalized Workouts & Smart Progress Tracking**: Get tailored
          fitness plans and detailed progress insights—automatically. Our AI
          analyzes your activity, tracks improvements, and delivers motivating
          feedback to help you stay on top of your goals.
        </motion.p>

        <motion.div {...fadeIn(0.6)} className="mt-10">
          <Link
            href="/auth"
            className="inline-flex rounded-[30px] items-center px-8 py-4 text-base font-medium text-black bg-[#AAFF03] hover:bg-[#8cdb00] transition-all group shadow-lg shadow-[#AAFF03]/20"
            aria-label="Start your fitness journey"
          >
            Try it free*
          </Link>
        </motion.div>

        <motion.div {...fadeIn(0.8)} className="mt-8 text-gray-500">
          Join{" "}
          <motion.span className="font-bold text-[#AAFF03] dark:text-[#AAFF03]">
            {rounded}
          </motion.span>
          + power users.
        </motion.div>
      </Box>
    </Box>
  );
};

export default Hero;
