import { useEffect, useState } from "react"
import { TypographyLarge, TypographyMuted, TypographyP, TypographySmall } from "./typography/typography"
import { Checkbox } from "./ui/checkbox"
import { FormLabel, FormDescription } from "./ui/form"
import { useToast } from "@/components/ui/use-toast"
import STRING from "@/constants/String"
import { CopyToClipboard } from "react-copy-to-clipboard"

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

  // const handleCopyClipBoard = async () => {
  //   try {
  //     // await navigator.clipboard.writeText(STRING.applyTransferCopy);
  //     toast({
  //       title: STRING.transferCopyComplete,
  //       description: STRING.transferCopyCompleteDescription,
  //     })
  //   } catch (error) {
  //     toast({
  //       title: STRING.transferCopyFail,
  //       description: STRING.transferCopyFailDescription,
  //     })
  //   }
  // };

  return (
    <div className="grid w-full max-w-3xl items-center gap-3">
      <TypographyLarge text={title} />
      <div className="space-y-6 w-full max-w-3xl items-center gap-3">
        <div className="flex flex-col w-full items-start space-y-0 rounded-md border py-4 px-6 shadow gap-3">
          <div className=" leading-none flex flex-col gap-1">
            <TypographyP text={text} />
            <TypographySmall text={STRING.applyTransferText2} />
          </div>
          <div className=" leading-none flex flex-col gap-1">
            <CopyToClipboard
              text={STRING.applyTransferCopy}
              onCopy={() => toast({
                title: STRING.transferCopyComplete,
                description: STRING.transferCopyCompleteDescription,
              })}>
              <TypographyMuted text={subtext} />
            </CopyToClipboard>
            <TypographyMuted text={STRING.applyTransferSubText2} />
          </div>
        </div>
      </div>
    </div >
  )
}

export default ApplyTransfer;