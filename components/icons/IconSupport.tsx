type IconProps = {
  className?: string;
};

export function IconSupport({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="11" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="21" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6.5 24c.6-3.4 3.2-5.5 6.5-5.5 2 0 3.7.8 4.9 2.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.5 21.2c.9-1.4 2.4-2.2 4.2-2.2 3 0 5.3 2 5.8 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
