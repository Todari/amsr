import AmsrButton from "./AmsrButton";
import STRING from "../constants/String";
import { TypographyLarge, TypographyP, TypographySmall } from "./typography/typography";

type PrivacyModalProp = {
  handleOpenedChange: () => void
}

const PrivacyModal = ({ handleOpenedChange }: PrivacyModalProp) => {

  return (
    <div className="flex fixed inset-0 z-50 w-screen h-screen bg-stone-800 bg-opacity-50 items-center justify-center"
    // onClick={handleOpenedChange}
    >
      <div className="z-50 h-5/6 w-5/6 rounded-3xl bg-white max-w-2xl max-h-[720px]">
        <div className="h-full flex flex-col p-8 items-center">
          <div className="grow flex text-center items-center">
            <TypographyLarge text={STRING.privacyModalTitle} />
          </div>
          <div className='shrink flex flex-col gap-4 py-4 max-w-sm justify-center items-center '>
            <TypographyP text={STRING.privacyModalStart} />
            <div className="flex flex-col gap-2">
              <TypographySmall text={STRING.privacyModalP1} />
              <TypographySmall text={STRING.privacyModalP2} />
              <TypographySmall text={STRING.privacyModalP3} />
              <TypographySmall text={STRING.privacyModalP4} />
              <TypographySmall text={STRING.privacyModalP5} />
              <TypographySmall text={STRING.privacyModalP6} />
            </div>
            <TypographyP text={STRING.privacyModalEnd} />
          </div>
          <div className="grow flex items-center">
            <AmsrButton title={'닫기'} variant="secondary" onClick={handleOpenedChange} className="w-48 h-12"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyModal;