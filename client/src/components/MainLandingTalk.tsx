import MainLandingTalkAvatar from "./MainLandingTalkAvatar"

const MainLandingTalk = () => {

  return (
    <div className="snap-always bg-neutral-800 snap-center w-full h-[100dvh] flex flex-col items-center justify-center pt-20 p-4">
      <div className="w-full h-fit max-w-3xl flex flex-col gap-0">
        <MainLandingTalkAvatar opponent={false} name={"민지"} text="민지야 감이 암사대 ㄱㄱ" />
        <MainLandingTalkAvatar opponent={true} name={"하니"} text="그게 머임?" />
        <MainLandingTalkAvatar opponent={false} name={"민지"}
        text="아무사람대잔치라고 하는 파티인데"
        text2="서로 친구 데려가서 소개시켜주고 진짜 아무나 모이는 파티야"/>
        <MainLandingTalkAvatar opponent={true} name={"하니"}
        text="오 재밌겠다 전에 너가 말하던 해린?"
        text2="걔도 거기서 만난거 아냐??"/>
        <MainLandingTalkAvatar opponent={false} name={"민지"}
        text="맞아 ㅋㅋ파티룸 빌려서 밤새 노는데"
        text2="전에 갔을땐 막 퀴즈랑 이벤트도 하고"
        text3="확실히 새로운 친구 만들기 좋더라"/>
        <MainLandingTalkAvatar opponent={true} name={"하니"} text="나 하니인데 개추눌렀다" />
        <MainLandingTalkAvatar opponent={false} name={"민지"} text="우리 하니 그런말투 안써요" />
      </div>
    </div>

  )
}

export default MainLandingTalk