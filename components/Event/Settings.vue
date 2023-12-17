<script setup lang="ts">
import { format } from 'date-fns'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { getValues } from '@/lib/utils'
import type { Event, EventColor } from '~/types'

const props = defineProps<{
  event: Event
}>()

const eventType = {
  Album: 'album',
  Story: 'story',
  Link: 'link',
} as const

const store = useEditStore()

const validationSchema = toTypedSchema(z.object({
  title: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  date: z.date(),
  color:
    z.string().optional(),
  type:
    z.enum(getValues(eventType)),
}))

const { handleSubmit, resetForm, values } = useForm({
  validationSchema,
  initialValues: {
    title: props.event.title,
    date: new Date(props.event.date),
    color: props.event.color ?? 'Transparent',
    type: props.event.type ?? 'link',
  },
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
  // toast({
  //   title: 'You submitted the following values:',
  //   description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  // })
})

watch(values, (n) => {
  if (!n.date)
    return

  // @ts-expect-error Type instationation warning
  store.event = {
    ...props.event,
    title: n.title ?? '',
    date: format(n.date, 'yyyy-MM-dd'),
  }
}, { immediate: true })
</script>

<template>
  <div class="rounded-2xl my-4 border">
    <form class="grid grid-cols-2 gap-6" @submit="onSubmit">
      <UiFormField v-slot="{ componentField }" name="title">
        <UiFormItem>
          <UiFormLabel>Title</UiFormLabel>
          <UiFormControl>
            <UiInput type="text" placeholder="" v-bind="componentField" />
          </UiFormControl>
          <UiFormDescription>
            This is your public display name. It can be your real name or a pseudonym.
          </UiFormDescription>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <UiFormField v-slot="{ componentField }" name="date">
        <UiFormItem>
          <UiFormLabel>Date</UiFormLabel>
          <UiFormControl>
            <UiDatePicker v-bind="componentField" />
          </UiFormControl>
          <UiFormDescription>
            This is your public display name. It can be your real name or a pseudonym.
          </UiFormDescription>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <UiFormField v-slot="{ componentField }" name="color">
        <UiFormItem>
          <UiFormLabel>Color</UiFormLabel>
          <UiFormControl>
            <ColorPicker v-bind="componentField" />
          </UiFormControl>
          <UiFormDescription>
            This is your public display name. It can be your real name or a pseudonym.
          </UiFormDescription>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <UiFormField v-slot="{ componentField }" name="type">
        <UiFormItem>
          <UiFormLabel>Type</UiFormLabel>
          <UiFormControl>
            <UiSelect v-bind="componentField">
              <UiSelectTrigger>
                <UiSelectValue placeholder="Select card type" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem v-for="(type, key) of eventType" :key="key" :value="type">
                    {{ key }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </UiFormControl>
          <UiFormDescription>
            This is your public display name. It can be your real name or a pseudonym.
          </UiFormDescription>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <div class="flex gap-2 justify-start">
        <UiButton type="submit">
          Update profile
        </UiButton>

        <UiButton
          type="button"
          variant="outline"
          @click="resetForm"
        >
          Reset form
        </UiButton>
      </div>
    </form>
  </div>
</template>
