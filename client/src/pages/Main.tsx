import MainInfo from "../components/MainInfo"
import MainLanding from "../components/MainLanding"


const Main = () => {
  return (
    <div className= 'snap-mandatory snap-y overflow-scroll'>
      <MainLanding />     
      <MainInfo />
    </div>)
}

export default Main