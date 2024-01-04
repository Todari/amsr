import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import STRING from "../constants/String";
import AmsrLogo from "./AmsrLogo"

const Header = () => {
  const navigate = useNavigate();
  const goApply = () => { navigate('/apply') };
  const goHistory = () => { navigate('/history') };
  const goHome = () => { navigate('/') }

  return (<div className='fixed top-0 px-8 w-full max-w-3xl flex flex-row gap-4 h-16 items-center bg-white drop-shadow-lg z-50'>
    <div className='basis-2/4 h-full py-3 flex'>
      <motion.div className="flex justify-center items-end" onClick={goHome}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 }
        }}>
        <div className="text-left text-3xl font-BMDOHYUN text-stone-800">
          {STRING.headerLogo}
        </div>
      </motion.div>
    </div>
    <div className='basis-1/4 h-full py-3'>
      <motion.div className='border-2 h-full rounded-lg flex items-center justify-center' onClick={goHistory}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 }
        }}>
        <div className='text-center text-stone-800 text-sm'>
          {STRING.headerHistoryButton}
        </div>
      </motion.div>
    </div>
    <div className='basis-1/4 h-full py-3'>
      <motion.div className='bg-pink-400 h-full rounded-lg flex items-center justify-center' onClick={goApply}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 }
        }}>
        <div className='text-center text-white text-sm'>
          {STRING.headerApplyButton}
        </div>
      </motion.div>
    </div>
  </div >)
}

export default Header;