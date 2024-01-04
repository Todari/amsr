import { motion } from "framer-motion";

type ApplySelectButtonProp = {
  prop: string,
  active: boolean,
}

const ApplySelectButton = ({ prop, active }: ApplySelectButtonProp) => {
  if (active === true) {
    return (
      <motion.div className='relative bg-pink-300 rounded-lg h-12 flex justify-center items-center'
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 }
        }}>
        <div className='absolute pt-1 text-l text-bold text-center text-white align-middle font-BMDOHYUN'>
          {prop}
        </div>
      </motion.div>
    )
  } return (
    <motion.div className='relative border-2 rounded-lg h-12 flex justify-center items-center'
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}>
      <div className='absolute pt-1 text-l text-bold text-center text-stone-400 align-middle font-BMDOHYUN'>
        {prop}
      </div>
    </motion.div>
  )
}

export default ApplySelectButton;