import { useEffect, useState } from "react"
import ApplySelectButton from "./ApplySelectButton";

type ApplyBooleanPickerProp = {
  title: string,
  first: string,
  second: string,
  onChange: (gender: boolean) => void
}

const ApplyBooleanPicker = ({ title, first, second, onChange }: ApplyBooleanPickerProp) => {
  const [boolean, setBoolean] = useState<boolean>(true);
  useEffect(() => {
    onChange(boolean);
  }, [boolean])

  return (<div>
    <div className='py-2'>
      <div className='text-sm font-medium text-stone-600 font-BMDOHYUN'>
        {title}
      </div>
    </div>
    <div className='flex flex-row gap-4'>
      <div className='grow'>
        <div onClick={() => setBoolean(true)}>
          <ApplySelectButton prop={first} active={boolean} />
        </div>
      </div>
      <div className='grow'>
        <div onClick={() => setBoolean(false)}>
          <ApplySelectButton prop={second} active={!boolean} />
        </div>
      </div>
    </div>
  </div>
  )
}
export default ApplyBooleanPicker