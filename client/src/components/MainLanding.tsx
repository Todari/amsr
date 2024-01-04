import AmsrButton from "./AMSRButton"
import STRING from "../constants/String"

const MainLanding = () => {
  return (
    <div className='h-screen max-h-[1440px] flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='p-4'>
          <div className='text-center text-2xl font-bold text-stone-800'>
            {STRING.mainLandingTitle}
          </div>
        </div>
        <div className='p-2'>
          <div className='text-center text-m font-medium text-stone-800'>
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