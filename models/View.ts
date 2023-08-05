import { formatNumber } from "@/utils/formatNumber";
// Convert Weather to View
import { Weather } from "@/models/Weather";
import { formatDate } from "@/utils/formatDate";

export interface Forecast {
  date: string;
  icon: string;
  temperature: {
    min: string;
    max: string;
    unit: string;
  };
}
export interface Sidebar {
  weather: {
    temperature: string;
    unit: string;
    description: string;
    icon: string;
  };
  date: string;
  city: string;
}

export interface Highlight {
  title: string;
  value: string;
  unit: string;
}

export interface View {
  sidebar: Sidebar;
  forecasts: Forecast[];
  highlights: {
    wind: Highlight & { deg: number };
    humidity: Highlight;
    visibility: Highlight;
    airPressure: Highlight;
  };
}

export const formatWeather = (weather: Weather): View => {
  const { current, forecasts } = weather;

  return {
    sidebar: {
      weather: {
        temperature: current.temperature.value.toString(),
        unit: current.temperature.unit,
        description: current.description,
        icon: current.icon,
      },
      date: formatDate(new Date(current.date)),
      city: current.city,
    },
    forecasts: forecasts.map(({ date, icon, temperature }) => {
      return {
        date: formatDate(new Date(date)),
        icon: icon,
        temperature: {
          min: temperature.min.toString(),
          max: temperature.max.toString(),
          unit: temperature.unit,
        },
      };
    }),
    highlights: {
      wind: {
        title: "Wind status",
        value: current.wind.value.toString(),
        unit: current.wind.unit,
        deg: current.wind.deg,
      },
      humidity: {
        title: "Humidity",
        value: current.humidity.toString(),
        unit: "%",
      },
      visibility: {
        title: "Visibility",
        value: formatNumber(current.visibility.value),
        unit: current.visibility.unit,
      },
      airPressure: {
        title: "Air Pressure",
        value: formatNumber(current.pressure.value),
        unit: current.pressure.unit,
      },
    },
  };
};
