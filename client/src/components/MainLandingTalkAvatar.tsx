import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TypographyP, TypographySmall } from "./typography/typography"
import { twMerge } from "tailwind-merge"

type MainLandingTalkAvatarProps = {
  opponent: boolean,
  name: string,
  text: string,
  text2?: string,
  text3?: string,
}

const MainLandingTalkAvatar = ({ opponent, name, text, text2, text3 }: MainLandingTalkAvatarProps) => {

  return (

    <div className={twMerge("flex gap-2", opponent ? "flex" : "flex-row-reverse")}>
      <div className={twMerge("rounded-full flex flex-col w-8 h-8 aspect-square bg-contain", opponent ? "bg-avatar-1" : "bg-avatar-2")} />
      <div className={twMerge("flex flex-col gap-2", opponent ? "items-start" : "items-end")}>
        <TypographySmall text={name} className="text-neutral-400" />
        <div className={twMerge("flex p-3 rounded-lg max-w-[230px]", opponent ? "bg-neutral-700 " : "bg-yellow-300")}>
          <TypographySmall text={text} className={opponent ? "text-white" : "text-neutral-900"} />
        </div>
        {text2 ?
          <div className={twMerge("flex p-3 rounded-lg max-w-[230px]", opponent ? "bg-neutral-700 " : "bg-yellow-300")}>
            <TypographySmall text={text2} className={opponent ? "text-white" : "text-neutral-900"} />
          </div> : null}
        {text3 ?
          <div className={twMerge("flex p-3 rounded-lg max-w-[230px]", opponent ? "bg-neutral-700 " : "bg-yellow-300")}>
            <TypographySmall text={text3} className={opponent ? "text-white" : "text-neutral-900"} />
          </div> : null}
      </div>
    </div>
  )
}

export default MainLandingTalkAvatar