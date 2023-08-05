import { format, isTomorrow } from "date-fns";

export function formatDate(date: Date) {
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "EEE, d MMM");
}
