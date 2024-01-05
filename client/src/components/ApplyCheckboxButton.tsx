import STRING from "../constants/String";
import { useEffect, useState } from "react";

type ApplyCheckboxButtonProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ApplyCheckboxButton = ({ onChange }: ApplyCheckboxButtonProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const onClick = () => {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    console.log(isChecked);
  }, [isChecked])

  return (<div>
    <div className='py-2'>
      <div className='text-sm font-medium text-stone-600 font-BMDOHYUN'>
        {STRING.applyPrivacyTitle}
      </div>
    </div>
    <div className='flex flex-row gap-4 h-12 items-center'>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        onClick={onClick} />
      <div className='flex flex-row'>
        <div className='text-stone-800 text-sm pr-2'>
          {STRING.applyPrivacyPrefix}
        </div>
        <div className='text-sky-400 text-sm font-bold' onClick={() => { }}>
        {STRING.applyPrivacyMiddle}
        </div>
        <div className='text-stone-800 text-sm'>
        {STRING.applyPrivacySuffix}
        </div>
      </div>
    </div>
  </div>
  )
}

export default ApplyCheckboxButton;