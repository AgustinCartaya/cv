// Función para formatear una fecha en "Mes Año" (e.g., "June 2023")
export const formatDate = (dateString: string, locale: string = 'en'): string => {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = date.toLocaleString(locale, { month: 'long', timeZone: 'UTC' }) // Forzamos inglés
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

export const formatMonthYear = (dateString: string | string[], locale: string | string[] = 'en'): string => {
  const date = new Date(Array.isArray(dateString) ? dateString[0] : dateString)
  const localeString = Array.isArray(locale) ? locale[0] : locale
  const month = date.toLocaleString(localeString, { month: 'long', timeZone: 'UTC' })
  const year = date.getUTCFullYear()
  return `${month} ${year}`
}

export const formatYear = (dateString: string): string => {
  const date = new Date(dateString)
  return date.getUTCFullYear().toString() // Convierte el año en string
}

const getOrdinalSuffix = (day: number, locale: string): string => {
  if (locale === 'es' || locale === 'fr') {
    // En español y francés, generalmente no se usan sufijos para los días
    return ''
  }
  if (day > 3 && day < 21) return 'th' // 11th to 13th siempre es "th"
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

// Función para formatear la fecha en "12th June 2024"
export const formatDateWithOrdinal = (dateString: string | string[], locale: string | string[] = 'en'): string => {
  const date = new Date(Array.isArray(dateString) ? dateString[0] : dateString)
  const localeString = Array.isArray(locale) ? locale[0] : locale
  const day = date.getUTCDate()
  const month = date.toLocaleString(localeString, { month: 'long', timeZone: 'UTC' })
  const year = date.getUTCFullYear()

  const suffix = getOrdinalSuffix(day, localeString)
  if (locale === 'es') {
    return `${day} de ${month} del ${year}`
  }

  return `${day}${suffix} ${month} ${year}`
}
