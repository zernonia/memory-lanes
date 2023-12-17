<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot, VisuallyHidden } from 'radix-vue'
import { CheckIcon, ReloadIcon, TrashIcon } from '@radix-icons/vue'
import * as z from 'zod'

const props = defineProps<{
  metadata?: {
    images: string[]
  }
}>()
const emits = defineEmits<{
  'update': [val: string[]]
}>()

const schema = z.object({
  images: z.array(z.string().url().optional()).nonempty(),
})

defineExpose({
  schema,
})

const user = useSupabaseUser()
const client = useSupabaseClient()
const images = computed(() => props.metadata?.images?.filter(Boolean) ?? [])
const imageLength = computed(() => images.value.length)

const externalImageUrl = ref('')
const { open: openFileDialog, reset: resetFileDialog, onChange } = useFileDialog({
  multiple: true,
  accept: 'image/*',
})

function generateRandomString(length: number) {
  return [...Array(length)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')
}

const isLoading = ref(false)
const MAX_SIZE = 10 * 1024 * 1024 // In MegaBytes
async function handleFiles(files: FileList | null | undefined) {
  if (!files)
    return
  isLoading.value = true
  const allowedFiles = Array.from(files).filter(i => i.size <= MAX_SIZE)
  const result = await Promise.allSettled(allowedFiles.map((i) => {
    return client.storage.from('media').upload(`${user.value?.id}/${generateRandomString(6)}-${i.name}`, i)
  }))

  // eslint-disable-next-line ts/no-non-null-asserted-optional-chain
  const data = result.map(i => (i.status === 'fulfilled') ? client.storage.from('media').getPublicUrl(i.value?.data?.path!).data.publicUrl : undefined).filter(Boolean) as string[]
  emits('update', [...images.value, ...data])

  resetFileDialog()
  isLoading.value = false
}

onChange((files) => {
  handleFiles(files)
})
function handleDrop(event: DragEvent) {
  handleFiles(event.dataTransfer?.files)
}

function addImage(url: string) {
  const data = [...images.value, url]
  emits('update', data)
  externalImageUrl.value = ''
}

function removeImage(index: number) {
  const data = images.value.toSpliced(index, 1)
  emits('update', data)
}
</script>

<template>
  <div class="grid lg:grid-cols-2 gap-6 mt-4">
    <UiFormField v-for="length in imageLength" v-slot="{ componentField }" :key="length" :name="`metadata.images[${length - 1}]`">
      <AvatarRoot as="div" class="group relative">
        <AvatarImage :src="componentField.modelValue" class="h-[12rem] w-full object-cover rounded-xl" />
        <AvatarFallback :delay-ms="1000">
          <UiButton class="w-full border border-dashed rounded-lg flex flex-col items-center justify-center h-[12rem] text-gray-400 font-medium" variant="outline" @click.stop.prevent="openFileDialog">
            <!-- <PlusIcon class="text-gray-400 w-12 h-12" /> -->
            <span>Invalid image.</span>
            <div class="flex items-center gap-1 mt-2" @click.stop.prevent>
              <UiInput placeholder="Paste image url" type="text" v-bind="componentField" />
            </div>
          </UiButton>
        </AvatarFallback>

        <UiButton class="z-10 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all" size="icon" variant="destructive" @click.stop.prevent="removeImage(length - 1)">
          <TrashIcon />
        </UiButton>
      </AvatarRoot>
    </UiFormField>

    <UiButton :disabled="isLoading" class="border border-dashed rounded-lg flex flex-col items-center justify-center w-full h-[12rem] text-gray-400 font-medium" variant="outline" @drop.prevent="handleDrop" @dragenter.prevent @dragover.prevent @dragleave.prevent @click.stop.prevent="openFileDialog">
      <!-- <PlusIcon class="text-gray-400 w-12 h-12" /> -->
      <div v-if="!isLoading" class="flex flex-col items-center justify-center">
        <span>Drag & Drop/Click to upload</span>
        <span class="my-2">or</span>
        <div class="flex items-center gap-1" @click.stop.prevent>
          <UiInput v-model="externalImageUrl" placeholder="Paste image url" type="text" />
          <UiButton size="icon" class="flex-shrink-0" :disabled="!externalImageUrl.length" @click.stop.prevent="addImage(externalImageUrl)">
            <CheckIcon />
          </UiButton>
        </div>
      </div>

      <div v-else>
        <ReloadIcon class="w-8 h-8 animate-spin" />
      </div>
    </UiButton>
  </div>
</template>
