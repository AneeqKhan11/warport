export function messageValidator(text) {
  if (!text) return "Message can't be empty."
  if (text.length < 5) return 'Message must be at least 5 characters long.'
  return ''
}
