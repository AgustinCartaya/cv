const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    return `${protocol}//${host}`
  }
  return '' // Return an empty string if running on the server
}

export const fullUrlRegex = /^(https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/i

export function verifyURL(text: string, locale: string | string[]): string {
  if (fullUrlRegex.test(text)) {
    return text
  }

  // Otherwise, add the base URL with a leading slash
  return `${getBaseUrl()}/${locale}${text}`
}
