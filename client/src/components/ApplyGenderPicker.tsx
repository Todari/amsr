import { useEffect, useState } from "react"
import ApplySelectButton from "./ApplySelectButton";
import STRING from "../constants/String";

type ApplyGenderPickerProp = {
  onChange: (gender: boolean) => void
}

const ApplyGenderPicker = ({ onChange }: ApplyGenderPickerProp) => {
  const [gender, setGender] = useState<boolean>(true);
  useEffect(() => {
    onChange(gender);
  }, [gender])

  return (<div>
    <div className='py-2'>
      <div className='text-sm font-medium text-stone-600 font-BMDOHYUN'>
        {STRING.applyGenderTitle}
      </div>
    </div>
    <div className='flex flex-row gap-4'>
      <div className='grow'>
        <div onClick={() => setGender(true)}>
          <ApplySelectButton prop='남' active={gender} />
        </div>
      </div>
      <div className='grow'>
        <div onClick={() => setGender(false)}>
          <ApplySelectButton prop='여' active={!gender} />
        </div>
      </div>
    </div>
  </div>
  )
}
export default ApplyGenderPicker