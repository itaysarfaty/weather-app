// Requirements
// Title - string
// Value - string
// Unit - string
// children - react node

interface HighlightProps {
  title: string;
  value: string;
  unit: string;
  children?: React.ReactNode;
}

export default function Highlight({
  title,
  value,
  unit,
  children,
}: HighlightProps) {
  return (
    <section className="flex flex-col gap-2 text-white bg-secondary w-full p-6 text-center @container rounded drop-shadow-2xl">
      <h1 className="text-md">{title}</h1>
      <h2 className="text-2xl @[170px]:text-3xl @[200px]:text-4xl @[250px]:text-5xl whitespace-nowrap">
        {`${value} `}
        <span className="text-sm @[200px]:text-2xl">{unit}</span>
      </h2>
      {children && (
        <div className="pt-3 h-full flex flex-col justify-center">
          {children}
        </div>
      )}
    </section>
  );
}
