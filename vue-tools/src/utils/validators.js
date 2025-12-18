export function isValidLogin(login) {
  return /^[a-zA-Z0-9_]{3,16}$/.test(login)
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPassword(password) {
  return password.length >= 6
}
