export function updateProfileRecord(profile, payload) {
  return {
    ...profile,
    ...payload,
    fullName: payload.fullName ?? profile.fullName,
  };
}
