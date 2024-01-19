import { motion } from 'framer-motion'
import { ReactComponent as A1 } from "@/asset/a1.svg"
import { ReactComponent as A2 } from "@/asset/a2.svg"
import { ReactComponent as S1 } from "@/asset/s1.svg"
import { ReactComponent as S2 } from "@/asset/s2.svg"
import { ReactComponent as M1 } from "@/asset/m1.svg"
import { ReactComponent as M2 } from "@/asset/m2.svg"
import { ReactComponent as R1 } from "@/asset/r1.svg"
import { ReactComponent as R2 } from "@/asset/r2.svg"
import { useAppSelector } from '@/hooks'

const SubmitLoading = () => {
  const { width } = useAppSelector((state) => state.screenSize)

  return (
    <div className="flex fixed inset-0 z-50 w-screen h-screen bg-stone-800 bg-opacity-50 items-center justify-center">

      <div className="w-5/6 flex flex-row items-center justify-between">
        <motion.div className='w-16 h-16 aspect-square'
          animate={{ y: [-0.1 * width, 0.1 * width, -0.1 * width] }}
          transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
        >
          <A1 />
        </motion.div>
        <motion.div className='w-16 h-16 aspect-square'
          // style={LoadingDot}
          animate={{ y: [-0.1 * width, 0.1 * width, -0.1 * width] }}
          transition={{ ease: "easeInOut", duration: 1, delay: 0.25, repeat: Infinity }}
        ><M1 /></motion.div>
        <motion.div className='w-16 h-16 aspect-square'
          // style={LoadingDot}
          animate={{ y: [-0.1 * width, 0.1 * width, -0.1 * width] }}
          transition={{ ease: "easeInOut", duration: 1, delay: 0.5, repeat: Infinity }}
        >
          <S1 />
        </motion.div>
        <motion.div className='w-16 h-16 aspect-square'
          // style={LoadingDot}
          animate={{ y: [-0.1 * width, 0.1 * width, -0.1 * width] }}
          transition={{ ease: "easeInOut", duration: 1, delay: 0.75, repeat: Infinity, }}
        >
          <R1 />
        </motion.div>
      </div>
    </div>
  )
}

export default SubmitLoading;