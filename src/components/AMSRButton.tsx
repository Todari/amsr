import { motion } from "framer-motion";

type buttonState = {
  title: string
}

const AmsrButton = ({ title }: buttonState) => {
  return (
    <motion.div className=' w-48 py-4 rounded-lg flex justify-center inset-0 bg-pink-400 drop-shadow-xl'
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}>
      <div className='text-center text-m font-normal text-white'>
        {title}
      </div>
    </motion.div>
  )
}

export default AmsrButton;