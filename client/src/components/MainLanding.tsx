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
      <motion.div className='flex flex-col items-center h-full w-full pt-24 p-8 justify-center'
        style={{
        }}>
        <div className="grow p-8 rounded-3xl h-full w-full flex flex-col gap-4 items-center justify-center bg-gradient-to-tr  from-rose-200/70 via-fuchsia-200/70 to-teal-200/70">
          <div className='flex flex-col'>
            <motion.div className='text-center text-2xl font-bold text-neutral-700 font-ClimateCrisisKRVF'
              animate={{ x: [-0.1 * width, 0], opacity: [0, 1] }}
              transition={{ type: easeInOut, duration: 1.5 }}
            >
              {STRING.mainLandingTitlePrefix}
            </motion.div>
            <motion.div className='text-center text-2xl font-bold text-neutral-700 font-ClimateCrisisKRVF'
              animate={{ x: [0.1 * width, 0], opacity: [0, 1] }}
              transition={{ type: easeInOut, duration: 1.5, delay: 0.1 }}
            >
              {STRING.mainLandingTitleSuffix}
            </motion.div>
          </div>
          <div className='flex flex-col'>
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
          <motion.div className='flex justify-center pt-4'
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