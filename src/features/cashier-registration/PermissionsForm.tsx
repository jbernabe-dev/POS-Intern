import { ShieldIcon } from '../../components/icons'
import SectionTitle from './SectionTitle'

export type Permissions = {
  drawerOpen: boolean
  discounts: boolean
  salesSummary: boolean
}

type PermissionsFormProps = {
  permissions: Permissions
  onChange: (permissions: Permissions) => void
}

const options: { key: keyof Permissions; title: string; description: string }[] = [
  { key: 'drawerOpen', title: 'Drawer Open', description: 'Pop drawer without sale tender' },
  { key: 'discounts', title: 'Discounts > 10%', description: 'Override promotional discount limits' },
  { key: 'salesSummary', title: 'Sales Summary', description: 'Inspect end-of-day register totals' },
]

function PermissionsForm({ permissions, onChange }: PermissionsFormProps) {
  return (
    <section>
      <SectionTitle icon={<ShieldIcon />}>
        3. Register Permissions &amp; Drawer Access
      </SectionTitle>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {options.map((option) => (
          <label
            key={option.key}
            className="flex min-h-[92px] cursor-pointer gap-2 rounded-[4px] bg-[#eef3ff] px-[18px] py-4"
          >
            <input
              type="checkbox"
              checked={permissions[option.key]}
              onChange={(event) =>
                onChange({ ...permissions, [option.key]: event.target.checked })
              }
              className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#2d6a4f]"
            />
            <span>
              <span className="block text-[15px] font-semibold leading-5 text-[#1b2a3a]">
                {option.title}
              </span>
              <span className="block text-[13px] leading-[18px] text-[#3d4a42]">
                {option.description}
              </span>
            </span>
          </label>
        ))}
      </div>
    </section>
  )
}

export default PermissionsForm
