import AmsrButton from "./AmsrButton"
import STRING from "../constants/String"
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const MainLanding = () => {
  const viewHeight = window.screen.height;
  const navigate = useNavigate();
  const goApply = () => { navigate('/apply') };

  const landingContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: landingContainerRef});
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [0.75, 1.2])
  const offsetTransform = useTransform(scrollYProgress, [0.75, 1], [0, - viewHeight])

  useEffect(() => {
    console.log(scrollYProgress.get())
    console.log(viewHeight)
  }, [])


  return (
    <div ref={landingContainerRef} className="h-[400vh] flex flex-col items-center">
      <motion.div className='fixed w-full h-screen max-h-[1440px] flex flex-col items-center justify-center border-2'
        style={{
          y: offsetTransform
        }}>
        <motion.div className='flex flex-col items-center border-2'
          style={{
            scale: scaleTransform,
          }}>
          <div className='p-4'>
            <div className='text-center text-3xl font-BMDOHYUN font-bold text-stone-800'>
              {STRING.mainLandingTitlePrefix}
            </div>
            <div className='text-center text-3xl font-BMDOHYUN font-bold text-stone-800'>
              {STRING.mainLandingTitleSuffix}
            </div>
          </div>
          <div className='p-2'>
            <div className='text-center text-l font-BMDOHYUN font-medium text-stone-500'>
              {STRING.mainLandingSubTitle}
            </div>
          </div>
          <div className='p-4'>
            <AmsrButton title={STRING.mainLandingApplyButton} disabled={false} onClick={goApply} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MainLanding