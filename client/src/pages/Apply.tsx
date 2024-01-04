import { useEffect, useState } from "react";
import ApplyInputField from "../components/ApplyInputField";
import APPLYINPUT from "../constants/ApplyInput";
import ApplyMBTIPicker from "../components/ApplyMBTIPicker";
import AmsrButton from "../components/AmsrButton";
import ApplyGenderPicker from "../components/ApplyGenderPicker";
import STRING from "../constants/String";

type Info = {
  round: string;
  name: string;
  gender: boolean;
  phone: string;
  age: string;
  mbti: string;
  invited: string;
}

type InfoError = {
  name: boolean;
  phone: boolean;
  age: boolean;
  invited: boolean;
}

const Apply = () => {
  const [info, setInfo] = useState<Info>({
    round: `${STRING.mainLandingTitlePrefix} ${STRING.mainLandingTitleSuffix}`,
    name: '',
    gender: true,
    phone: '',
    age: '',
    mbti: '',
    invited: '',
  });

  const [isError, setIsError] = useState<InfoError>({
    name: false,
    phone: false,
    age: false,
    invited: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  const handleMbtiChange = (value: string) => {
    setInfo({
      ...info,
      mbti: value
    })
  }

  const handleGenderChange = (value: boolean) => {
    setInfo({
      ...info,
      gender: value
    })
  }

  useEffect(() => {
    console.log(info);
    if (info.name.length > APPLYINPUT.name.maxLength) {
      setInfo({ ...info, name: info.name.slice(0, APPLYINPUT.name.maxLength) })
    }
    if (info.phone.length > APPLYINPUT.phone.maxLength) {
      setInfo({ ...info, phone: info.phone.slice(0, APPLYINPUT.phone.maxLength) })
    }
    if (info.age.length > APPLYINPUT.age.maxLength) {
      setInfo({ ...info, age: info.age.slice(0, APPLYINPUT.age.maxLength) })
    }
    setIsError({
      name: info.name !== '' && !APPLYINPUT.name.regExp.test(info.name),
      phone: info.phone !== '' && !APPLYINPUT.phone.regExp.test(info.phone),
      age: info.age !== '' && !APPLYINPUT.age.regExp.test(info.age),
      invited: info.invited !== '' && !APPLYINPUT.invited.regExp.test(info.invited),
    })
  }, [info])

  const onClickSubmit = () => {

  }

  return (
    <div className="pt-20 p-8 space-y-4">
      <div className='flex flex-col gap-16 items-center'>
        <div className='w-full flex flex-col gap-4'>
          <ApplyInputField title={APPLYINPUT.round.title} name={APPLYINPUT.round.type} placeholder={""} value={info.round} isError={false} handleChange={() => { }} />
          <ApplyInputField title={APPLYINPUT.name.title} name={APPLYINPUT.name.type} placeholder={APPLYINPUT.name.placeholder} value={info.name} isError={isError.name} handleChange={handleChange} />
          <ApplyGenderPicker onChange={handleGenderChange} />
          <ApplyInputField title={APPLYINPUT.phone.title} name={APPLYINPUT.phone.type} placeholder={APPLYINPUT.phone.placeholder} value={info.phone} isError={isError.phone} handleChange={handleChange} />
          <ApplyInputField title={APPLYINPUT.age.title} name={APPLYINPUT.age.type} placeholder={APPLYINPUT.age.placeholder} value={info.age} isError={isError.age} handleChange={handleChange} />
          <ApplyMBTIPicker onChange={handleMbtiChange} />
          <ApplyInputField title={APPLYINPUT.invited.title} name={APPLYINPUT.invited.type} placeholder={APPLYINPUT.invited.placeholder} value={info.invited} isError={isError.invited} handleChange={handleChange} />
        </div>
        <div onClick={onClickSubmit}>
          <AmsrButton title={STRING.headerApplyButton} />
        </div>
      </div>
    </div >
  )
}

export default Apply;