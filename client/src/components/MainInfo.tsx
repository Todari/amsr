import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import STRING from "../constants/String";

const MainInfo = () => {
  const viewHeight = window.screen.height;

  const landingContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: landingContainerRef });
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [0.75, 1.2])
  const offsetTransform = useTransform(scrollYProgress, [0.75, 1], [0, - viewHeight])

  return (
    <div ref={landingContainerRef} className="h-[400vh] top-[300vh] flex flex-col items-center bg-slate-300">
      <motion.div className='fixed w-full h-screen max-h-[1440px] flex flex-col items-center justify-center border-2'
        style={{
          y: offsetTransform
        }}>
        <motion.div className='border-2'
          style={{
            scale: scaleTransform,
          }}>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MainInfo