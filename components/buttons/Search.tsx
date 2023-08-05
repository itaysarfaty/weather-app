// Requirements
// onClick - function
// color - string
// variant - contained, outlined
// children - react node

interface ButtonProps {
  onClick: () => void;
}

export default function Search({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-[50px] px-4 bg-primary text-white text-sm rounded whitespace-nowrap`}
    >
      Search
    </button>
  );
}
