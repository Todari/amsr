import STRING from "../constants/String";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label";
import { TypographyLarge } from "./typography/typography";


type ApplyInputFieldProps = {
  title: string;
  name: string
  placeholder: string;
  value: string;
  isError: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApplyInputField = ({ title, name, placeholder, value, isError, handleChange }: ApplyInputFieldProps) => {
  let isDisabled = false;
  if (isError) {
    return (
      <div>
        {/* <div className='py-2'>
          <div className='text-sm font-medium text-rose-500 font-BMDOHYUN'>
            {title}
          </div>
        </div> */}

        <div className="grid w-full max-w-sm items-center gap-3">
          <TypographyLarge text={title} />
          <Input type={name} id="name" placeholder={placeholder} value={value} onChange={handleChange} />
        </div>

        {/* <input
          className="border-2 border-rose-500 h-12 rounded-lg p-4 w-full text-sm font-medium"
          type="text"
          name={name}
          id={title}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <div className="pt-1 text-rose-500 text-sm">
          {STRING.applyInputErrorPrefix}{title}{STRING.applyInputErrorSuffix}
        </div> */}
      </div>
    )
  }
  if (title === "회차") {
    isDisabled = true;
  }
  return (<div>

    {/* <div className='py-2'>
      <div className='text-sm font-medium text-stone-600 font-BMDOHYUN'>
        {title}
      </div>
    </div> */}


    <div className="grid w-full max-w-sm items-center gap-3">
      <TypographyLarge text={title} />
      <Input type={name} id="name" placeholder={placeholder} value={value} onChange={handleChange} />
    </div>


    {/* <input
      className="border-2 h-12 rounded-lg p-4 w-full text-sm font-medium"
      type="text"
      disabled={isDisabled}
      name={name}
      id={title}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
     /> */}
  </div>
  )
}
export default ApplyInputField