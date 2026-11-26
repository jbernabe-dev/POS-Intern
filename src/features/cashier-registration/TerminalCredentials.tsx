import Input from '../../components/Input'
import { NumbersIcon } from '../../components/icons'
import SectionTitle from './SectionTitle'

type TerminalCredentialsProps = {
  staffId: string
  pin: string
  confirmPin: string
  email: string
  onPinChange: (value: string) => void
  onConfirmPinChange: (value: string) => void
  onEmailChange: (value: string) => void
}

// Keeps only digits and limits the PIN to 4 characters.
function cleanPin(value: string) {
  return value.replace(/\D/g, '').slice(0, 4)
}

function TerminalCredentials({
  staffId,
  pin,
  confirmPin,
  email,
  onPinChange,
  onConfirmPinChange,
  onEmailChange,
}: TerminalCredentialsProps) {
  const pinClasses = 'text-center tracking-[6px] placeholder:text-[#9aa3ad]'

  return (
    <section>
      <SectionTitle icon={<NumbersIcon />}>2. Terminal Credentials</SectionTitle>

      <div className="mt-5 grid grid-cols-3 gap-4">
        <Input
          id="staff-id"
          label="Staff ID #"
          value={`#${staffId}`}
          readOnly
          className="bg-[#dde6fb] text-[18px] font-semibold"
          suffix={
            <span className="text-[13px] font-bold tracking-[0.5px] text-[#2d6a4f]">
              AUTO
            </span>
          }
          hint="Sequential system tag"
        />
        <Input
          id="pin"
          label="4-Digit Terminal PIN"
          type="password"
          inputMode="numeric"
          placeholder="••••"
          value={pin}
          onChange={(event) => onPinChange(cleanPin(event.target.value))}
          className={pinClasses}
          hint="Fast keypad unlocking"
        />
        <Input
          id="confirm-pin"
          label="Confirm 4-Digit PIN"
          type="password"
          inputMode="numeric"
          placeholder="••••"
          value={confirmPin}
          onChange={(event) => onConfirmPinChange(cleanPin(event.target.value))}
          className={pinClasses}
          hint="Re-enter verification PIN"
        />
      </div>

      <div className="mt-6">
        <Input
          id="email"
          label="Staff Email Address"
          type="email"
          placeholder="alex.m@swiftpos-station.internal"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          icon={<span className="text-[20px] leading-none">@</span>}
          hint="Automated end-of-shift Z-Reports and register drawer audit links will be dispatched here."
        />
      </div>
    </section>
  )
}

export default TerminalCredentials
