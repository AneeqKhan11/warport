export function confirmPasswordValidator(password,confirmPassword) {
  if (password != confirmPassword) return "Passwords didn’t match."
  return ''
}
