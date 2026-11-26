import { CashIcon } from '../../components/icons'

type FloatAssignmentProps = {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

function FloatAssignment({ enabled, onChange }: FloatAssignmentProps) {
  return (
    <section className="flex min-h-[100px] items-center gap-4 rounded-[4px] bg-[#eef3ff] px-[18px] py-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-[#dde6fb] text-[#3d4a42]">
        <CashIcon className="h-5 w-5" />
      </span>

      <div className="flex-1">
        <h2 className="text-[15px] font-semibold leading-5 text-[#1b2a3a]">
          Initial Float Assignment
        </h2>
        <p className="max-w-[420px] text-[15px] leading-[22px] text-[#3d4a42]">
          Allocate standardized morning cash drawer float ($200.00) immediately
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Initial float assignment"
        onClick={() => onChange(!enabled)}
        className={`relative h-[26px] w-[53px] shrink-0 rounded-full transition-colors ${
          enabled ? 'bg-[#2d6a4f]' : 'bg-[#c5cede]'
        }`}
      >
        <span
          className={`absolute top-[3px] h-5 w-5 rounded-full bg-white transition-all ${
            enabled ? 'left-[30px]' : 'left-[3px]'
          }`}
        />
      </button>
    </section>
  )
}

export default FloatAssignment
