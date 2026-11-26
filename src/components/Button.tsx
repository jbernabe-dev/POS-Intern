import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'keypad' | 'danger' | 'primary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  keypad:
    'bg-[#eef3ff] text-[#14233e] hover:bg-[#e2eaff] focus-visible:outline-[#087655]',
  danger:
    'bg-[#ffd9d6] text-[#b42318] hover:bg-[#ffc9c5] focus-visible:outline-[#b42318]',
  primary:
    'bg-[#007653] text-white hover:bg-[#006346] focus-visible:outline-[#007653]',
}

function Button({
  variant = 'keypad',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex h-[62px] w-full items-center justify-center rounded-[4px] text-[20px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}

export default Button