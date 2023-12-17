<script setup lang="ts">
import { CalendarIcon, Pencil1Icon } from '@radix-icons/vue'

const route = useRoute()
const { slug } = useProfile()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex p-4">
      <NuxtLink to="/" class="flex items-center gap-2 text-gray-400 hover:text-gray-500 transition">
        <img src="/logo.svg">
        <span class="font-semibold text-2xl">MemoryLane</span>
      </NuxtLink>
      <div class="mx-auto" />

      <div class="flex items-center gap-4">
        <template v-if="slug">
          <UiButton v-if="route.name !== 'u-username'" as-child variant="ghost" class="gap-2">
            <NuxtLink :to="`/u/${slug}`">
              <CalendarIcon />
              <span>My Calendar</span>
            </NuxtLink>
          </UiButton>
          <UiButton v-else as-child variant="ghost" class="gap-2">
            <NuxtLink to="/edit">
              <Pencil1Icon />
              <span>Edit Calendar</span>
            </NuxtLink>
          </UiButton>
        </template>
        <UserMenu />
      </div>
    </header>

    <div class="flex flex-1 h-full">
      <slot />
    </div>
  </div>
</template>
