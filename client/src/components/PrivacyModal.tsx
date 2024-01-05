import AmsrButton from "./AmsrButton";
import STRING from "../constants/String";

type PrivacyModalProp = {
  handleOpenedChange: () => void
}

const PrivacyModal = ({ handleOpenedChange }: PrivacyModalProp) => {

  return (
    <div className="flex fixed inset-0 z-20 w-screen h-screen bg-stone-800 bg-opacity-50 items-center justify-center"
      // onClick={handleOpenedChange}
    >
      <div className="z-30 h-3/4 w-5/6 rounded-3xl bg-white max-w-2xl max-h-[720px]">
        <div className="h-full flex flex-col py-16 px-8 items-center">
          <div className="font-BMDOHYUN text-stone-800 text-center">
            {STRING.privacyModalTitle}
          </div>
          <div className='grow flex flex-col gap-8 py-8 max-w-sm'>
            <div className="text-stone-800">
              {STRING.privacyModalStart}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-stone-800">
                {STRING.privacyModalP1}
              </div>
              <div className="text-stone-800">
                {STRING.privacyModalP2}
              </div>
              <div className="text-stone-800">
                {STRING.privacyModalP3}
              </div>
              <div className="text-stone-800">
                {STRING.privacyModalP4}
              </div>
              <div className="text-stone-800">
                {STRING.privacyModalP5}
              </div>
              <div className="text-stone-800">
                {STRING.privacyModalP6}
              </div>
              <div className="text-stone-800">
                {STRING.privacyModalP7}
              </div>
            </div>
            <div className="text-stone-800">
              {STRING.privacyModalEnd}
            </div>
          </div>
          <AmsrButton title={'닫기'} disabled={false} onClick={handleOpenedChange} />
        </div>
      </div>
    </div>
  )
}

export default PrivacyModal;