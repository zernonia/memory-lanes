<script setup lang="ts">
import * as z from 'zod'

defineProps<{
  metadata?: Record<string, any>
}>()

const schema = z.object({
  url: z.string().url(),
  icon: z.string().optional(),
})

defineExpose({
  schema,
})
</script>

<template>
  <div class="grid grid-cols-2 gap-6 mt-4">
    <UiFormField v-slot="{ componentField }" name="metadata.url">
      <UiFormItem>
        <UiFormLabel>Url</UiFormLabel>
        <UiFormControl>
          <UiInput type="text" placeholder="https://" v-bind="componentField" />
        </UiFormControl>
        <UiFormDescription>
          This is your public display name. It can be your real name or a pseudonym.
        </UiFormDescription>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
  </div>
</template>
