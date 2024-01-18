import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";


type buttonState = {
  title: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null,
  onClick?: () => void
  className? : string,
  disabled? : boolean,
}

const AmsrButton = ({ title, variant, onClick, className, disabled }: buttonState) => {

  // if (disabled) {
  //   return (
  //     <Button onClick={()=>{}} variant={variant ? variant : "default"}
  //     className={twMerge(className, "bg-neutral-700")}>
  //         {title}
  //     </Button>
  //   )  
  // }

  return (
    <Button onClick={onClick} variant={variant ? variant : "default"} className={className}>
        {title}
    </Button>
  )
}

export default AmsrButton;