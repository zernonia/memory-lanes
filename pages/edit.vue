<script setup lang="ts">
import { format } from 'date-fns'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from 'radix-vue'
import type { Database, Event } from '~/types'

const user = useSupabaseUser()
const client = useSupabaseClient<Database>()
const { data, refresh } = await useAsyncData(`events`, async () => {
  const { data } = await client
    .from('events')
    .select('*')
    .eq('user_id', user.value!.id)
    .order('date', { ascending: true })
  return data
})

const store = useEditStore()
const activeId = ref('')

function handleSave(id?: string) {
  if (id)
    activeId.value = id
  refresh()
}
async function handleDelete() {
  if (!store.event?.id)
    return
  await client.from('events').delete().eq('id', store.event?.id)
  refresh()
}

watch(activeId, (n) => {
  // If no tab is selected, clear event in store
  if (n === undefined)
    store.event = undefined
})

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="flex w-full h-auto p-4">
    <ul class="w-1/2 pr-8">
      <AccordionRoot v-model="activeId" type="single" collapsible class="mt-8">
        <AccordionItem value="new" class="mb-4">
          <AccordionTrigger as-child>
            <UiButton>Create new event</UiButton>
          </AccordionTrigger>

          <AccordionContent class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <EventSettings class="p-4" @save="handleSave" />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem v-for="event in data" :key="event.id" :value="event.id" class="mb-4">
          <AccordionTrigger class="px-3 py-2 text-sm rounded-lg border transition-all border-none data-[state=open]:bg-gray-200 hover:bg-gray-200 bg-muted">
            <span>{{ format(new Date(event.date), 'MMM dd') }} - </span>
            <span>{{ event.title }}</span>
          </AccordionTrigger>

          <AccordionContent class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <EventSettings :event="event" class="p-4" @save="handleSave" @delete="handleDelete" />
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </ul>

    <div class="w-1/2 h-[calc(100vh-7rem)] sticky top-[5.5rem] rounded-xl bg-muted flex items-center justify-center">
      <div class="h-full grid grid-rows-4 ">
        <EventCard v-if="store.event" class="row-start-2 !w-[300px] max-h-[50vh]" :event="store.event" />
      </div>
    </div>
  </div>
</template>
