export function updateSettingsRecord(settings, payload) {
  return { ...settings, ...payload };
}
