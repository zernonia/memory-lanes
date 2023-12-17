import type { Event } from '~/types'

export const useEditStore = defineStore('edit', () => {
  const event = ref<Event>()

  return {
    event,
  }
})
