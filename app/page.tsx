import Navbar from "@/components/Navbar";
import NoLocation from "@/components/NoLocaiton";
import Sidebar from "@/components/Sidebar";
import Forecast from "@/components/cards/Forecast";
import Highlight from "@/components/cards/Highlight";
import Humidity from "@/components/features/Humidity";
import Wind from "@/components/features/Wind";
import { CustomError, NewError, isError } from "@/models/Error";
import { CoordParams, SearchParams } from "@/models/SearchParams";
import { View, formatWeather as format } from "@/models/View";
import { headers } from "next/headers";

type FetchResponse = View | CustomError;
async function getData(
  host: string | null,
  params?: CoordParams
): Promise<FetchResponse> {
  if (!params || !params?.lat || !params?.lon || !host) {
    return NewError("Invalid params", 404);
  }

  const lat = parseFloat(params.lat);
  const lon = parseFloat(params.lon);

  const url = `${host}/api/weather?lat=${lat}&lon=${lon}`;
  const res = await fetch(url, {
    cache: "no-cache",
  });

  // Recommendation: handle errors
  if (!res.ok) {
    const error = await res.text();
    // This will activate the closest `error.js` Error Boundary
    return NewError("Invalid params", 404);
  }

  const weather = await res.json();

  return format(weather) as View;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: CoordParams;
}) {
  const headersList = headers();

  const domain = headersList.get("x-forwarded-host") || "";
  const protocol = headersList.get("x-forwarded-proto") || "";
  const host = `${protocol}://${domain}`;
  const view = await getData(host, searchParams);

  if (isError(view)) {
    return <NoLocation />;
  }

  return (
    // Center items on screen
    <div className="flex flex-col  md:flex-row">
      <div className="bg-secondary h-screen md:w-[450px] overflow-scroll ">
        <Sidebar {...view.sidebar} />
      </div>
      <main className="bg-primary h-full flex-grow md:h-screen p-14 overflow-y-auto flex flex-col justify-between gap-12">
        <div className="container mx-auto h-fit w-ful flex flex-col justify-center @container gap-12">
          <section className="grid gap-8 grid-cols-1 @[250px]:grid-cols-2  @[500px]:grid-cols-3 @[600px]:grid-cols-4  @[700px]:grid-cols-5">
            {view.forecasts.map((forecast, index) => (
              <Forecast key={index} {...forecast} />
            ))}
          </section>
          <section className="w-full flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-white line-h leading-relaxed">
              {"Today's Highlights"}
            </h1>
            <div className="grid grid-cols-1 @[400px]:grid-cols-2 gap-8">
              <Highlight {...view.highlights.wind}>
                <Wind deg={view.highlights.wind.deg} />
              </Highlight>
              <Highlight {...view.highlights.humidity}>
                <Humidity
                  humidity={parseFloat(view.highlights.humidity.value)}
                />
              </Highlight>
              <Highlight {...view.highlights.visibility} />
              <Highlight {...view.highlights.airPressure} />
            </div>
          </section>
        </div>
        <h5 className="text-white-light text-sm leading-7">
          By
          <a
            className="underline underline-offset-8 hover:text-white"
            href="https://www.linkedin.com/in/itaysarfaty/"
          >
            {" Itay Sarfaty "}
          </a>
          for devChallenges.io
        </h5>
      </main>
    </div>
  );
}
