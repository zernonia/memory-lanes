<script setup lang="ts">
import { format } from 'date-fns'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from 'radix-vue'
import type { Database, Event } from '~/types'

const user = useSupabaseUser()
const client = useSupabaseClient<Database>()
const { data } = await useAsyncData(`events`, async () => {
  const { data } = await client
    .from('events')
    .select('*')
    .eq('user_id', user.value!.id)
    .order('date', { ascending: true })
  return data
})

const store = useEditStore()

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="flex w-full h-auto p-4">
    <ul class="w-2/5 pr-8">
      <AccordionRoot type="single" collapsible>
        <AccordionItem v-for="event in data" :key="event.id" :value="event.id" class="mb-4">
          <AccordionTrigger class="px-3 py-2 text-sm rounded-lg border border-yellow-200 data-[state=open]:bg-yellow-200 hover:bg-yellow-100 bg-yellow-50">
            <span>{{ format(new Date(event.date), 'MMM dd') }} - </span>
            <span>{{ event.title }}</span>
          </AccordionTrigger>

          <AccordionContent class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <EventSettings :event="event" class="p-4" />
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </ul>

    <div class="w-3/5 h-full rounded-xl bg-gray-50 flex items-center justify-center">
      <EventCard v-if="store.event" class="!w-[300px] max-h-[50vh]" :event="store.event" />
    </div>
  </div>
</template>
