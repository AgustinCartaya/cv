const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    return `${protocol}//${host}`
  }
  return '' // Return an empty string if running on the server
}

export function verifyURL(text: string): string {
  const urlRegex = /^(https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/i
  // Check if the text is a full URL
  if (urlRegex.test(text)) {
    return text
  }

  // Check if it's a relative path starting with "/"
  if (text.startsWith('/')) {
    return `${getBaseUrl()}${text}`
  }

  // Otherwise, add the base URL with a leading slash
  return `${getBaseUrl()}/${text}`
}
