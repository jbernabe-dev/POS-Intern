import { useState } from 'react'
import { IdCardIcon, RegisterIcon } from '../../components/icons'
import AuthLayout from '../../layouts/AuthLayout'
import FloatAssignment from './FloatAssignment'
import PermissionsForm, { type Permissions } from './PermissionsForm'
import PersonalInformation from './PersonalInformation'
import SetupSummary from './SetupSummary'
import TerminalCredentials from './TerminalCredentials'

type RegistrationPageProps = {
  onCancel: () => void
}

const steps = [
  { title: 'General Details', description: 'Identity & station clearance' },
  { title: 'Security PIN', description: 'Lockout credentials' },
  { title: 'Drawer Rules', description: 'Tender boundaries' },
]

function RegistrationPage({ onCancel }: RegistrationPageProps) {
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('Cashier')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [email, setEmail] = useState('')
  const [floatEnabled, setFloatEnabled] = useState(true)
  const [permissions, setPermissions] = useState<Permissions>({
    drawerOpen: true,
    discounts: false,
    salesSummary: true,
  })

  function completeRegistration() {
    // TODO: send the new staff profile to the backend once it exists.
    alert('Registration is not connected to a backend yet.')
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-[1128px]">
        <header className="flex items-start justify-between gap-6">
          <div>
            <p className="flex items-center gap-1.5 text-[15px] font-medium tracking-[1px] text-[#2d6a4f]">
              <IdCardIcon />
              IDENTITY &amp; ACCESS GATEWAY
            </p>
            <h1 className="mt-1 text-[30px] font-semibold leading-9 tracking-[-0.6px] text-[#14233e]">
              Register New Staff / Cashier
            </h1>
            <p className="mt-2 text-[17px] leading-6 text-[#3d4a42]">
              Add a team member to Terminal #01 or create a new store operator
              profile.
            </p>
          </div>

          <div className="mt-3 flex h-[53px] shrink-0 items-center gap-2.5 rounded-md bg-[#eef3ff] px-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9ef0c5] text-[#1b4d36]">
              <RegisterIcon />
            </span>
            <div>
              <p className="text-[13px] leading-4 text-[#3d4a42]">Target Unit</p>
              <p className="text-[15px] font-semibold leading-5 text-[#1b2a3a]">
                Terminal #TRM-0482
              </p>
            </div>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-[1fr_358px] items-start gap-6">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="rounded-lg bg-white p-9 shadow-[0_12px_30px_rgba(27,42,69,0.12)]"
          >
            <ol className="flex min-h-[92px] items-center justify-between gap-3 rounded-[4px] bg-[#eef3ff] px-4 py-4">
              {steps.map((step, index) => (
                <li key={step.title} className="flex items-center gap-3">
                  {index > 0 && <span className="mr-3 h-px w-5 bg-[#b7c0cc]" />}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[15px] font-semibold ${
                      index === 0
                        ? 'bg-[#2d6a4f] text-white'
                        : 'bg-[#dde6fb] text-[#1b2a3a]'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="max-w-[120px]">
                    <span className="block text-[15px] font-semibold leading-5 text-[#1b2a3a]">
                      {step.title}
                    </span>
                    <span className="block text-[13px] leading-4 text-[#3d4a42]">
                      {step.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-9">
              <PersonalInformation
                fullName={fullName}
                role={role}
                onFullNameChange={setFullName}
                onRoleChange={setRole}
              />
            </div>

            <div className="mt-9">
              <TerminalCredentials
                staffId="403"
                pin={pin}
                confirmPin={confirmPin}
                email={email}
                onPinChange={setPin}
                onConfirmPinChange={setConfirmPin}
                onEmailChange={setEmail}
              />
            </div>

            <div className="mt-9">
              <PermissionsForm permissions={permissions} onChange={setPermissions} />
            </div>

            <div className="mt-9">
              <FloatAssignment enabled={floatEnabled} onChange={setFloatEnabled} />
            </div>
          </form>

          <SetupSummary
            role={role}
            floatEnabled={floatEnabled}
            onComplete={completeRegistration}
            onCancel={onCancel}
          />
        </div>
      </div>
    </AuthLayout>
  )
}

export default RegistrationPage
