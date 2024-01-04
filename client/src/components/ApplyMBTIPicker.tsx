import STRING from "../constants/String";
import ApplySelectButton from "./ApplySelectButton";
import {  useEffect, useState } from "react";
type ApplySelectPickerProp = {
  onChange: (mbtiStr: string) => void
}

type Mbti = {
  e: boolean;
  n: boolean;
  t: boolean;
  p: boolean;
}

const ApplySelectPicker = ({ onChange }: ApplySelectPickerProp) => {
  const [mbtiStr, setMbtiStr] = useState('ENTP')
  const [mbti, setMbti] = useState<Mbti>({
    e: true,
    n: true,
    t: true,
    p: true,
  });

  useEffect(() => {
    console.log(mbti);
    const mbtiArr = [];
    if (mbti.e) {
      mbtiArr.push(STRING.mbtiE)
    } else {
      mbtiArr.push(STRING.mbtiI)
    } if (mbti.n) {
      mbtiArr.push(STRING.mbtiN)
    } else {
      mbtiArr.push(STRING.mbtiS)
    }
    if (mbti.t) {
      mbtiArr.push(STRING.mbtiT)
    } else {
      mbtiArr.push(STRING.mbtiF)
    }
    if (mbti.p) {
      mbtiArr.push(STRING.mbtiP)
    } else {
      mbtiArr.push(STRING.mbtiJ)
    }
    setMbtiStr(mbtiArr.join(""))
    onChange(mbtiStr);
  }, [mbti, mbtiStr]);

  return (
    <div>
      <div className='py-2'>
        <div className='text-m font-medium text-stone-800'>
          MBTI
        </div>
      </div>
      <div className='flex flex-row gap-4'>
        <div className='grow basis-1/4 flex flex-col gap-4'>
          <div onClick={() => setMbti({
            ...mbti,
            e: true
          })}>
            <ApplySelectButton prop='E' active={mbti.e} />
          </div>
          <div onClick={() => setMbti({
            ...mbti,
            e: false
          })}>
            <ApplySelectButton prop='I' active={!mbti.e} />
          </div>
        </div>
        <div className='grow basis-1/4 flex flex-col gap-4'>
          <div onClick={() => setMbti({
            ...mbti,
            n: true
          })}>
            <ApplySelectButton prop='N' active={mbti.n} />
          </div>
          <div onClick={() => setMbti({
            ...mbti,
            n: false
          })}>
            <ApplySelectButton prop='S' active={!mbti.n} />
          </div>
        </div>
        <div className='grow basis-1/4 flex flex-col gap-4'>
          <div onClick={() => setMbti({
            ...mbti,
            t: true
          })}>
            <ApplySelectButton prop='T' active={mbti.t} />
          </div>
          <div onClick={() => setMbti({
            ...mbti,
            t: false
          })}>
            <ApplySelectButton prop='F' active={!mbti.t} />
          </div>
        </div>
        <div className='grow basis-1/4 flex flex-col gap-4'>
          <div onClick={() => setMbti({
            ...mbti,
            p: true
          })}>
            <ApplySelectButton prop='P' active={mbti.p} />
          </div>
          <div onClick={() => setMbti({
            ...mbti,
            p: false
          })}>
            <ApplySelectButton prop='J' active={!mbti.p} />
          </div>
        </div>

      </div>
    </div >
  )
}

export default ApplySelectPicker;