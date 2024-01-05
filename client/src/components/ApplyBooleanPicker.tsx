import { useEffect, useState } from "react"
import ApplySelectButton from "./ApplySelectButton";
import STRING from "../constants/String";

type ApplyBooleanPickerProp = {
  title: string,
  first: string,
  second: string,
  onChange: (gender: boolean) => void
}

const ApplyBooleanPicker = ({ title, first, second, onChange }: ApplyBooleanPickerProp) => {
  const [gender, setGender] = useState<boolean>(true);
  useEffect(() => {
    onChange(gender);
  }, [gender])

  return (<div>
    <div className='py-2'>
      <div className='text-sm font-medium text-stone-600 font-BMDOHYUN'>
        {title}
      </div>
    </div>
    <div className='flex flex-row gap-4'>
      <div className='grow'>
        <div onClick={() => setGender(true)}>
          <ApplySelectButton prop={first} active={gender} />
        </div>
      </div>
      <div className='grow'>
        <div onClick={() => setGender(false)}>
          <ApplySelectButton prop={second} active={!gender} />
        </div>
      </div>
    </div>
  </div>
  )
}
export default ApplyBooleanPicker