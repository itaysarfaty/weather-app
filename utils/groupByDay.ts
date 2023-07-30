import { Forecast } from "@/models/Weather";
import { differenceInDays } from "date-fns";

export const groupByDay = <T extends { date: Date }>(data: T[]) => {
  const days: { [key: string]: T[] } = {};

  data.forEach((item) => {
    const day = item.date.toDateString();
    if (!days[day]) days[day] = [];
    days[day].push(item);
  });

  return days;
};

