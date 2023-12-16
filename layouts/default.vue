<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex p-4">
      <NuxtLink to="/">
        Calendar
      </NuxtLink>
      <div class="mx-auto" />

      <div class="flex items-center gap-4">
        <UiButton v-if="user?.id" as-child variant="ghost">
          <NuxtLink to="/settings/profile">
            Settings
          </NuxtLink>
        </UiButton>
        <UserMenu />
      </div>
    </header>

    <div class="flex flex-1 h-full">
      <slot />
    </div>
  </div>
</template>
