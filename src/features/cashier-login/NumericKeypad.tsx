import Button from './KeypadButton'

type NumericKeypadProps = {
  onDigit: (digit: string) => void
  onBackspace: () => void
  onSubmit: () => void
}

function NumericKeypad({
  onDigit,
  onBackspace,
  onSubmit,
}: NumericKeypadProps) {
  return (
    <div
      aria-label="PIN keypad"
      className="mx-auto grid w-full max-w-[426px] grid-cols-3 gap-1"
    >
      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
        <Button
          key={digit}
          aria-label={`Enter ${digit}`}
          onClick={() => onDigit(digit)}
        >
          {digit}
        </Button>
      ))}
      <Button variant="danger" aria-label="Delete last digit" onClick={onBackspace}>
        <svg viewBox="0 0 20 20" className="h-[22px] w-[22px]" fill="none">
          <path
            d="M7.5 4.5h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-8l-4-5.5 4-5.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m9 7.5 5 5m0-5-5 5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </Button>
      <Button aria-label="Enter 0" onClick={() => onDigit('0')}>
        0
      </Button>
      <Button variant="primary" aria-label="Sign in" onClick={onSubmit}>
        <svg viewBox="0 0 20 20" className="h-[24px] w-[24px]" fill="none">
          <path
            d="M11 3h4.5a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H11M3 10h10m0 0-3.5-3.5M13 10l-3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  )
}

export default NumericKeypad