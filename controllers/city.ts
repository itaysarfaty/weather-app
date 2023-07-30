import { NewError } from "@/models/Error";
import { Location } from "@/models/Location";

interface Response {
  name: string;
  lat: string;
  lon: string;
  state?: string;
}

const format = (data: Response[]) => {
  return data.map((city) => {
    const { name, lat, lon, state } = city;
    return {
      city: name,
      latitude: Number(lat),
      longitude: Number(lon),
      state,
    };
  }) as Location[];
};

const request = async (city: string, limit: number) => {
  const key = process.env.WEATHER_API_KEY;
  if (!key) throw NewError("Weather API key not found", 500);
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${key}`;
  const res = await fetch(url);
  return (await res.json()) as Response[];
};

export const findCity = async (city: string) => {
  const data = await request(city, 5);
  const cities = format(data);
  return { cities };
};
