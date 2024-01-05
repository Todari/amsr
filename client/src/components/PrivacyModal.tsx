import AmsrButton from "./AmsrButton";

type PrivacyModalProp = {
  changeOpen: () => void
}

const PrivacyModal = (changeOpen: PrivacyModalProp) => {
  return (
    <div className="flex fixed inset-0 z-20 w-screen h-screen bg-stone-800 bg-opacity-50 items-center justify-center">
      <div className="z-30 h-3/4 w-5/6 rounded-3xl bg-white max-w-2xl max-h-[720px]">
        <div className="h-full flex flex-col py-16 px-8 items-center">
          <div className="font-BMDOHYUN text-stone-800 text-center">
            개인정보 제공동의
          </div>
          <div className='grow flex flex-col gap-8 py-8 max-w-sm'>
            <div className="text-stone-800">
              아무사람대잔치는 개인정보보호법 제 15조 및 제 22조에 따라 참가자 여러분들의 동의를 얻고자 합니다.
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-stone-800">
                1. 개인정보 수집 및 이용 목적
              </div>
              <div className="text-stone-800">
                - 행사 관련 업무 및 관련 안내
              </div>
              <div className="text-stone-800">
                2. 수집하는 개인정보 항목
              </div>
              <div className="text-stone-800">
                - 성명, 휴대전화 번호, 계좌번호
              </div>
              <div className="text-stone-800">
                3. 보유 및 이용 기간
              </div>
              <div className="text-stone-800">
                - 행사 후 즉시 폐기
              </div>
            </div>
            <div className="text-stone-800">
              개인정보 제공에 동의한다면, 동의 버튼을 체크해 주세요!
            </div>
          </div>
          <AmsrButton title={'닫기'} disabled={false} onClick={changeOpen} />
        </div>
      </div>
    </div>
  )
}

export default PrivacyModal;