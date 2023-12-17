<script setup lang="ts">
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, VisuallyHidden } from 'radix-vue'
import type { Event } from '~/types'

const props = defineProps<{
  event: Event
}>()

const localEvent = ref()

function handleOpen(val: boolean) {
  if (val)
    localEvent.value = props.event
}
</script>

<template>
  <DialogRoot @update:open="handleOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-background/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />
      <DialogContent
        class="fixed left-[50%] top-[50%] z-50 grid w-max translate-x-[-50%] translate-y-[-50%] gap-4 p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
      >
        <VisuallyHidden>
          <DialogTitle>Edit</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>Description</DialogDescription>
        </VisuallyHidden>

        <div class="flex w-max">
          <div class="w-[20rem]">
            form
          </div>
          <div class="bg-yellow-50 relative border border-yellow-200 h-full rounded-xl p-4 w-[60vw] md:w-[40vw] xl:w-[20vw] ">
            <div contenteditable class="outline-none">
              {{ localEvent.title }}
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
