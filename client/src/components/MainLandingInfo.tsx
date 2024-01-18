import { useAppSelector } from "@/hooks"
import { motion, useInView, useAnimation } from "framer-motion"
import { ReactComponent as TALK } from "../asset/illustration-talk.svg"
import { ReactComponent as SMILE } from "../asset/illustration-smile.svg"
import { ReactComponent as TEAM } from "../asset/illustration-team.svg"
import { TypographyMuted, TypographyP } from "./typography/typography"

const MainLandingInfo = () => {
  const { width, height } = useAppSelector((state) => state.screenSize)

  return (
    <div className="snap-always bg-emerald-100/70 snap-center w-full h-[100dvh] flex flex-col items-center justify-center pt-24 p-8">
      <div className="w-full h-full max-w-3xl flex flex-col gap-2 ">
        <div className="basis-1/4 bg-white border-violet-200 border-2 rounded-3xl flex flex-col py-4 px-6 justify-end">
          <TypographyP text="아무사람대잔치~~" className="font-bold"></TypographyP>
          <TypographyMuted text="아무사람대잔치~~"></TypographyMuted>
        </div>
        <div className="basis-3/4 flex flex-row gap-2 w-full h-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="basis-1/3 bg-white border-emerald-200 border-2 rounded-3xl w-full h-full flex flex-col items-center justify-center" >
              <SMILE />
            </div>
            <div className="basis-2/3 bg-white border-fuchsia-200 border-2 rounded-3xl w-full h-full py-4 px-6" >
              <TypographyP text="아무사람대잔치~~" className="font-bold"></TypographyP>
              <TypographyMuted text="아무사람대잔치~~"></TypographyMuted>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full h-full">
            <div className="basis-2/3 bg-white border-rose-200 border-2 rounded-3xl w-full h-full flex flex-col justify-between" >
              <div className="py-4 px-6">
                <TypographyP text="아무사람대잔치~~" className="font-bold"></TypographyP>
                <TypographyMuted text="아무사람대잔치~~"></TypographyMuted>
              </div>
              <TEAM />
            </div>
            <div className="basis-1/3 bg-white border-cyan-200 border-2 rounded-3xl w-full h-full flex  flex-col justify-end py-4 px-6 " >
              <TypographyP text="아무사람대잔치~~" className="font-bold"></TypographyP>
              <TypographyMuted text="아무사람대잔치~~"></TypographyMuted>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLandingInfo