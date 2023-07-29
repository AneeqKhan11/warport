export function sourceOfContactValidator(sourceOfContact,value) {
  if(sourceOfContact == "otherplatform"){
  if (value.length == 0) return "This field can't be empty."
  }
  return ''
}
