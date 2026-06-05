export function toDate(value) {
  return value instanceof Date ? value : new Date(value);
}

export function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(toDate(value));
}

export function formatMonthYear(value) {
  return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(toDate(value));
}

export function toInputDate(value) {
  const date = toDate(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromInputDate(value) {
  return new Date(`${value}T12:00:00`);
}

export function isSameDay(a, b) {
  const left = toDate(a);
  const right = toDate(b);
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

export function getMonthGrid(referenceDate) {
  const date = toDate(referenceDate);
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const startOffset = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - startOffset);
  const days = [];

  for (let index = 0; index < 42; index += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    days.push(day);
  }

  return days;
}
