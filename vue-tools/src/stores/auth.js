import { defineStore } from 'pinia'

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'currentUser'

function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || []
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
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
