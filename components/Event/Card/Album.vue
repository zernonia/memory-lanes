<script setup lang="ts">
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, VisuallyHidden } from 'radix-vue'
import type { Event } from '@/types'

const props = defineProps<{
  event: Event
}>()

const isOpen = ref(false)
const images = computed(() => (props.event.metadata?.images as unknown as string[]) ?? [])
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger class="group row-span-2" v-bind="$attrs">
      <h2 class="font-medium">
        {{ event.title }}
      </h2>

      <div :hidden="isOpen" class="mt-16 flex-1 h-full w-full">
        <div class="relative w-full h-[85%]">
          <div
            v-for="(image, index) in images"
            :key="image"
            class="absolute scale-110 h-full duration transition-transform"
            :class="{
              'rotate-[-3deg] group-hover:rotate-[-4deg] z-[10]': index === 0,
              'rotate-[2deg] group-hover:rotate-[4deg] z-[9]': index === 1,
              'rotate-[-1deg] group-hover:rotate-[0deg] z-[8]': index === 2,
            }"
          >
            <img class="w-full h-full object-cover rounded-2xl" :src="image" alt="images" draggable="false">
          </div>
        </div>
      </div>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="fixed top-0 left-0 w-screen h-screen" />
      <DialogContent class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-screen-lg max-h-screen overflow-y-auto py-4 translate-x-[-50%] translate-y-[-50%]">
        <VisuallyHidden>
          <DialogTitle>{{ event.title }}</DialogTitle>
          <DialogDescription>Album for {{ event.title }}</DialogDescription>
        </VisuallyHidden>

        <div class="grid grid-cols-2 place-items-center">
          <img
            v-for="(image, index) in images"
            :key="image"
            :class="{
              'rotate-[-3deg] group-hover:rotate-[-4deg]': index % 4 === 0,
              'rotate-[2deg] group-hover:rotate-[4deg]': index % 4 === 1,
              'rotate-[-1deg] group-hover:rotate-[0deg]]': index % 4 === 2,
            }" class="h-72 w-auto  rounded-2xl" :src="image" alt="images"
            draggable="false"
          >
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
