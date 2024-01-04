import AmsrButton from "./AmsrButton"
import STRING from "../constants/String"

const MainLanding = () => {
  return (
    <div className='h-screen max-h-[1440px] flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='p-4'>
          <div className='text-center text-3xl font-BMDOHYUN font-bold text-stone-800'>
            {STRING.mainLandingTitlePrefix}
          </div>
          <div className='text-center text-3xl font-BMDOHYUN font-bold text-stone-800'>
            {STRING.mainLandingTitleSuffix}
          </div>
        </div>
        <div className='p-2'>
          <div className='text-center text-l font-BMDOHYUN font-medium text-stone-500'>
          {STRING.mainLandingSubTitle}
          </div>
        </div>
        <div className='p-8'>
          <AmsrButton title={STRING.mainLandingApplyButton} />
        </div>
      </div>
    </div>
  )
}

export default MainLanding