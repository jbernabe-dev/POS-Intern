import type { ReactNode } from 'react'
import swiftPosLogo from '../assets/Container.png'

type AuthLayoutProps = {
  children: ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f7f8ff] text-[#233144]">
      <header className="absolute inset-x-0 top-0 z-10 flex h-[72px] items-center justify-between px-4 sm:px-6">
        <img
          src={swiftPosLogo}
          alt="SwiftPOS"
          className="h-9 w-[132px] object-contain object-left"
        />
        <div className="flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-1.5 text-[13px] font-medium tracking-[1px] text-[#3d4a42]">
          <span className="h-2 w-2 rounded-full bg-[#00845f]" />
          ONLINE
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-[88px] sm:px-6">
        {children}
      </main>

      <footer className="absolute inset-x-0 bottom-0 flex min-h-14 items-center justify-between gap-3 px-4 pb-3 text-[13px] text-[#3d4a42] sm:px-6">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 text-[#00845f]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 1.5 9.5 3l2.1-.1.4 2.1 1.8 1.1-.8 2 .8 2-1.8 1.1-.4 2.1-2.1-.1L8 14.5l-1.5-1.4-2.1.1-.4-2.1-1.8-1.1.8-2-.8-2L4 4.9l.4-2.1 2.1.1L8 1.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="m6 8 1.3 1.3L10 6.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>SwiftPOS v2.4 · Terminal Station Auth</span>
        </div>
        <div className="flex items-center gap-5 whitespace-nowrap">
          <span>Terminal ID: #TRM-0482</span>
          <span>Gateway: Live</span>
        </div>
      </footer>
    </div>
  )
}

export default AuthLayout