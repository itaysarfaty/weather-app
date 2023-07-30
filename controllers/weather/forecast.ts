import { Unit, getUnit } from "@/models/Unit";
import { Forecast } from "@/models/Weather";
import { getWeatherIcon as getIcon } from "@/utils/getWeatherIcon";
import { groupByDay } from "@/utils/groupByDay";
import { consolidateForecasts } from "@/utils/consolidateForecasts";
import { isToday } from "date-fns";

interface Response {
  list: {
    dt_txt: string;
    main: {
      temp_min: string;
      temp_max: string;
    };
    weather: {
      id: string;
    }[];
  }[];
}

const format = (response: Response, tempUnit: string) => {
  const forecasts = response.list.map((item): Forecast => {
    const { weather, main } = item;
    const { temp_min, temp_max } = main;
    const { id } = weather[0];
    return {
      date: new Date(item.dt_txt),
      icon: getIcon(Number(id)),
      temperature: {
        min: Number(temp_min),
        max: Number(temp_max),
        unit: tempUnit,
      },
    };
  });

  // Group into {} with key as date
  const grouped = groupByDay(forecasts);

  // Remove today's forecast
  Object.keys(grouped).forEach((date) => {
    if (isToday(new Date(date))) delete grouped[date];
  });

  // Consolidate dates into single forecast
  const consolidated = Object.keys(grouped).map((date) => {
    const forecasts = grouped[date];
    return consolidateForecasts(forecasts);
  });

  return consolidated;
};

const request = async (lat: number, lon: number, unit: Unit) => {
  const key = process.env.WEATHER_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${key}`;
  const res = await fetch(url);
  const data = (await res.json()) as Response;
  return data;
};

export async function getForecast(lat: number, lon: number, unit: Unit) {
  const { temperature, type } = getUnit(unit);
  const res = await request(lat, lon, type);
  const forecasts = format(res, temperature);

  return { forecasts };
}
