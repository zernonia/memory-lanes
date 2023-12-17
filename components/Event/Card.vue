<script setup lang="ts">
import { Pencil2Icon } from '@radix-icons/vue'
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="bg-yellow-50 relative border border-yellow-200 w-full h-full rounded-xl p-4">
    {{ event.title }}
  </div>
</template>
