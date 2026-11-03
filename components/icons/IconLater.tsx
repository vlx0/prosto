type IconProps = {
  className?: string;
};

export function IconLater({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 9h16M8 16h16M8 23h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="23" cy="23" r="2.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
