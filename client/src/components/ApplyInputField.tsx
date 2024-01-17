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
        <div className="grid w-full max-w-3xl items-center gap-3">
          <TypographyLarge text={title} className="text-rose-500"/>
          <Input className="" type="text" id={title} disabled={isDisabled} name={name} placeholder={placeholder} value={value} onChange={handleChange} />
          <div className="pt-1 text-rose-500 text-sm">
            {STRING.applyInputErrorPrefix}{title}{STRING.applyInputErrorSuffix}
          </div>
        </div>
    )
  }
  if (title === "회차") {
    isDisabled = true;
  }
  return (
    <div className="grid w-full max-w-3xl items-center gap-3">
      <TypographyLarge text={title} />
      <Input type="text" id={title} disabled={isDisabled} name={name} placeholder={placeholder} value={value} onChange={handleChange} />

    </div>
  )
}
export default ApplyInputField