import { motion } from "motion/react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center z-50">
      {/* Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative w-28 h-28"
      >
        <div className="absolute inset-0 rounded-full border-[5px] border-zinc-800"></div>

        <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-blue-500 border-r-cyan-400"></div>

        {/* Glow */}
        <div className="absolute inset-4 rounded-full bg-blue-500/20 blur-2xl"></div>

        {/* Center */}
        <div className="absolute inset-5 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
            }}
            className="w-5 h-5 rounded-full bg-blue-500 shadow-[0_0_30px_#3b82f6]"
          />
        </div>
      </motion.div>

      {/* Text */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        className="mt-10 text-2xl font-semibold text-white"
      >
        Building your website...
      </motion.h2>

      <p className="text-zinc-400 mt-2 text-sm">
        AI is generating a premium responsive website.
      </p>

      {/* Dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-3 h-3 rounded-full bg-blue-500"
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;