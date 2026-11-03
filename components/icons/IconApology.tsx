type IconProps = {
  className?: string;
};

export function IconApology({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 9.5h14a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-6.2L9 27v-3.5H8a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.5h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
