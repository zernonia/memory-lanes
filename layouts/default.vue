<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex p-4">
      <NuxtLink to="/">
        Calendar
      </NuxtLink>
      <div class="mx-auto" />

      <UserMenu />
    </header>

    <div class="flex flex-1 h-full">
      <slot />
    </div>
  </div>
</template>
