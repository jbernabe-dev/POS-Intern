import type { StaffMember } from "../../types/cashier";

type StaffSelectorProps = {
  staff: StaffMember[];
  selectedId: StaffMember["id"];
  onSelect: (staff: StaffMember) => void;
};

function StaffSelector({ staff, selectedId, onSelect }: StaffSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {staff.map((member) => {
        const selected = member.id === selectedId;
        const isManager = member.accessLevel !== undefined;

        return (
          <button
            key={member.id}
            type="button"
            aria-pressed={selected}
            aria-label={`Select ${member.name}${member.staffNumber ? `, number ${member.staffNumber}` : `, ${member.accessLevel}`}`}
            onClick={() => onSelect(member)}
            className={`flex min-h-[40px] items-center gap-1.5 rounded-[4px] px-1 py-1 pr-1.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#007653] ${
              selected
                ? "bg-[#e4efff] ring-1 ring-[#d2e2ff]"
                : "bg-[#f0f3fb] hover:bg-[#e5eafa]"
            }`}
          >
            <span
              className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
                isManager
                  ? "bg-[#00845f] text-white"
                  : selected
                    ? "bg-[#007653] text-white"
                    : "bg-[#dce4fb] text-[#253451]"
              }`}
              aria-hidden="true"
            >
              {isManager ? (
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                  <path
                    d="M8 1.5 13 3.3v3.8c0 3.1-2 5.7-5 7.4-3-1.7-5-4.3-5-7.4V3.3L8 1.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m6 7.8 1.3 1.3L10.3 6"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                member.initials
              )}
            </span>
            <span className="flex min-w-0 flex-col leading-[14px]">
              <span className="whitespace-nowrap text-[13px] font-semibold text-[#243248]">
                {member.name}
              </span>
              <span className="whitespace-nowrap text-[13px] text-[#536171]">
                {member.staffNumber
                  ? `#${member.staffNumber}`
                  : member.accessLevel}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default StaffSelector;
