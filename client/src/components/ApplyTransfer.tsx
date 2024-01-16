import { useEffect, useState } from "react"
import { TypographyLarge, TypographyMuted, TypographyP, TypographySmall } from "./typography/typography"
import { Checkbox } from "./ui/checkbox"
import { FormLabel, FormDescription } from "./ui/form"
import { useToast } from "@/components/ui/use-toast"
import STRING from "@/constants/String"


type ApplyTransferType = {
  onChange: (value: boolean) => void
  title: string,
  text: string,
  subtext: string,
}

const ApplyTransfer = ({ onChange, title, text, subtext }: ApplyTransferType) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => {
    setIsChecked(!isChecked)
  }
  const { toast } = useToast();

  useEffect(() => {
    onChange(isChecked)
  }, [isChecked])

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(STRING.applyTransferText);
      toast({
        title: "복사가 완료되었어요!",
        description: "붙여넣기를 통해 계좌번호를 입력할 수 있어요",
      })
    } catch (error) {
      toast({
        title: "복사가 실패했어요 :(",
        description: "알 수 없는 이유로 복사가 되지 않았어요",
      })
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <TypographyLarge text={title} />
      <div className="space-y-6 w-full max-w-sm items-center gap-3">
        <div className="flex flex-row w-full items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
          <div className=" leading-none flex flex-col gap-2">
            <TypographyP text={text}/>
            <TypographySmall text={STRING.applyTransferText2} />
            <TypographyMuted text={subtext} onClick={handleCopyClipBoard} />
            <TypographyMuted text={STRING.applyTransferSubText2}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplyTransfer;