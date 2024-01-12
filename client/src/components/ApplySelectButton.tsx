import { motion } from "framer-motion";
import AmsrButton from "./AmsrButton";
import { Button } from "./ui/button";

type ApplySelectButtonProp = {
  prop: string,
  active: boolean,
}

const ApplySelectButton = ({ prop, active }: ApplySelectButtonProp) => {
  if (active === true) {
    return (
      // <motion.div className='relative border-2 border-emerald-400 rounded-lg h-12 flex justify-center items-center'
      //   whileTap={{
      //     scale: 0.95,
      //     transition: { duration: 0.1 }
      //   }}>
      <motion.div className='flex items-center justify-center'
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 }
        }}>
        {/* <AmsrButton title={prop} onClick={() => { }} /> */}
        <Button className="flex  w-full h-12" onClick={() => { }}>{prop}</Button>
        {/* <div className='absolute pt-1 text-sm text-bold text-center text-emerald-400 align-middle font-BMDOHYUN'>
          {prop}
        </div> */}
      </motion.div>
    )
  } return (
    // <motion.div className='relative border-2 rounded-lg h-12 flex justify-center items-center'
    //   whileTap={{
    //     scale: 0.95,
    //     transition: { duration: 0.1 }
    //   }}>
    <motion.div className='flex items-center justify-center'
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}>
      {/* <AmsrButton title={prop} variant="outline" onClick={() => { }} /> */}
      <Button className="flex w-full h-12" variant="outline" onClick={() => { }}> {prop}</Button>
      {/* <div className='absolute pt-1 text-sm text-bold text-center text-stone-400 align-middle font-BMDOHYUN'>
        {prop}
      </div> */}
    </motion.div>
  )
}

export default ApplySelectButton;