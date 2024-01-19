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
        <div className="basis-1/4 bg-white border-violet-200 border-2 rounded-3xl flex flex-col p-4 justify-end">
          <TypographyP text="소개시켜줄 친구와 열정만 가져오세요" className="font-bold"></TypographyP>
          <TypographyMuted text="아무사람대잔치에는 단 두 가지 준비물만 가지고 오시면 됩니다! 혹시 정말 데려올 친구가 없어 고민이라면 주최측에 문의해 주세요!"></TypographyMuted>
        </div>
        <div className="basis-3/4 flex flex-row gap-2 w-full h-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="basis-1/3 bg-white border-emerald-200 border-2 rounded-3xl w-full h-full flex flex-col items-center justify-center" >
              <SMILE />
            </div>
            <div className="basis-2/3 bg-white border-fuchsia-200 border-2 rounded-3xl w-full h-full p-4" >
              <TypographyP text="입장과 퇴장은 자유" className="font-bold"></TypographyP>
              <TypographyMuted text="파티룸에서 밤새 진행되지만, 늦게 오시거나 일찍 가셔도 돼요! 하지만 참가비를 할인하거나 돌려드릴 순 없어요 :("></TypographyMuted>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full h-full">
            <div className="basis-2/3 bg-white border-rose-200 border-2 rounded-3xl w-full h-full flex flex-col justify-between" >
              <div className="p-4">
                <TypographyP text="E 사람들만 있나요?" className="font-bold"></TypographyP>
                <TypographyMuted text="지금껏 매 회차 I 사람들도 3~40%의 참가율을 보여주고 있어요. 너무 겁먹지 마세요!!"></TypographyMuted>
              </div>
              <TEAM />
            </div>
            <div className="basis-1/3 bg-white border-cyan-200 border-2 rounded-3xl w-full h-full flex  flex-col justify-end p-4 " >
              <TypographyP text="뉴진스가 올 그날까지" className="font-bold"></TypographyP>
              <TypographyMuted text="암사대는 계속됩니다"></TypographyMuted>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLandingInfo