import type { InputHTMLAttributes, ReactNode } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  icon?: ReactNode
  suffix?: ReactNode
}

function Input({ label, hint, icon, suffix, id, className = '', ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[15px] font-semibold leading-5 text-[#1b2a3a]">
        {label}
      </label>

      <div className="relative mt-2">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1b2a3a]">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`h-[53px] w-full rounded-[4px] bg-[#eef3ff] px-4 text-[17px] text-[#1b2a3a] outline-none placeholder:text-[#7b8591] focus:ring-2 focus:ring-[#2d6a4f] ${icon ? 'pl-11' : ''} ${className}`}
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">{suffix}</span>
        )}
      </div>

      {hint && <p className="mt-2 text-[13px] leading-[18px] text-[#3d4a42]">{hint}</p>}
    </div>
  )
}

export default Input
