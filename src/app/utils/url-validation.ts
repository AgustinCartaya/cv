export function verifyURL(text: string): string {
  const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i
  return urlRegex.test(text) ? text : `/${text}`
}
