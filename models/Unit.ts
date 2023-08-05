export type Unit = "metric" | "imperial" | "standard" | null;

interface Measurements {
  temperature: string;
  wind: string;
  visibility: string;
  pressure: string;
}

export function isUnit(val: any): val is Unit {
  return ["metric", "imperial", "standard"].includes(val);
}

export const UNITS = {
  metric: {
    temperature: "°C",
    wind: "m/s",
    visibility: "kms",
    pressure: "hPa",
  },
  imperial: {
    temperature: "°F",
    wind: "mph",
    visibility: "kms",
    pressure: "hPa",
  },
  standard: {
    temperature: "°K",
    wind: "m/s",
    visibility: "kms",
    pressure: "hPa",
  },
};

export const getUnit = (unit: Unit) => {
  const type = unit ?? "imperial";
  const { temperature, wind, visibility, pressure } = UNITS[type];
  return {
    type,
    temperature,
    wind,
    visibility,
    pressure,
  };
};
