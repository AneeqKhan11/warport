export function formRequiredFieldValidator(emailCode) {
  if (emailCode.length == 0) return "This field is required."
  return ''
}
