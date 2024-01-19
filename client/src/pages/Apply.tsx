import { useEffect, useState } from "react";
import ApplyInputField from "../components/ApplyInputField";
import APPLYINPUT from "../constants/ApplyInput";
import ApplyMbtiPicker from "../components/ApplyMbtiPicker";
import AmsrButton from "../components/AmsrButton";
import ApplyBooleanPicker from "../components/ApplyBooleanPicker";
import STRING from "../constants/String";
import ApplyCheckboxButton from "../components/ApplyCheckboxButton";
import ApplyFourItemPicker from "../components/ApplyFourItemPicker";
import ApplyTransfer from "@/components/ApplyTransfer";
import Info from "../model/info";
import scrollPosition from "@/model/scrollPosition";
import { useDispatch } from "react-redux";
import { setShowHeader } from "@/store/headerStateReducer";
import { useAppSelector } from "@/hooks";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button";
import { apply } from "@/http/apply";
import { useToast } from "@/components/ui/use-toast";
import SubmitLoading from "../components/SubmitLoading";
import { useNavigate } from "react-router-dom";

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

  const [isValidated, setIsValidated] = useState(false)

  const handlePrivacyChange = (checked: boolean) => {
    setInfo({
      ...info,
      privacy: checked,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!APPLYINPUT[e.target.name].regExp.test(e.target.value)) {
      setInfo({
        ...info,
        [e.target.name]: e.target.value.slice(0, -1)
      })
    } else {
      setInfo({
        ...info,
        [e.target.name]: e.target.value
      })
    }
    if (e.target.value.length > APPLYINPUT[e.target.name].maxLength) {
      setInfo({ ...info, [e.target.name]: e.target.value.slice(0, APPLYINPUT[e.target.name].maxLength - e.target.value.length) })
    }
  }

  const validateChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsError({
      ...isError,
      [e.target.name]: !APPLYINPUT[e.target.name].finalRegExp.test(e.target.value)
    })
    if (e.target.name !== "invited" && e.target.value === "") {
      setIsError({
        ...isError,
        [e.target.name]: true
      })
    }
    if (e.target.name === "invited" && e.target.value === "") {
      setIsError({
        ...isError,
        [e.target.name]: false
      })
    }
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

  const goHome = () => { navigate('/'); }

  useEffect(() => {
    const checked = info.privacy && true
    if (checked === true && info.age !== "" && info.name !== "" && info.phone !== "") {
      setIsValidated(!isError.name && !isError.age && !isError.phone && !isError.invited)
    }
    // console.log(checked, isError)
  }, [isError, info.privacy])

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast()
  const navigate = useNavigate()

  const onClickSubmit = async () => {
    setIsSubmitting(true);
    const result = await apply(info);
    // await new Promise(f => setTimeout(f, 30000));
    setIsSubmitting(false);

    if (result) {
      toast({
        title: STRING.applySubmitComplete,
        description: STRING.applySubmitCompleteDescription,
      })
      goHome();
    } else {
      toast({
        title: STRING.applySubmitFail,
        description: STRING.applySubmitFailDescription,
      })
    }
  }

  return (
    <div>
      <div className="pt-24 p-8 space-y-4 w-full">
        <div className='flex flex-col gap-16 items-center justify-center'>
          <div className='flex flex-col w-full gap-6 items-center'>
            <ApplyCheckboxButton onChange={handlePrivacyChange} title={STRING.applyPrivacyTitle} text={STRING.applyPrivacyText} subtext={STRING.applyPrivacySubText} />
            <ApplyInputField title={APPLYINPUT.round.title} name={APPLYINPUT.round.type} placeholder={""} value={info.round} isError={false} handleChange={() => { }} />
            <ApplyInputField title={APPLYINPUT.name.title} name={APPLYINPUT.name.type} placeholder={APPLYINPUT.name.placeholder} value={info.name} isError={isError.name} handleChange={handleChange} onBlur={validateChange}  />
            <ApplyBooleanPicker title={STRING.applyGenderTitle} first={STRING.applyGenderFirst} second={STRING.applyGenderSecond} onChange={handleGenderChange} />
            <ApplyInputField title={APPLYINPUT.phone.title} name={APPLYINPUT.phone.type} placeholder={APPLYINPUT.phone.placeholder} value={info.phone} isError={isError.phone} handleChange={handleChange} onBlur={validateChange}  />
            <ApplyInputField title={APPLYINPUT.age.title} name={APPLYINPUT.age.type} placeholder={APPLYINPUT.age.placeholder} value={info.age} isError={isError.age} handleChange={handleChange} onBlur={validateChange}  />
            <ApplyMbtiPicker onChange={handleMbtiChange} />
            <ApplyInputField title={APPLYINPUT.invited.title} name={APPLYINPUT.invited.type} placeholder={APPLYINPUT.invited.placeholder} value={info.invited} isError={isError.invited} handleChange={handleChange} onBlur={validateChange}  />
            <ApplyBooleanPicker title={STRING.applyChangeSeatTitle} first={STRING.applyChangeSeatFirst} second={STRING.applyChangeSeatSecond} onChange={handleChangeSeatChange} />
            <ApplyFourItemPicker title={STRING.applyBottlesTitle} items={[STRING.applyBottlesFirst, STRING.applyBottlesSecond, STRING.applyBottlesThird, STRING.applyBottlesFourth]} onChange={handleBottlesChange} />
            <ApplyTransfer onChange={handleTransferChange} title={STRING.applyTransferTitle} text={STRING.applyTransferText} subtext={STRING.applyTransferSubText} />
          </div>
          {isValidated ?
            <motion.div
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 }
              }}>
              <AmsrButton title={STRING.headerApplyButton} onClick={onClickSubmit} className="w-48 h-12 bg-gradient-to-tr  from-rose-300 via-fuchsia-400 to-teal-300" />
            </motion.div>
            : <Button disabled={!isValidated} className="w-48 h-12 bg-neutral-500" >{STRING.headerApplyButton} </Button>
          }
        </div>
      </div >
      {
        isSubmitting ?
          <SubmitLoading />
          : null
      }
    </div>
  )
}

export default Apply;