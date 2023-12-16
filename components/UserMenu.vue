<script setup lang="ts">
// TODO: UI shifted here cause by Avatar
import { PersonIcon } from '@radix-icons/vue'

const user = useSupabaseUser()
const client = useSupabaseClient()

const isLoading = ref(false)
async function handleLogin() {
  isLoading.value = true
  await client.auth.signInWithOAuth({
    provider: 'google',
  })
  isLoading.value = false
}
async function handleLogout() {
  await client.auth.signOut()
}
</script>

<template>
  <div>
    <UiPopover>
      <UiPopoverTrigger>
        <UiAvatar v-if="user" class="border">
          <UiAvatarImage :src="user.user_metadata?.avatar_url" />
          <UiAvatarFallback>{{ user.user_metadata.full_name?.[0] }}</UiAvatarFallback>
        </UiAvatar>
        <div v-else class="border rounded-full p-2 bg-gray-50">
          <PersonIcon class="w-5 h-5 text-gray-400" />
        </div>
      </UiPopoverTrigger>

      <UiPopoverContent align="end">
        <div v-if="user">
          <UiButton :disabled="isLoading" @click="handleLogout">
            Signout
          </UiButton>
        </div>
        <div v-else class="px-4 py-2 flex flex-col items-center gap-2">
          <UiButton :disabled="isLoading" @click="handleLogin">
            Login
          </UiButton>
          <h2 class="text-sm text-gray-300">
            Login to create your calendar
          </h2>
        </div>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>
