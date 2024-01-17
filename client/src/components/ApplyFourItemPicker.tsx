import { useEffect, useState } from "react"
import ApplySelectButton from "./ApplySelectButton";
import { Label } from "@radix-ui/react-label";
import { TypographyLarge } from "./typography/typography";

type ApplyFourItemPickerProp = {
  title: string,
  items: string[],
  onChange: (value: number) => void
}

const ApplyFourItemPicker = ({ title, items, onChange }: ApplyFourItemPickerProp) => {
  const [item, setItem] = useState<number>(0);
  useEffect(() => {
    onChange(item);
  }, [item])

  return (
    <div className='grid w-full max-w-3xl items-center gap-3' >
      <TypographyLarge text={title} />

      <div className='grid grid-cols-2 gap-4'>
        <div className='grow'>
          <div onClick={() => setItem(0)}>
            <ApplySelectButton prop={items[0]} active={item === 0} />
          </div>
        </div>
        <div className='grow'>
          <div onClick={() => setItem(1)}>
            <ApplySelectButton prop={items[1]} active={item === 1} />
          </div>
        </div>
        <div className='grow'>
          <div onClick={() => setItem(2)}>
            <ApplySelectButton prop={items[2]} active={item === 2} />
          </div>
        </div>
        <div className='grow'>
          <div onClick={() => setItem(3)}>
            <ApplySelectButton prop={items[3]} active={item === 3} />
          </div>
        </div>
      </div>
    </div>
  )

  {/* <div className='py-2'>
        <div className='text-sm font-medium text-stone-600 font-BMDOHYUN'>
          {title}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='grow'>
          <div onClick={() => setItem(0)}>
            <ApplySelectButton prop={items[0]} active={item === 0} />
          </div>
        </div>
        <div className='grow'>
          <div onClick={() => setItem(1)}>
            <ApplySelectButton prop={items[1]} active={item === 1} />
          </div>
        </div>
        <div className='grow'>
          <div onClick={() => setItem(2)}>
            <ApplySelectButton prop={items[2]} active={item === 2} />
          </div>
        </div>
        <div className='grow'>
          <div onClick={() => setItem(3)}>
            <ApplySelectButton prop={items[3]} active={item === 3} />
          </div>
        </div>
      </div>
    </div>
    ) */}
}
export default ApplyFourItemPicker