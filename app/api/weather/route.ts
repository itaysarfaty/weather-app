import { NextRequest, NextResponse } from "next/server";
import { getForecast as getForecasts } from "@/controllers/weather/forecast";
import { isUnit } from "@/models/Unit";
import { call } from "@/utils/tryFetch";
import { getCurrent } from "@/controllers/weather/current";
import { Weather } from "@/models/Weather";
import { NewError } from "@/models/Error";
import { View } from "@/models/View";

const validate = (
  latitude: string | null,
  longitude: string | null,
  unit: string | null
) => {
  if (!latitude) throw NewError("Latitude not given", 400);
  if (!longitude) throw NewError("Longitude not given", 400);
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
  if (isNaN(lat)) throw NewError("Invalid Latitude", 400);
  if (isNaN(lon)) throw NewError("Invalid Longitude", 400);

  if (unit != null && !isUnit(unit)) throw NewError("Invalid Unit", 400);
  return { lat, lon, unit };
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const fetch = async (): Promise<Weather> => {
    const { lat, lon, unit } = validate(
      searchParams.get("lat"),
      searchParams.get("lon"),
      searchParams.get("unit")
    );

    const forecastsRes = getForecasts(lat, lon, unit);
    const currentRes = getCurrent(lat, lon, unit);
    const [forecasts, current] = await Promise.all([forecastsRes, currentRes]);
    return { ...current, ...forecasts };
  };

  return await call(fetch);
};
