import storeLocation from '../../assets/store-location.png'
import {
  ArrowLeftIcon,
  EyeIcon,
  InfoIcon,
  UserCheckIcon,
} from '../../components/icons'

type SetupSummaryProps = {
  role: string
  floatEnabled: boolean
  onComplete: () => void
  onCancel: () => void
}

function SetupSummary({ role, floatEnabled, onComplete, onCancel }: SetupSummaryProps) {
  return (
    <aside className="self-start rounded-lg bg-white px-6 pb-8 pt-6 shadow-[0_12px_30px_rgba(27,42,69,0.12)]">
      <div className="flex items-center justify-between">
        <h2 className="text-[13px] font-medium tracking-[0.8px] text-[#1b2a3a]">
          LIVE SETUP SUMMARY
        </h2>
        <EyeIcon className="h-4 w-4 text-[#2d6a4f]" />
      </div>

      {/* The store name text is already part of this image. */}
      <img
        src={storeLocation}
        alt="Store Location: Downtown Flagship, POS #01"
        className="mt-6 h-[158px] w-full rounded-[4px] object-cover"
      />

      <dl className="mt-4 space-y-1.5 rounded-[4px] bg-[#eef3ff] p-[18px] text-[15px] leading-6 text-[#3d4a42]">
        <div className="flex items-center justify-between">
          <dt>Session Status</dt>
          <dd className="text-[13px] font-bold tracking-[0.5px] text-[#2d6a4f]">
            READY TO ARM
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Opening Cash Float</dt>
          <dd className="text-[20px] font-bold text-[#1b2a3a]">
            {floatEnabled ? '$200.00' : '$0.00'}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Assigned Role</dt>
          <dd className="font-semibold text-[#1b2a3a]">{role}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Hardware Port</dt>
          <dd className="text-[#1b2a3a]">USB-COM4 (Drawer #1)</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-[4px] bg-[#eef3ff] p-[18px]">
        <h3 className="flex items-center gap-1.5 text-[15px] font-semibold leading-5 text-[#1b2a3a]">
          <InfoIcon />
          Intern Quick Guide
        </h3>
        <p className="mt-1.5 text-[15px] leading-[25px] text-[#3d4a42]">
          Pins are stored encrypted in the local flash module. Operators can
          sign out instantly using the top right status bar icon during shift
          switch.
        </p>
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="mt-5 flex h-[62px] w-full items-center justify-center gap-2 rounded-[4px] bg-[#2d6a4f] text-[15px] font-semibold text-white hover:bg-[#245a42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
      >
        <UserCheckIcon className="h-5 w-5" />
        Complete Registration &amp; Start Shift
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="mx-auto mt-4 flex items-center gap-1.5 text-[13px] text-[#1b2a3a] hover:text-[#2d6a4f]"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Cancel &amp; Return to Staff Login
      </button>
    </aside>
  )
}

export default SetupSummary
