export function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export function startOfWeek(d: Date) {
  const day = new Date(d);
  const offset = (day.getDay() + 6) % 7; // Monday=0
  day.setDate(day.getDate() - offset);
  day.setHours(0, 0, 0, 0);
  return day;
}

export function endOfWeek(d: Date) {
  const day = startOfWeek(d);
  day.setDate(day.getDate() + 6);
  return day;
}

export function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}