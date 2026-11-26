import type { ReactNode } from 'react'

type SectionTitleProps = {
  icon: ReactNode
  children: ReactNode
}

function SectionTitle({ icon, children }: SectionTitleProps) {
  return (
    <h2 className="flex items-center gap-1.5 text-[15px] font-semibold leading-5 text-[#2d6a4f]">
      {icon}
      {children}
    </h2>
  )
}

export default SectionTitle
