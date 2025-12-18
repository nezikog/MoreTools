import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', {
  state: () => ({
    current: 'ru'
  }),
  actions: {
    toggle() {
      this.current = this.current === 'ru' ? 'en' : 'ru'
    }
  }
})
