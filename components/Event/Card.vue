<script setup lang="ts">
import { Primitive } from 'radix-vue'
import { EventCardAlbum, EventCardLink } from '#components'
import type { Event } from '@/types'
import { colors } from '@/types/enum'

defineProps<{
  event: Event
}>()

const mapType = {
  link: EventCardLink,
  album: EventCardAlbum,
}
</script>

<template>
  <Primitive
    as-child
    class="bg-[var(--color)] relative text-left flex flex-col border-[5px] border-white w-full h-full rounded-xl p-4 shadow-none transition duration-300 active:scale-[97.5%] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    :class="{
      'hover:shadow-xl': event.color !== 'Transparent',
    }"
    :style="{ '--color': colors[event.color!] }"
    draggable="false"
  >
    <component :is="mapType[event.type as keyof typeof mapType]" :event="event" />
  </Primitive>
</template>
