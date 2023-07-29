export function emailValidator(email,empty=false) {
  const re = /\S+@\S+\.\S+/
  if (!email && !empty) return "Email can't be empty."
  else if(!email && empty)
     return ''
  if (!re.test(email)) return 'Ooops! We need a valid email address.'
  return ''
}
