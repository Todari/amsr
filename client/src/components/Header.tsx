import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import STRING from "../constants/String";
import { useEffect, useState } from "react";
import AmsrButton from "../components/AmsrButton";
import {ReactComponent as AMSR_LOGO} from "../asset/amsr-logo.svg"
import {ReactComponent as AMSR_LOGO2} from "../asset/amsr1.svg"

type HeaderProp = {
  visible: boolean
}

const Header = ({ visible }: HeaderProp) => {
  const navigate = useNavigate();
  const goApply = () => { navigate('/apply') };
  const goHome = () => { navigate('/') }
  const [y, setY] = useState(0);

  useEffect(() => {
    if (visible) {
      setY(0)
    } else {
      setY(-80)
    }
  }, [visible])

  return (<motion.div className='fixed top-0 px-8 w-full flex flex-row gap-4 h-16 items-center justify-center bg-white drop-shadow-lg z-50'
    animate={{ y }}
    transition={{ duration: 0.3 }}>
    <div className='grow flex items-center justify-start max-w-3xl'>
      <motion.div className="top-0" onClick={goHome}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1 }
        }}>
        {/* <div className="text-left text-2xl text-stone-800 truncat">
          {STRING.headerLogo}
        </div> */}
        <AMSR_LOGO className="aspect-square h-24"/>
      </motion.div>
    </div>
    <div className='shrink h-full py-3.5 flex justify-center'>
      <AmsrButton title={STRING.headerApplyButton} variant="secondary" onClick={goApply} />
    </div>
  </motion.div >)
}

export default Header;