import type { Database } from '~/types/database'

export function useProfile() {
  const user = useSupabaseUser()
  const client = useSupabaseClient<Database>()

  const { data: profile } = useAsyncData('profile', async () => {
    if (!user.value?.id)
      return null
    const { data } = await client.from('profiles').select('*').eq('id', user.value.id).single()
    return data
  })

  const slug = computed(() => profile.value?.slug)

  return {
    slug,
    profile,
  }
}
