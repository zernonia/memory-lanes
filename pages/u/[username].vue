<script setup lang="ts">
import { groupBy } from 'lodash-es'
import { format } from 'date-fns'
import type { Database } from '~/types/database'

const route = useRoute()
const username = computed(() => route.params.username ?? '')

const el = ref<HTMLElement>()
// const { } = useScroll(el)
onMounted(() => {
  if (!el.value)
    return

  el.value.addEventListener('wheel', (event) => {
    event.preventDefault()
    // el.value?.scrollLeft += event.deltaY
    el.value?.scroll({
      left: el.value.scrollLeft + event.deltaY,
      // behavior: 'smooth',
    })
  })
})

const client = useSupabaseClient<Database>()
const { data } = await useAsyncData(`events-${username.value}`, async () => {
  const { data } = await client
    .from('events')
    .select('*, profiles(slug)')
    .eq('profiles.slug', username.value)
    .order('date', { ascending: true })
  return data
})

const groupedEvents = computed(() => groupBy(data.value, 'date'))
</script>

<template>
  <div ref="el" class=" overflow-x-hidden">
    <div class="flex h-full w-full">
      <div v-for="(group, key) of groupedEvents" :key="key" class="shrink-0 w-[20vw] relative flex flex-col">
        <div class="text-center border-b pb-4">
          <span class="font-medium ">{{ format(new Date(key), 'd MMM') }}</span>
        </div>

        <div class="grid grid-rows-4 grid-flow-row-dense h-full border-r p-1 pb-24">
          <div v-for="event in group" :key="event.id" class="bg-yellow-100 w-full h-full rounded-xl p-4">
            {{ event.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
