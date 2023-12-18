<script setup lang="ts">
import { format } from 'date-fns'
import { useForm } from 'vee-validate'
import { TrashIcon } from '@radix-icons/vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { getKeys, getValues } from '@/lib/utils'
import type { Database, Event } from '~/types'
import { colors, eventType } from '@/types/enum'
import EventSettingsLink from '@/components/Event/Settings/Link.vue'
import EventSettingsAlbum from '@/components/Event/Settings/Album.vue'

const props = defineProps<{
  event?: Event
}>()
const emits = defineEmits<{
  save: []
  delete: []
}>()

const user = useSupabaseUser()
const client = useSupabaseClient<Database>()
const store = useEditStore()

const subSectionInstance = ref<InstanceType<typeof EventSettingsLink | typeof EventSettingsAlbum>>()

const validationSchema = computed(() => {
  const metadata = subSectionInstance.value?.schema ?? z.any()
  return toTypedSchema(z.object({
    title: z
      .string()
      .min(2, {
        message: 'Username must be at least 2 characters.',
      }),
    date: z.date(),
    color:
    z.enum(getKeys(colors)),
    type:
    z.enum(getValues(eventType)),
    metadata,
  }))
})

const { handleSubmit, resetForm, values, meta, setValues } = useForm({
  validationSchema,
  initialValues: {
    title: props.event?.title,
    date: props.event?.date ? new Date(props.event?.date) : new Date(),
    color: props.event?.color ?? 'Transparent',
    type: props.event?.type ?? 'link',
    metadata: props.event?.metadata as any,
  },
})

function handleAlbumUpdate(val: string[]) {
  setValues({
    metadata: {
      images: val,
    },
  })
}

const isLoading = ref(false)
const onSubmit = handleSubmit(async (values) => {
  if (!store.event)
    return

  isLoading.value = true
  console.log(values)
  await client.from('events').upsert({ ...store.event, user_id: user.value?.id ?? '' })

  // toast({
  //   title: 'You submitted the following values:',
  //   description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  // })
  emits('save')
  isLoading.value = false
})

const isDeleting = ref(false)
function handleDelete() {
  emits('delete')
  isDeleting.value = true
  store.event = undefined
}

watch(values, (n) => {
  console.log(n)
  if (!n.date)
    return

  store.event = {
    ...props.event,
    ...n,
    date: format(n.date, 'yyyy-MM-dd'),
  }
}, { immediate: true })
</script>

<template>
  <div class="rounded-2xl my-4 border">
    <form @submit="onSubmit">
      <h2 class="text-lg text-foreground font-semibold leading-none tracking-tight">
        Main Section
      </h2>
      <div class="grid lg:grid-cols-2 gap-6 mt-4">
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
      </div>

      <div class="rounded-xl mt-8 bg-muted p-4 border">
        <h2 class="capitalize text-lg text-foreground font-semibold leading-none tracking-tight">
          {{ values.type }} section
        </h2>

        <EventSettingsLink v-if="values.type === 'link'" ref="subSectionInstance" :metadata="values.metadata" />
        <EventSettingsAlbum v-if="values.type === 'album'" ref="subSectionInstance" :metadata="values.metadata" @update="handleAlbumUpdate" />
      </div>

      <div class="flex w-full justify-between items-center mt-4">
        <div class="flex gap-2 justify-start ">
          <UiButton type="submit" :loading="isLoading" :disabled="!meta.dirty || !meta.valid">
            Update event
          </UiButton>

          <UiButton
            type="button"
            variant="outline"
            @click="resetForm"
          >
            Reset form
          </UiButton>
        </div>

        <UiButton
          variant="destructive"
          size="icon"
          :loading="isDeleting"
          @click.prevent.stop="handleDelete"
        >
          <TrashIcon />
        </UiButton>
      </div>
    </form>
  </div>
</template>
