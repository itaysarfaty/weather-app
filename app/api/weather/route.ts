import { NextRequest, NextResponse } from "next/server";
import { getForecast as getForecasts } from "@/controllers/weather/forecast";
import { isUnit } from "@/models/Unit";
import { call } from "@/utils/tryFetch";
import { getCurrent } from "@/controllers/weather/current";
import { Weather } from "@/models/Weather";
import { NewError } from "@/models/Error";

const validate = (
  lat: string | null,
  lon: string | null,
  unit: string | null
) => {
  if (!lat) throw NewError("Latitude not given", 400);
  if (!lon) throw NewError("Longitude not given", 400);
  if (unit != null && !isUnit(unit)) throw NewError("Invalid Unit", 400);
  return { lat: parseInt(lat), lon: parseInt(lon), unit };
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const { lat, lon, unit } = validate(
    searchParams.get("lat"),
    searchParams.get("lon"),
    searchParams.get("unit")
  );

  const fetch = async () => {
    const forecastsRes = getForecasts(lat, lon, unit);
    const currentRes = getCurrent(lat, lon, unit);
    const [forecasts, current] = await Promise.all([forecastsRes, currentRes]);

    const res: Weather = { ...current, ...forecasts };
    return NextResponse.json(res);
  };

  return call(fetch);
};
