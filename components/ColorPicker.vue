<script setup lang="ts">
import type { EventColor } from '@/types'
import { colors } from '@/types/enum'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ modelValue?: EventColor }>()
const emits = defineEmits<{
  'update:modelValue': [val: EventColor]
}>()

const modelValue = useVModel(props, 'modelValue', emits)
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton
        class="w-full bg-[var(--color)] hover:bg-[var(--color)] h-9 p-0"
        :style="{ '--color': colors[modelValue as keyof typeof colors] }"
        :title="modelValue"
        variant="outline"
      />
    </UiPopoverTrigger>
    <UiPopoverContent align="start" class="flex gap-1 w-max">
      <UiButton
        v-for="(color, key) of colors"
        :key="key"
        class="rounded-full bg-[var(--color)] hover:bg-[var(--color)] w-6 h-6 p-0"
        :class="{ 'border-primary': modelValue === key }"
        :style="{ '--color': color }"
        :title="key"
        variant="outline"
        @click="modelValue = key"
      />
    </UiPopoverContent>
  </UiPopover>
</template>
