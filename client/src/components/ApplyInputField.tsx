import STRING from "../constants/String";

type ApplyInputFieldProps = {
  title: string;
  name: string
  placeholder: string;
  value: string;
  isError: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApplyInputField = ({ title, name, placeholder, value, isError, handleChange }: ApplyInputFieldProps) => {
  if (isError) {
    return (
      <div>
        <div className='py-2'>
          <div className='text-m font-medium text-rose-500'>
            {title}
          </div>
        </div>
        <input
          className="border-2 border-rose-500 h-12 rounded-lg p-4 w-full text-sm font-medium"
          type="text"
          name={name}
          id={title}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <div className="text-rose-500">
          {STRING.applyInputErrorPrefix}{title}{STRING.applyInputErrorSuffix}
        </div>
      </div>
    )
  }
  return (<div>
    <div className='py-2'>
      <div className='text-m font-medium text-stone-800'>
        {title}
      </div>
    </div>
    <input
      className="border-2 h-12 rounded-lg p-4 w-full text-sm font-medium"
      type="text"
      name={name}
      id={title}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  </div>
  )
}
export default ApplyInputField