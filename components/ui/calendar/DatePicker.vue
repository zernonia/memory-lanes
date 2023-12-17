<script setup lang="ts">
import { format } from 'date-fns'
import { CalendarIcon } from '@radix-icons/vue'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps<{
  modelValue?: Date
}>()
const emits = defineEmits<{
  'update:modelValue': [val: Date]
}>()

const modelValue = useVModel(props, 'modelValue', emits)
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton
        variant="outline"
        :class="cn(
          'w-full justify-start text-left font-normal',
          !modelValue && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ modelValue ? format(modelValue, "PPP") : "Pick a date" }}</span>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-auto p-0">
      <UiCalendar v-model="modelValue" />
    </UiPopoverContent>
  </UiPopover>
</template>
