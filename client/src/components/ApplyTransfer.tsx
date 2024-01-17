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
      await navigator.clipboard.writeText(STRING.applyTransferCopy);
      toast({
        title: STRING.transferCopyComplete,
        description: STRING.transferCopyCompleteDescription,
      })
    } catch (error) {
      toast({
        title: STRING.transferCopyFail,
        description: STRING.transferCopyFailDescription,
      })
    }
  };

  return (
    <div className="grid w-full max-w-3xl items-center gap-3">
      <TypographyLarge text={title} />
      <div className="space-y-6 w-full max-w-3xl items-center gap-3">
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