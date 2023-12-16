<script setup lang="ts">
import { EnterIcon, ExitIcon, GithubLogoIcon, Pencil1Icon, PersonIcon } from '@radix-icons/vue'

const user = useSupabaseUser()
const client = useSupabaseClient()
const { profile } = useProfile()

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
  <div class="h-10 w-10">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton class="p-0 h-10 w-10 rounded-full" variant="ghost">
          <UiAvatar v-if="user">
            <UiAvatarImage :src="profile?.avatar_url ?? ''" />
            <UiAvatarFallback>{{ profile?.full_name?.[0] }}</UiAvatarFallback>
          </UiAvatar>
          <div v-else class="border rounded-full p-2 bg-gray-50">
            <PersonIcon class="w-5 h-5 text-gray-400" />
          </div>
        </UiButton>
      </UiDropdownMenuTrigger>

      <UiDropdownMenuContent v-if="user" class="w-56" align="end">
        <UiDropdownMenuLabel>My account</UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />

        <UiDropdownMenuGroup>
          <UiDropdownMenuItem as-child>
            <NuxtLink to="/settings/profile">
              <PersonIcon class="mr-2 h-4 w-4" />
              <span>Profile</span>
            </NuxtLink>
          </UiDropdownMenuItem>

          <UiDropdownMenuItem as-child>
            <NuxtLink to="/">
              <Pencil1Icon class="mr-2 h-4 w-4" />
              <span>Edit Calendar</span>
            </NuxtLink>
          </UiDropdownMenuItem>
        </UiDropdownMenuGroup>

        <UiDropdownMenuSeparator />

        <UiDropdownMenuItem as-child>
          <NuxtLink to="https://github.com/zernonia" target="_blank">
            <GithubLogoIcon class="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </NuxtLink>
        </UiDropdownMenuItem>
        <UiDropdownMenuItem @click="handleLogout">
          <ExitIcon class="mr-2 h-4 w-4" />
          <span>Log out</span>
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>

      <UiDropdownMenuContent v-else align="end">
        <UiDropdownMenuItem @click="handleLogin">
          <EnterIcon class="mr-2 h-4 w-4" />
          <span>Login</span>
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>
