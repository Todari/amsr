import AmsrButton from "./AmsrButton"
import STRING from "../constants/String"
import { useNavigate } from "react-router-dom";
import { easeIn, easeInOut, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MainLanding = () => {
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
  const navigate = useNavigate();
  const goApply = () => { navigate('/apply') };

  const landingContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: landingContainerRef });
  const firstTitleX = useTransform(scrollYProgress, [0, 0.25], [-screenSize.width, 0], { ease: easeInOut })
  const secondTitleX = useTransform(scrollYProgress, [0.15, 0.4], [-screenSize.width, 0], { ease: easeInOut })
  const landingOpacity = useTransform(scrollYProgress, [0, 0.75], [0, 1])
  const landingY = useTransform(scrollYProgress, [0.75, 1], [0, - screenSize.height])


  return (
    <div ref={landingContainerRef} className="h-[400vh] flex flex-col items-center">
      <motion.div className='fixed w-full h-screen max-h-[1440px] flex items-center justify-center'
        style={{
          y: landingY
        }}>
        <div className="flex w-full max-w-3xl h-screen items-center justify-center bg-main-landing bg-cover">
          <motion.div className='flex flex-col items-center'
            style={{
              // opacity: landingOpacity
            }}>
            <div className="p-12 rounded-3xl bg-white/50 backdrop-blur drop-shadow-md shadow-clay">
              <div className='p-4'>
                <motion.div className='text-center text-3xl font-bold text-black'
                  animate={{ x: [-0.1 * screenSize.width, 0], opacity: [0, 1] }}
                  transition={{ type: easeInOut, duration: 1.5 }}
                  style={{
                    // x: firstTitleX
                  }}>
                  {STRING.mainLandingTitlePrefix}
                </motion.div>
                <motion.div className='text-center text-3xl font-bold text-black'
                  animate={{ x: [0.1 * screenSize.width, 0], opacity: [0, 1] }}
                  transition={{ type: easeInOut, duration: 1.5, delay: 0.1 }}
                  style={{
                    // x: secondTitleX
                  }}>
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
                <AmsrButton title={STRING.mainLandingApplyButton} onClick={goApply} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default MainLanding