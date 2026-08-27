export function formatDescription(text) {
  if (!text) return ''
  return text
    .replace(/\\r\\n/g, '<br>')
    .replace(/\\n/g, '<br>')
    .replace(/\r\n/g, '<br>')
    .replace(/\n/g, '<br>')
    .replace(/\r/g, '<br>')
}
