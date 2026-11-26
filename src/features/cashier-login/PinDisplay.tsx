import type { StaffMember } from "../../types/cashier";

type PinDisplayProps = {
  staff: StaffMember;
  pin: string;
  message: string;
};

function PinDisplay({ staff, pin, message }: PinDisplayProps) {
  const staffIdentity = staff.staffNumber
    ? `${staff.name} (#${staff.staffNumber})`
    : `${staff.name} (${staff.accessLevel})`;

  return (
    <section
      aria-label="PIN entry status"
      className="flex min-h-[119px] flex-col items-center justify-center rounded-lg bg-[#eef3ff] px-4 py-5 text-center"
    >
      <p aria-live="polite" className="text-[13px] leading-5 text-[#3d4a42]">
        {message || (
          <>
            Authenticating:{" "}
            <span className="font-semibold text-[#243248]">
              {staffIdentity}
            </span>
          </>
        )}
      </p>
      <div
        className="mt-3 flex h-4 items-center gap-[19px]"
        role="img"
        aria-label={`${pin.length} of 4 PIN digits entered`}
      >
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={`h-4 w-4 rounded-full ${
              index < pin.length ? "bg-[#087653]" : "bg-[#e2ebff]"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-[13px] leading-5 text-[#3d4a42]">
        Tap keypad or use keyboard
      </p>
    </section>
  );
}

export default PinDisplay;
