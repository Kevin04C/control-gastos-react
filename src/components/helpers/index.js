
export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
} 

export const formatedFecha = (date) => {
  const currentDate = new Date(date);
  return currentDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
