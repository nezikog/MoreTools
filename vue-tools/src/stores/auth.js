

import { defineStore } from 'pinia'

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'currentUser'

function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || []
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: loadUsers(),
    currentUser: JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null,
    error: null
  }),

  actions: {
    register({ login, email, password }) {
      this.error = null

      // 1. Пустые поля
      if (!login || !email || !password) {
        this.error = 'Все поля обязательны для заполнения'
        return false
      }

      // 2. Длина логина
      if (login.length < 3) {
        this.error = 'Логин должен содержать минимум 3 символа'
        return false
      }

      // 3. Email
      if (!isValidEmail(email)) {
        this.error = 'Некорректный формат почты'
        return false
      }

      // 4. Пароль
      if (password.length < 6) {
        this.error = 'Пароль должен быть не короче 6 символов'
        return false
      }

      // 5. Уникальность
      const exists = this.users.some(
        u => u.login === login || u.email === email
      )

      if (exists) {
        this.error = 'Пользователь с таким логином или почтой уже существует'
        return false
      }

      const newUser = {
        id: Date.now(),
        login,
        email,
        password
      }

      this.users.push(newUser)
      saveUsers(this.users)

      return true
    },

    login({ login, email, password }) {
      this.error = null

      // 1. Пустые поля
      if (!login || !email || !password) {
        this.error = 'Введите логин, почту и пароль'
        return false
      }

      // 2. Email формат
      if (!isValidEmail(email)) {
        this.error = 'Некорректный формат почты'
        return false
      }

      const user = this.users.find(
        u =>
          u.login === login &&
          u.email === email &&
          u.password === password
      )

      if (!user) {
        this.error = 'Неверный логин, почта или пароль'
        return false
      }

      this.currentUser = user
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))

      return true
    },

    logout() {
      this.currentUser = null
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }
})
