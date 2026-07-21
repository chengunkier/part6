import { create } from 'zustand'

let timeoutId

const useNotificationStore = create((set) => ({
  notification: '',
  setNotification: (message, time = 5) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    set(() => ({ notification: message }))
    timeoutId = setTimeout(() => {
      set(() => ({ notification: '' }))
    }, time * 1000)
  },
}))

export default useNotificationStore