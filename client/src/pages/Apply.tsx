import { useEffect, useState } from "react";
import ApplyInputField from "../components/ApplyInputField";
import APPLYINPUT from "../constants/ApplyInput";
import ApplyMbtiPicker from "../components/ApplyMbtiPicker";
import AmsrButton from "../components/AmsrButton";
import ApplyBooleanPicker from "../components/ApplyBooleanPicker";
import STRING from "../constants/String";
import ApplyCheckboxButton from "../components/ApplyCheckboxButton";
import ApplyFourItemPicker from "../components/ApplyFourItemPicker";
import { CheckedState } from "@radix-ui/react-checkbox";
import ApplyTransfer from "@/components/ApplyTransfer";
import Info from "../model/info";
import { apply } from "@/http/apply";
import scrollPosition from "@/model/scrollPosition";
import { useDispatch } from "react-redux";
import { setShowHeader } from "@/store/headerStateReducer";
import { useAppSelector } from "@/hooks";

type InfoError = {
  name: boolean;
  phone: boolean;
  age: boolean;
  invited: boolean;
}

const Apply = () => {
  const { showHeader } = useAppSelector((state) => state.headerState)
  const [scrollPosition, setScrollPosition] = useState<scrollPosition>({ prev: window.scrollY, current: window.scrollY })
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // console.log(scrollPosition.prev, scrollPosition.current)
    // console.log(showHeader)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [window.scrollY])

  const handleScroll = () => {
    setScrollPosition({ prev: scrollPosition.current, current: window.scrollY });
    dispatch(setShowHeader(scrollPosition.prev >= scrollPosition.current))
    if (window.scrollY < 50) {
      dispatch(setShowHeader(true))
    }
  }

  const [info, setInfo] = useState<Info>({
    round: `${STRING.mainLandingTitlePrefix} ${STRING.mainLandingTitleSuffix}`,
    privacy: false,
    name: '',
    gender: true,
    phone: '',
    age: '',
    mbti: '',
    invited: '',
    changeSeat: true,
    bottles: 0,
    transfer: false
  });

  const [isError, setIsError] = useState<InfoError>({
    name: false,
    phone: false,
    age: false,
    invited: false,
  });

  // const [isValidate, setIsValidated] = useState(false)

  const handlePrivacyChange = (checked: void | CheckedState) => {
    setInfo({
      ...info,
      privacy: checked,
    })
  }

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

  const handleChangeSeatChange = (value: boolean) => {
    setInfo({
      ...info,
      changeSeat: value
    })
  }

  const handleBottlesChange = (value: number) => {
    setInfo({
      ...info,
      bottles: value
    })
  }

  const handleTransferChange = (value: boolean) => {
    setInfo({
      ...info,
      transfer: value,
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
    // validate();
  }, [info])


  // const validate = () => {
  //   if (
  //     APPLYINPUT.name.finalRegExp.test(info.name) &&
  //     APPLYINPUT.phone.finalRegExp.test(info.phone) &&
  //     APPLYINPUT.age.finalRegExp.test(info.age) &&
  //     APPLYINPUT.invited.finalRegExp.test(info.invited)
  //   ) {
  //     setIsValidated(true);
  //   }
  // }

  const onClickSubmit = () => {
    console.log("!!")
    apply(info)
  }

  return (
    <div className="pt-24 p-8 space-y-4 w-full">
      <div className='flex flex-col gap-16 items-center justify-center'>
        <div className='flex flex-col w-full gap-6 items-center'>
          <ApplyCheckboxButton onChange={handlePrivacyChange} title={STRING.applyPrivacyTitle} text={STRING.applyPrivacyText} subtext={STRING.applyPrivacySubText} />
          <ApplyInputField title={APPLYINPUT.round.title} name={APPLYINPUT.round.type} placeholder={""} value={info.round} isError={false} handleChange={() => { }} />
          <ApplyInputField title={APPLYINPUT.name.title} name={APPLYINPUT.name.type} placeholder={APPLYINPUT.name.placeholder} value={info.name} isError={isError.name} handleChange={handleChange} />
          <ApplyBooleanPicker title={STRING.applyGenderTitle} first={STRING.applyGenderFirst} second={STRING.applyGenderSecond} onChange={handleGenderChange} />
          <ApplyInputField title={APPLYINPUT.phone.title} name={APPLYINPUT.phone.type} placeholder={APPLYINPUT.phone.placeholder} value={info.phone} isError={isError.phone} handleChange={handleChange} />
          <ApplyInputField title={APPLYINPUT.age.title} name={APPLYINPUT.age.type} placeholder={APPLYINPUT.age.placeholder} value={info.age} isError={isError.age} handleChange={handleChange} />
          <ApplyMbtiPicker onChange={handleMbtiChange} />
          <ApplyInputField title={APPLYINPUT.invited.title} name={APPLYINPUT.invited.type} placeholder={APPLYINPUT.invited.placeholder} value={info.invited} isError={isError.invited} handleChange={handleChange} />
          <ApplyBooleanPicker title={STRING.applyChangeSeatTitle} first={STRING.applyChangeSeatFirst} second={STRING.applyChangeSeatSecond} onChange={handleChangeSeatChange} />
          <ApplyFourItemPicker title={STRING.applyBottlesTitle} items={[STRING.applyBottlesFirst, STRING.applyBottlesSecond, STRING.applyBottlesThird, STRING.applyBottlesFourth]} onChange={handleBottlesChange} />
          <ApplyTransfer onChange={handleTransferChange} title={STRING.applyTransferTitle} text={STRING.applyTransferText} subtext={STRING.applyTransferSubText} />
        </div>
        <div>
          <AmsrButton title={STRING.headerApplyButton} onClick={onClickSubmit} />
        </div>
      </div>
    </div >
  )
}

export default Apply;