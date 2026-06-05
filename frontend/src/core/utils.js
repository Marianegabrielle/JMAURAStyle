export function classNames(...values) {
  return values.flat().filter(Boolean).join(' ');
}

export function capitalize(value = '') {
  const text = String(value);
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

export function normalizeEmail(value = '') {
  return String(value).trim().toLowerCase();
}
