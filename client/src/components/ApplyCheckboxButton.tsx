import STRING from "../constants/String";
import { useEffect, useState } from "react";
import PrivacyModal from "./PrivacyModal";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { CheckedState } from "@radix-ui/react-checkbox";
import { TypographyLarge, TypographySmall, TypographyMuted } from "./typography/typography";

type ApplyCheckboxButtonProps = {
  onChange: (checked: CheckedState) => void,
  title: string,
  text: string,
  subtext: string,
}

const FormSchema = z.object({
  checked: z.boolean().default(false).optional(),
})

const ApplyCheckboxButton = ({ onChange, title, text, subtext }: ApplyCheckboxButtonProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const handleChecked = () => {
    setIsChecked(!isChecked);
    onChange(isChecked)
  }

  const changeModalOpened = () => {
    setModalOpened(!modalOpened);
    console.log(modalOpened)
  }

  if (modalOpened) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return (
    <div className="grid w-full max-w-3xl items-center gap-3">
      <TypographyLarge text={title}/>
        <div className="space-y-6 w-full max-w-3xl items-center gap-3">
              <div className="flex flex-row w-full items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={handleChecked}
                  />
                <div className="space-y-1 leading-none">
                  <TypographySmall text={text}/>
                  <TypographyMuted text={subtext} onClick={changeModalOpened}/>
                </div>
              </div>
        </div>
      {
        modalOpened ?
          <PrivacyModal handleOpenedChange={changeModalOpened} />
          : null
      }
    </div>
  )

  // return (<div>
  //   <div className='flex flex-row gap-4 h-12 items-center'>

  //     <input
  //       type="checkbox"
  //       checked={isChecked}
  //       onChange={onChange}
  //       onClick={onClick} />
  //     <div className='flex flex-row'>
  //       <div className='text-stone-800 text-sm pr-2'>
  //         {STRING.applyPrivacyPrefix}
  //       </div>
  //       <div className='text-sky-400 text-sm font-bold' onClick={changeModalOpened}>
  //         {STRING.applyPrivacyMiddle}
  //       </div>
  //       <div className='text-stone-800 text-sm'>
  //         {STRING.applyPrivacySuffix}
  //       </div>
  //     </div>
  //   </div>
  //   {
  //     modalOpened ?
  //       <PrivacyModal handleOpenedChange={changeModalOpened} />
  //       : null
  //   }
  // </div>
  // )
}

export default ApplyCheckboxButton;