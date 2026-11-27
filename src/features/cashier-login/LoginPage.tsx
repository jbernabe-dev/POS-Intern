import { useCallback, useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import type { StaffMember } from '../../types/cashier'
import NumericKeypad from './NumericKeypad'
import PinDisplay from './PinDisplay'
import StaffSelector from './StaffSelector'

const staffMembers: StaffMember[] = [
  { id: 'alex', name: 'Alex M.', initials: 'AM', staffNumber: '402' },
  { id: 'marcus', name: 'Marcus T.', initials: 'MT', staffNumber: '108' },
  { id: 'sarah', name: 'Sarah K.', initials: 'SK', staffNumber: '315' },
  { id: 'manager', name: 'Manager', initials: 'M', accessLevel: 'Level 2' },
]

type LoginPageProps = {
  onRegister: () => void
}

function LoginPage({ onRegister }: LoginPageProps) {
  const [selectedStaff, setSelectedStaff] = useState(staffMembers[0])
  const [pin, setPin] = useState('')
  const [notice, setNotice] = useState('')

  const appendDigit = useCallback((digit: string) => {
    setNotice('')
    setPin((currentPin) =>
      currentPin.length < 4 ? `${currentPin}${digit}` : currentPin,
    )
  }, [])

  const removeDigit = useCallback(() => {
    setNotice('')
    setPin((currentPin) => currentPin.slice(0, -1))
  }, [])

  const submitPin = useCallback(() => {
    if (pin.length !== 4) {
      setNotice('Enter your 4-digit PIN to continue.')
      return
    }

    setNotice('Sign-in is unavailable until an authentication service is connected.')
  }, [pin])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (/^\d$/.test(event.key)) {
        event.preventDefault()
        appendDigit(event.key)
      } else if (event.key === 'Backspace') {
        event.preventDefault()
        removeDigit()
      } else if (event.key === 'Enter') {
        event.preventDefault()
        submitPin()
      } else if (event.key === 'F12') {
        event.preventDefault()
        setNotice('Manager override sign-in is not configured yet.')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [appendDigit, removeDigit, submitPin])

  function selectStaff(staff: StaffMember) {
    setSelectedStaff(staff)
    setPin('')
    setNotice('')
  }

  function showUnavailableMessage(method: string) {
    setNotice(`${method} sign-in is not configured yet.`)
  }

  return (
    <AuthLayout>
      <div className="flex w-full max-w-[638px] flex-col">
        <section
          aria-labelledby="staff-sign-in-title"
          className="w-full rounded-lg bg-white px-9 pb-9 pt-9 shadow-[0_12px_30px_rgba(27,42,69,0.12)]"
        >
          <div className="flex justify-center">
            <span className="inline-flex h-[26px] items-center gap-1.5 rounded-full bg-[#eef3ff] px-4 text-[13px] font-medium text-[#3d4a42]">
              <span className="h-2 w-2 rounded-full bg-[#00845f]" />
              Terminal #01 · Online
            </span>
          </div>

          <h1
            id="staff-sign-in-title"
            className="mt-3 text-center text-[30px] font-semibold leading-9 tracking-[-0.6px] text-[#14233e]"
          >
            Staff Sign In
          </h1>
          <p className="mx-auto mt-2 max-w-[520px] text-center text-[15px] leading-[22px] text-[#3d4a42]">
            Enter your 4-digit Cashier PIN or select your staff profile to
            unlock the terminal.
          </p>

          <div className="mt-8 flex items-center justify-between gap-2">
            <h2 className="text-[13px] font-medium leading-4 tracking-[0.8px] text-[#3d4a42]">
              ACTIVE SHIFT PERSONNEL
            </h2>
            <span className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-[#007653]">
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" />
                <path
                  d="M5.5 8h5M8 5.5c1.7 1.6 1.7 3.4 0 5M8 5.5c-1.7 1.6-1.7 3.4 0 5"
                  stroke="currentColor"
                  strokeWidth=".8"
                />
              </svg>
              RFID Ready
            </span>
          </div>
          <div className="mt-2">
            <StaffSelector
              staff={staffMembers}
              selectedId={selectedStaff.id}
              onSelect={selectStaff}
            />
          </div>

          <div className="mt-7">
            <PinDisplay staff={selectedStaff} pin={pin} message={notice} />
          </div>

          <div className="mt-7">
            <NumericKeypad
              onDigit={appendDigit}
              onBackspace={removeDigit}
              onSubmit={submitPin}
            />
          </div>

          <div className="mt-9 flex items-center justify-between gap-2 text-[13px] leading-5 text-[#3d4a42]">
            <button
              type="button"
              onClick={() => showUnavailableMessage('Email and password')}
              className="flex items-center gap-1 whitespace-nowrap hover:text-[#007653] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#007653]"
            >
              <span className="text-[16px] leading-none" aria-hidden="true">
                @
              </span>
              Log in with Email &amp; Password
            </button>
            <button
              type="button"
              onClick={() => showUnavailableMessage('RFID')}
              className="flex items-center gap-1 whitespace-nowrap hover:text-[#007653] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#007653]"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="2.5"
                  y="2"
                  width="11"
                  height="12"
                  rx="1.5"
                  stroke="currentColor"
                />
                <path
                  d="M5 5h6M5 8h2m2-.5a2.5 2.5 0 0 1 0 5m-2-4a1.5 1.5 0 0 1 0 3"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
              Scan Staff RFID / Badge
            </button>
          </div>

          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={onRegister}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold leading-5 text-[#007653] hover:text-[#005d40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#007653]"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 13.5v-1a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1M8.5 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.5 13.5v-1a2 2 0 0 1 1.8-2m.2-7a2 2 0 0 0 0 3.9"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
              New staff or store onboarding? Register / Setup Cashier
            </button>
          </div>

          <div className="mt-6 flex min-h-[26px] items-center justify-center rounded-sm bg-[#eef3ff] px-3 text-center text-[13px] leading-4 text-[#3d4a42]">
            Need Manager Override? Press{' '}
            <kbd className="mx-1.5 rounded bg-[#e1eaff] px-1.5 py-0.5 font-sans text-[12px] font-medium text-[#14233e]">
              F12
            </kbd>
            or{' '}
            <button
              type="button"
              onClick={() => showUnavailableMessage('Manager override')}
              className="ml-1 font-medium text-[#007653] underline hover:text-[#005d40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#007653]"
            >
              click here
            </button>
          </div>
        </section>

        <div className="mt-5 flex items-center justify-between gap-3 px-1 text-[13px] leading-5 text-[#3d4a42]">
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#00845f]" />
            <span className="truncate">
              Peripheral Sync: Cash Drawer, Epson TM-T88VI, Honeywell 1900G
            </span>
          </span>
          <span className="shrink-0 font-mono text-[11px] tracking-[1px]">
            ENC: TLS-1.3
          </span>
        </div>
      </div>
    </AuthLayout>
  )
}

export default LoginPage