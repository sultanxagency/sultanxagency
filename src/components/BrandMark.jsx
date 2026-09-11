export default function BrandMark({ size = 40, animated = false, className = '' }) {
  return (
    <svg
      className={`brand-mark ${animated ? 'brand-mark-animated' : ''} ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sultan X Agency mark"
    >
      <circle cx="32" cy="32" r="30.5" stroke="var(--border-strong)" strokeWidth="1" />
      <path
        className="brand-mark-x"
        d="M20 20 L44 44 M44 20 L20 44"
        stroke="var(--gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
