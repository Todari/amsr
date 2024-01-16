import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";


type buttonState = {
  title: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null,
  onClick?: () => void
}

const AmsrButton = ({ title, variant, onClick }: buttonState) => {
  // if (!disabled) {
  //   return (
  //     <motion.div className=' w-48 pt-4 pb-3 rounded-lg flex justify-center inset-0 bg-emerald-400 drop-shadow-xl' onClick={onClick}
  //       whileHover={{
  //         scale: 1.05,
  //         transition: { duration: 0.2 }
  //       }}
  //       whileTap={{
  //         scale: 0.95,
  //         transition: { duration: 0.1 }
  //       }}>
  //       <div className='text-center text-base font-BMDOHYUN font-normal text-white'>
  //         {title}
  //       </div>
  //     </motion.div>
  //   )
  // }
  // return (
  //   <div className=' w-48 pt-4 pb-3 rounded-lg flex justify-center inset-0 bg-stone-400 drop-shadow-xl'>
  //     <div className='text-center text-base font-BMDOHYUN font-normal text-white'>
  //       {title}
  //     </div>
  //   </div>
  // )

  return (
    <Button onClick={onClick} variant={variant ? variant : "default"}>
        {title}
    </Button>
  )
}

export default AmsrButton;