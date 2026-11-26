type IconProps = {
  className?: string
}

export function IdCardIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6 1.5v3M10 1.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="5.5" cy="8" r="1.3" stroke="currentColor" strokeWidth="1.1" />
      <path d="M3.5 11.3c.4-.9 1.1-1.3 2-1.3s1.6.4 2 1.3M9.5 7.5h3M9.5 10h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function RegisterIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <rect x="4" y="1.5" width="8" height="4" rx=".8" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 7.5h11l.5 6.5H2l.5-6.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 5.5v2M5 10h1M7.5 10h1M10 10h1M5 12h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function UserIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <circle cx="8" cy="5" r="2.8" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 14.5c.6-2.6 2.8-4.2 5.5-4.2s4.9 1.6 5.5 4.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function NumbersIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <text x="8" y="10.4" textAnchor="middle" fontSize="6" fontWeight="600" fill="currentColor">
        123
      </text>
    </svg>
  )
}

export function ShieldIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <path d="M8 1.2 13.5 3v4.3c0 3.3-2.3 6-5.5 7.5-3.2-1.5-5.5-4.2-5.5-7.5V3L8 1.2Z" fill="currentColor" />
      <path d="M8 2.6v10.6c2.3-1.3 4-3.4 4-6V4L8 2.6Z" fill="white" fillOpacity=".35" />
    </svg>
  )
}

export function CashIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
      <rect x="4.5" y="5" width="13" height="8.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="9.25" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 7.5V15a1 1 0 0 0 1 1H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function EyeIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <rect x="1.5" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.8 8c1-1.6 2.4-2.4 4.2-2.4s3.2.8 4.2 2.4c-1 1.6-2.4 2.4-4.2 2.4S4.8 9.6 3.8 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
  )
}

export function InfoIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7.3v3.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="5" r=".85" fill="currentColor" />
    </svg>
  )
}

export function UserCheckIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
      <circle cx="8" cy="6" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 17c.5-3 2.7-4.8 5.5-4.8 1 0 1.9.2 2.7.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m12 15.5 2 2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowLeftIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <path d="M13 8H3m0 0 4-4M3 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronUpDownIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <path d="m5 6 3-3 3 3M5 10l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
