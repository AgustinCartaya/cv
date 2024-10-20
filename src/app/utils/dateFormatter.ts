// Función para formatear una fecha en "Mes Año" (e.g., "June 2023")
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }); // Forzamos inglés
  return `${month} ${year}`
}

// Función para formatear un rango de fechas en "AñoInicio – AñoFin" o "Mes Año"
export const formatDateRange = (startDate: string, endDate: string): string => {
  const startYear = new Date(startDate).getFullYear()
  const endYear = new Date(endDate).getFullYear()

  // Si los años son diferentes, devuelve el rango de años (e.g., "2019 – 2022")
  if (startYear !== endYear) {
    return `${startYear} – ${endYear}`
  }

  // Si solo es un año, devuelve la fecha completa (e.g., "June 2023")
  return formatDate(endDate)
}

export const formatMonthYear = (dateString: string): string => {
  const date = new Date(dateString)
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }); // Forzamos inglés
  const year = date.getUTCFullYear()
  return `${month} ${year}` // Devuelve "Mes Año" en el formato requerido
}

export const formatYear = (dateString: string): string => {
  const date = new Date(dateString);
  return date.getUTCFullYear().toString(); // Convierte el año en string
};

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th'; // 11th to 13th siempre es "th"
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

// Función para formatear la fecha en "12th June 2024"
export const formatDateWithOrdinal = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getUTCDate(); // Obtener el día del mes
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }); // Mes en formato largo
  const year = date.getUTCFullYear(); // Obtener el año

  const suffix = getOrdinalSuffix(day); // Obtener el sufijo ordinal

  return `${day}${suffix} ${month} ${year}`; // Formato: "12th June 2024"
};