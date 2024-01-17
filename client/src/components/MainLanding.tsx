import AmsrButton from "./AmsrButton"
import STRING from "../constants/String"
import { useNavigate } from "react-router-dom";
import { easeIn, easeInOut, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import KakaoMap from "./KakaoMap";
import { setScreenSize } from "@/store/screenSizeReducer";
import { useAppSelector, useAppDispatch } from "@/hooks";

const MainLanding = () => {
  const dispatch = useAppDispatch();
  const { width, height } = useAppSelector((state) => state.screenSize);

  const handleScreenSize = () => {
    dispatch(setScreenSize({
      width: window.screen.width,
      height: window.screen.height
    }));
  }

  useEffect(() => {
    window.addEventListener('resize', handleScreenSize)
    return () => {
      window.removeEventListener('resize', handleScreenSize)
    }
  }, [])

  const navigate = useNavigate();
  const goApply = () => { navigate('/apply') };

  return (
    <div className="snap-always snap-center flex w-full max-w-5xl h-[100dvh] items-center justify-center">
      <motion.div className='flex flex-col items-center'
        style={{
        }}>
        <div className="p-12 rounded-3xl bg-white/50 backdrop-blur drop-shadow-md shadow-clay">
          <div className='p-4'>
            <motion.div className='text-center text-3xl font-bold text-black'
              animate={{ x: [-0.1 * width, 0], opacity: [0, 1] }}
              transition={{ type: easeInOut, duration: 1.5 }}
            >
              {STRING.mainLandingTitlePrefix}
            </motion.div>
            <motion.div className='text-center text-3xl font-bold text-black'
              animate={{ x: [0.1 * width, 0], opacity: [0, 1] }}
              transition={{ type: easeInOut, duration: 1.5, delay: 0.1 }}
            >
              {STRING.mainLandingTitleSuffix}
            </motion.div>
          </div>
          <div className='p-2 flex flex-col'>
            <motion.div className='text-center text-l font-medium text-stone-500'
              animate={{ y: [0.1 * width, 0], opacity: [0, 1] }}
              transition={{ type: easeInOut, duration: 1.5, delay: 0.2 }}
            >
              {STRING.mainLandingSubTitle}
            </motion.div>
            <motion.div className='text-center text-l font-medium text-stone-500'
              animate={{ y: [0.1 * width, 0], opacity: [0, 1] }}
              transition={{ type: easeInOut, duration: 1.5, delay: 0.2 }}
            >
              {STRING.mainLandingSubTitle2}
            </motion.div>
          </div>
          <KakaoMap />
          <motion.div className='p-4 flex justify-center'
            animate={{ y: [0.1 * width, 0], opacity: [0, 1] }}
            transition={{ type: easeInOut, duration: 1.5, delay: 1.5 }}>
            <AmsrButton title={STRING.mainLandingApplyButton} onClick={goApply} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default MainLanding