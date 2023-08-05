// Requirements
// Humidity percentage
export default function Humidity({ humidity }: { humidity: number }) {
  return (
    <div className="w-[80%] h-2 bg-white-light mx-auto rounded-full overflow-hidden">
      <div
        className="bg-primary h-full"
        style={{
          width: `${humidity}%`,
        }}
      ></div>
    </div>
  );
}
