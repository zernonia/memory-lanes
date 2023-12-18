<script setup lang="ts">
import { ExternalLinkIcon } from '@radix-icons/vue'
import type { Event } from '@/types'
import { colorsFont } from '@/types/enum'

defineProps<{
  event: Event
}>()
</script>

<template>
  <NuxtLink v-if="event.type === 'link'" :to="event.metadata?.url" target="_blank" class="group overflow-hidden relative">
    <h2 class="font-semibold">
      {{ event.title }}
    </h2>

    <ExternalLinkIcon
      class="w-48 h-48 absolute -rotate-[10deg] group-hover:-rotate-[6deg] transition-all -right-4 text-[var(--color)] -bottom-10 opacity-50 group-hover:opacity-75"
      :style="{
        '--color': colorsFont[event.color as keyof typeof colorsFont],
      }"
    />
  </NuxtLink>
</template>
