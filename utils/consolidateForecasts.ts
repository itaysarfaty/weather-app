import { Forecast } from "@/models/Weather";

export const consolidateForecasts = (forecasts: Forecast[]): Forecast => {
  //    Get the most common icon
  //   Keep the lowest min temperature
  //   Keep the highest max temperature

  const forecast = forecasts[0];
  const { icons, min, max } = forecasts.reduce(
    (acc, forecast) => {
      const { icon, temperature } = forecast;
      const { min, max } = temperature;

      if (!acc.icons[icon]) acc.icons[icon] = 0;
      acc.icons[icon] += 1;

      if (min < acc.min) acc.min = min;
      if (max > acc.max) acc.max = max;

      return acc;
    },
    {
      icons: {} as { [key: string]: number },
      min: forecast.temperature.min,
      max: forecast.temperature.max,
    }
  );

  const icon = Object.entries(icons).reduce(
    (acc, [icon, count]) => {
      if (count > acc.count) {
        acc.icon = icon;
        acc.count = count;
      }
      return acc;
    },
    { icon: "", count: 0 }
  ).icon;

  return {
    ...forecast,
    icon,
    temperature: {
      min: Math.round(min),
      max: Math.round(max),
      unit: forecast.temperature.unit,
    },
  };
};
