export function contactNoValidator(contactNo) {
  if (contactNo.length == 0) return "Contact number can't be empty."
  if (contactNo.length < 6) return "Contact number not valid."
  return ''
}
