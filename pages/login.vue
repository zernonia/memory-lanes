<script setup lang="ts">
import { EnterIcon, ExitIcon, GithubLogoIcon, Pencil1Icon, PersonIcon } from '@radix-icons/vue'

const client = useSupabaseClient()

const isLoading = ref(false)
async function handleLogin() {
  isLoading.value = true
  await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: '/confirm',
    },
  })
  isLoading.value = false
}
</script>

<template>
  <div class="mx-auto p-12 flex flex-col items-center">
    <UiButton @click="handleLogin">
      <EnterIcon class="mr-2 h-4 w-4" />
      <span>Login</span>
    </UiButton>
  </div>
</template>
