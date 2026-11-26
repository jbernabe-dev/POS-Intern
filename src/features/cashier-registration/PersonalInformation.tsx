import Input from '../../components/Input'
import { ChevronUpDownIcon, UserIcon } from '../../components/icons'
import SectionTitle from './SectionTitle'

type PersonalInformationProps = {
  fullName: string
  role: string
  onFullNameChange: (value: string) => void
  onRoleChange: (value: string) => void
}

const roles = ['Cashier', 'Senior Cashier', 'Supervisor', 'Manager']

function PersonalInformation({
  fullName,
  role,
  onFullNameChange,
  onRoleChange,
}: PersonalInformationProps) {
  return (
    <section>
      <SectionTitle icon={<UserIcon />}>1. Personal Information</SectionTitle>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Input
          id="full-name"
          label="Full Legal Name"
          placeholder="e.g. Alex Morgan"
          value={fullName}
          onChange={(event) => onFullNameChange(event.target.value)}
          hint="Name will print on register receipts and audit trails."
        />

        <div>
          <label htmlFor="role" className="block text-[15px] font-semibold leading-5 text-[#1b2a3a]">
            Role Assignment
          </label>
          <div className="relative mt-2">
            <select
              id="role"
              value={role}
              onChange={(event) => onRoleChange(event.target.value)}
              className="h-[53px] w-full appearance-none rounded-[4px] bg-[#eef3ff] px-4 text-[17px] text-[#1b2a3a] outline-none focus:ring-2 focus:ring-[#2d6a4f]"
            >
              {roles.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronUpDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1b2a3a]" />
          </div>
          <p className="mt-2 text-[13px] leading-[18px] text-[#3d4a42]">
            Determines baseline discount tiers and void rights.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PersonalInformation
