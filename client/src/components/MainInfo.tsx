import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll, easeInOut } from "framer-motion";
import STRING from "../constants/String";

const MainInfo = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.screen.width,
    height: window.screen.height
  })

  useEffect(() => {
    window.addEventListener('resize', handleScreenSize)
    return () => {
      window.removeEventListener('resize', handleScreenSize)
    }
  }, [])

  const handleScreenSize = () => {
    setScreenSize({
      width: window.screen.width,
      height: window.screen.height
    })
  }

  const landingContainerRef = useRef(null);
  // const { scrollYProgress } = useScroll({ target: landingContainerRef });
  // const scaleTransform = useTransform(scrollYProgress, [0, 1], [0.75, 1.2])
  // const offsetTransform = useTransform(scrollYProgress, [0.75, 1], [0, - screenSize.height])

  return (
    <div className="snap-center flex w-full max-w-3xl h-[100dvh] items-center justify-center bg-main-landing bg-cover">
      <div ref={landingContainerRef}>
        <motion.div className='flex flex-col items-center'
          style={{
            // opacity: landingOpacity
          }}>
          <div className="p-12 rounded-3xl bg-white/50 backdrop-blur drop-shadow-md shadow-clay">
            <div className='p-4'>
              <motion.div className='text-center text-3xl font-bold text-black'
                animate={{ x: [-0.1 * screenSize.width, 0], opacity: [0, 1] }}
                transition={{ type: easeInOut, duration: 1.5 }}
              >
                {STRING.mainLandingTitlePrefix}
              </motion.div>
              <motion.div className='text-center text-3xl font-bold text-black'
                animate={{ x: [0.1 * screenSize.width, 0], opacity: [0, 1] }}
                transition={{ type: easeInOut, duration: 1.5, delay: 0.1 }}
              >
                {STRING.mainLandingTitleSuffix}
              </motion.div>
            </div>
            <div className='p-2'>
              <motion.div className='text-center text-l font-medium text-stone-500'
                animate={{ y: [0.1 * screenSize.width, 0], opacity: [0, 1] }}
                transition={{ type: easeInOut, duration: 1.5, delay: 0.2 }}
              >
                {STRING.mainLandingSubTitle}
              </motion.div>
            </div>
            <motion.div className='p-4 flex justify-center'
              animate={{ y: [0.1 * screenSize.width, 0], opacity: [0, 1] }}
              transition={{ type: easeInOut, duration: 1.5, delay: 1.5 }}>
              
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
    
  )
}

export default MainInfo