import { useAppSelector } from "@/hooks"
import { motion, useTransform, useScroll } from "framer-motion"
import { Suspense, useEffect, useRef } from "react";
import ThreeComponent from "./ThreeComponent";
import { ReactComponent as A1 } from "@/asset/a1.svg"
import { ReactComponent as A2 } from "@/asset/a2.svg"
import { ReactComponent as S1 } from "@/asset/s1.svg"
import { ReactComponent as S2 } from "@/asset/s2.svg"
import { ReactComponent as M1 } from "@/asset/m1.svg"
import { ReactComponent as M2 } from "@/asset/m2.svg"
import { ReactComponent as R1 } from "@/asset/r1.svg"
import { ReactComponent as R2 } from "@/asset/r2.svg"
import { MotionValue, useMotionValueEvent } from "framer-motion";

const MainLandingTitle = () => {
  const { width, height } = useAppSelector((state) => state.screenSize)
  const containerRef = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({ target: containerRef, offset:["start start", "end end"] });

  const useParallax = (value: MotionValue<number>, distance: number) => {
    return useTransform(value, [0, 1], [-distance, distance]);
  }
  const xTransform = useParallax(scrollYProgress, 100);

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("Page scroll: ", latest)
  // })
  // const doc = document.getElementById('dd')
  // useEffect(() => {
    // console.log(window.scrollY)
    // console.log(doc?.scrollTop)
  // }, [])

  return (
    <div ref={containerRef} className="relative snap-always snap-center w-full h-[100dvh] flex flex-col items-center justify-center">
      <div className="relative inset-0 w-full  max-w-5xl ">
        <motion.div className="inset-0 text-center font-ClimateCrisisKRVF text-fuchsia-400/50 text-4xl"
          animate={{ y: [-height, 0] }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 16, delay: 0.08 }}
        >
          아무사람대잔치
        </motion.div>
        <motion.div className="absolute inset-0 text-center z-10 font-ClimateCrisisKRVF text-purple-400/50 text-4xl"
          animate={{ y: [-height, 0] }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 17, delay: 0.06 }}
        >
          아무사람대잔치
        </motion.div>
        <motion.div className="absolute inset-0 text-center z-10 font-ClimateCrisisKRVF text-purple-600/50 text-4xl"
          animate={{ y: [-height, 0] }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 18, delay: 0.04 }}

        >
          아무사람대잔치
        </motion.div>
        <motion.div className="absolute inset-0 text-center z-20 font-ClimateCrisisKRVF text-violet-600/50 text-4xl"
          animate={{ y: [-height, 0] }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 19, delay: 0.02 }}
        >
          아무사람대잔치
        </motion.div>
        <motion.div className="absolute inset-0 text-center z-30 font-ClimateCrisisKRVF text-zinc-700 text-4xl"
          animate={{ y: [-height, 0] }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20, delay: 0 }}
        >
          아무사람대잔치
        </motion.div>
        {/* <ThreeComponent /> */}
      </div>
      <div className="inset-0 w-full z-40">
        <motion.div className="absolute top-[30dvh] left-[10vw] aspect-square w-16"
          animate={{ x: [-0.3 * width, 0] }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          // style={{x:scrollYProgress}}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", duration: 3, repeat: Infinity }}>
            <A1 />
          </motion.div>
        </motion.div>
        <motion.div className="absolute top-[25dvh] right-[20vw] aspect-square w-16"
          animate={{ x: [0.25 * width, 0] }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ ease: "linear", duration: 3, repeat: Infinity }}>
            <M1 />
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-[25dvh] left-[15vw] aspect-square w-16"
          animate={{ x: [-0.25 * width, 0] }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ ease: "linear", duration: 3, repeat: Infinity }}>
            <S1 />
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-[20dvh] right-[10vw] aspect-square w-16"
          animate={{ x: [0.2 * width, 0] }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", duration: 3, repeat: Infinity }}>
            <R1 />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default MainLandingTitle