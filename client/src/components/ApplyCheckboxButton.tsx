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
        <div className='text-stone-800 text-sm'>
          (필수)
        </div>
        <div className='text-sky-400 text-sm font-bold' onClick={() => { }}>
          개인정보 제공내역
        </div>
        <div className='text-stone-800 text-sm'>
          에 동의합니다.
        </div>
      </div>
    </div>
  </div>
  )
}

export default ApplyCheckboxButton;