type IconProps = {
  className?: string;
};

export function IconGiving({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 20c3-1 5.5.5 7 3M26 20c-3-1-5.5.5-7 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 14c0-4 2.4-7 6-7s6 3 6 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 22.5c2.2 3 5 4.5 8 4.5s5.8-1.5 8-4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
