import MainInfo from "../components/MainInfo"
import MainLanding from "../components/MainLanding"


const Main = () => {
  return (
    <div className='snap-mandatory snap-y overflow-scroll flex flex-col items-center'>
      


        <MainLanding />
        <MainInfo />
      </div>
    
    )
}

export default Main