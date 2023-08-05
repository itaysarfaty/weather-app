// Requirements
// Title - string
//  Icon - string
// min - string
// max - string
// unit - string

import { Forecast } from "@/models/View";
import Image from "next/image";

export default function Forecast({
  date,
  icon,
  temperature: { max, min, unit },
}: Forecast) {
  return (
    <div className="aspect-[0.7] w-full bg-secondary flex flex-col items-center text-white justify-around text-center @container rounded drop-shadow-2xl">
      <div className="w-full flex flex-col items-center relative">
        <Image
          src="/assets/images/Cloud-background.png"
          width={300}
          height={300}
          className="w-full h-full absolute opacity-5 object-cover top-4"
          alt="Background Clouds"
          priority
        />

        <h1 className="text-lg @[180px]:text-2xl">{date}</h1>
        <Image
          src={icon}
          alt="weather icon"
          height={100}
          width={100}
          style={{
            width: "70%",
            height: "auto",
          }}
        />
      </div>
      <div className="flex justify-around w-full px-2 text-lg @[180px]:text-2xl">
        <h1>
          {max}
          {unit}
        </h1>
        <h1 className="text-white-light">
          {min}
          {unit}
        </h1>
      </div>
    </div>
  );
}
