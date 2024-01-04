import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import STRING from "../constants/String";
import AmsrLogo from "./AmsrLogo"

const Header = () => {
  const navigate = useNavigate();
  const goApply = () => { navigate('/apply') };
  const goHistory = () => { navigate('/history') };
  const goHome = () => { navigate('/') }

  return (<div className='fixed top-0 px-8 w-full min-w-[320px] max-w-3xl flex flex-row gap-4 h-16 items-center bg-white drop-shadow-lg z-50'>
    <div className='grow pt-3 pb-0.5 flex items-center justify-start'>
      <motion.div className="top-0" onClick={goHome}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 }
        }}>
        <div className="text-left text-4xl font-BMDOHYUN text-stone-800 truncat">
          {STRING.headerLogo}
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