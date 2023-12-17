<script setup lang="ts">
import { ReloadIcon } from '@radix-icons/vue'

const user = useSupabaseUser()
watch(user, () => {
  if (user.value)
    return navigateTo('/edit')
}, { immediate: true })
</script>

<template>
  <div class="mx-auto p-12 flex flex-col items-center">
    <ReloadIcon class="w-8 h-8 animate-spin" />
  </div>
</template>
