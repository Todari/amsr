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
      <div className="z-30 h-5/6 w-5/6 rounded-3xl bg-white max-w-2xl max-h-[720px]">
        <div className="h-full flex flex-col p-8 items-center">
          <div className="grow flex font-BMDOHYUN text-stone-800 text-l text-center items-center">
            {STRING.privacyModalTitle}
          </div>
          <div className='shrink flex flex-col gap-8 py-4 max-w-3xl justify-center items-center'>
            <div className="text-stone-800 text-base">
              {STRING.privacyModalStart}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-stone-800 text-base">
                {STRING.privacyModalP1}
              </div>
              <div className="text-stone-800 text-base">
                {STRING.privacyModalP2}
              </div>
              <div className="text-stone-800 text-base">
                {STRING.privacyModalP3}
              </div>
              <div className="text-stone-800 text-base">
                {STRING.privacyModalP4}
              </div>
              <div className="text-stone-800 text-base">
                {STRING.privacyModalP5}
              </div>
              <div className="text-stone-800 text-base">
                {STRING.privacyModalP6}
              </div>
              <div className="text-stone-800 text-base">
                {STRING.privacyModalP7}
              </div>
            </div>
            <div className="text-stone-800 text-base">
              {STRING.privacyModalEnd}
            </div>
          </div>
          <div className="grow flex items-center">
            <AmsrButton title={'닫기'} variant="secondary" onClick={handleOpenedChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyModal;