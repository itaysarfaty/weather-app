export const groupByDay = <T extends { date: string }>(data: T[]) => {
  const days: { [key: string]: T[] } = {};

  data.forEach((item) => {
    const day = new Date(item.date).toDateString();
    if (!days[day]) days[day] = [];
    days[day].push(item);
  });

  return days;
};
