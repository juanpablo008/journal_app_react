export const dateFormatter = (date) => {
  if(date) return new Date(date).toLocaleDateString('es-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"})
  return "";
};