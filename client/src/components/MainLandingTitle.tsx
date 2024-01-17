import { useAppSelector } from "@/hooks"
import { motion, easeInOut, useMotionValue, useSpring, useVelocity, spring } from "framer-motion"
import { Suspense, useEffect } from "react";

const MainLandingTitle = () => {
  const { width, height } = useAppSelector((state) => state.screenSize)

  return (
    <Suspense>
      <div className="snap-always snap-center w-full max-w-5xl h-[100dvh] flex flex-col items-center justify-center">
        <div className="relative w-full">
          <motion.div className="inset-0 text-center font-ClimateCrisisKRVF text-fuchsia-400/50 text-4xl"
            animate={{ y: [-height, 0] }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 16, }}
          >
            아무사람대잔치
          </motion.div>
          <motion.div className="absolute inset-0 text-center z-10 font-ClimateCrisisKRVF text-purple-400/50 text-4xl"
            animate={{ y: [-height, 0] }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 17, }}
          >
            아무사람대잔치
          </motion.div>
          <motion.div className="absolute inset-0 text-center z-10 font-ClimateCrisisKRVF text-purple-600/50 text-4xl"
            animate={{ y: [-height, 0] }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 18, }}
          >
            아무사람대잔치
          </motion.div>
          <motion.div className="absolute inset-0 text-center z-20 font-ClimateCrisisKRVF text-violet-600/50 text-4xl"
            animate={{ y: [-height, 0] }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 19, }}
          // style={{opacity}}
          >
            아무사람대잔치
          </motion.div>
          <motion.div className="absolute inset-0 text-center z-30 font-ClimateCrisisKRVF text-zinc-700 text-4xl"
            animate={{ y: [-height, 0] }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20, }}
          >
            아무사람대잔치
          </motion.div>
        </div>
        
      </div>
    </Suspense>
  )
}

export default MainLandingTitle