export interface Forecast {
  date: Date;
  icon: string;
  temperature: {
    min: number;
    max: number;
    unit: string;
  };
}

export interface Current {
  date: Date;
  icon: string;
  description: string;
  wind: {
    value: number;
    deg: number;
    unit: string;
  };
  temperature: {
    value: number;
    min: number;
    max: number;
    unit: string;
  };
  humidity: number;
  visibility: {
    value: number;
    unit: string;
  };
  pressure: {
    value: number;
    unit: string;
  };
}

export interface Weather {
  current: Current;
  forecasts: Forecast[];
}
