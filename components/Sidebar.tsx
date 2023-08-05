import Image from "next/image";
import { Place } from "@mui/icons-material";
import { Sidebar } from "@/models/View";
import Navbar from "./Navbar";

export default function Sidebar(props: Sidebar) {
  const location = props != null;

  return (
    <div className="flex flex-col justify-between h-full relative overflow-visible min-h-[600px]">
      <Navbar />
      <div className="flex flex-col justify-around text-center text-white-light h-[80%] ">
        <div className="flex justify-center items-center h-[50%] relative ">
          <Image
            src="/assets/images/Cloud-background.png"
            width={300}
            height={300}
            className="w-full  h-full absolute object-cover opacity-25 min-[400px]:object-contain floating"
            alt="Background Clouds"
            priority
          />
          <Image
            src={
              location ? props.weather.icon : "/assets/images/HeavyCloud.png"
            }
            placeholder="blur"
            blurDataURL={"/assets/images/HeavyCloud.png"}
            width={500}
            height={500}
            alt={location ? props.weather.description : "No location"}
            style={{
              width: "50%",
              height: "auto",
              maxWidth: "300px",
              minWidth: "180px",
            }}
            priority
          />
        </div>

        {location && (
          <div className="flex flex-col gap-3">
            <h1 className="text-7xl text-white">{`${props.weather.temperature}${props.weather.unit}`}</h1>
            <h1 className="text-3xl font-light">{props.weather.description}</h1>
          </div>
        )}
      </div>

      {location && (
        <div
          className={`flex flex-col items-center justify-center text-white-light text-base  pt-5 gap-3 pb-6 md:pb-14`}
        >
          <h1>Today • {props.date}</h1>
          <div className="flex flex-row items-center justify-center gap-3">
            <Place style={{ fontSize: "1.3rem" }} />
            <h1 className="font-semibold">{props.city}</h1>
          </div>
        </div>
      )}
    </div>
  );
}
