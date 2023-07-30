import { Unit, getUnit } from "@/models/Unit";
import { Current } from "@/models/Weather";
import { getWeatherIcon as getIcon } from "@/utils/getWeatherIcon";

interface Response {
  main: {
    temp: string;
    temp_min: string;
    temp_max: string;
    pressure: string;
    humidity: string;
  };
  wind: {
    speed: string;
    deg: string;
  };
  visibility: string;
  weather: {
    id: string;
    main: string;
  }[];
}

const request = async (lat: number, lon: number, unit: Unit) => {
  const key = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${key}`;
  const res = await fetch(url);
  return (await res.json()) as Response;
};

export async function getCurrent(lat: number, lon: number, unit: Unit | null) {
  const { type, wind, visibility, temperature, pressure } = getUnit(unit);
  const data = await request(lat, lon, type);
  const current: Current = {
    wind: {
      value: Number(data.wind.speed),
      deg: Number(data.wind.deg),
      unit: wind,
    },
    visibility: {
      value: Number(data.visibility),
      unit: visibility,
    },
    temperature: {
      value: Number(data.main.temp),
      min: Number(data.main.temp_min),
      max: Number(data.main.temp_max),
      unit: temperature,
    },
    humidity: Number(data.main.humidity),
    pressure: {
      value: Number(data.main.pressure),
      unit: pressure,
    },
    icon: getIcon(Number(data.weather[0].id)),
    description: data.weather[0].main,
    date: new Date(),
  };

  return { current };
}
