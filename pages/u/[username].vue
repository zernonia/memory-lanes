<script setup lang="ts">
import { groupBy } from 'lodash-es'
import { format } from 'date-fns'
import type { Database } from '~/types/database'

const route = useRoute()
const username = computed(() => route.params.username ?? '')

const el = ref<HTMLElement>()
// const { width } = useElementSize(el)
// const { x } = useScroll(el)
onMounted(() => {
  if (!el.value)
    return

  el.value.addEventListener('wheel', (event) => {
    event.preventDefault()
    const isMouse = 'wheelDelta' in event && Math.abs(event.wheelDelta as number) > 100
    const offset = isMouse ? event.deltaY : event.deltaX

    el.value?.scroll({
      left: el.value.scrollLeft + offset,
      behavior: isMouse ? 'smooth' : 'instant',
    })
  })
})

const client = useSupabaseClient<Database>()

const { data } = await useAsyncData(`events-${username.value}`, async () => {
  const { data } = await client
    .from('events')
    .select('*, profiles!inner(slug)')
    .eq('profiles.slug', username.value)
    .order('date', { ascending: true })
  return data
})

const groupedEvents = computed(() => groupBy(data.value, 'date'))
</script>

<template>
  <div ref="el" class="no-scrollbar overflow-auto">
    <div class="flex h-full w-full">
      <template v-if="Object.keys(groupedEvents).length">
        <div v-for="(group, key) of groupedEvents" :key="key" class="shrink-0 w-[60vw] md:w-[300px] xl:w-[20vw] relative flex flex-col">
          <div class="text-center pb-4">
            <span class="font-medium ">{{ format(new Date(key), 'd MMM') }}</span>
          </div>

          <div class="grid grid-rows-4 grid-flow-row-dense h-full p-1 pb-24">
            <EventCard v-for="event in group" :key="event.id" :event="event" />
          </div>
        </div>
      </template>

      <div v-else class="w-screen flex items-center justify-center">
        <span class="text-muted-foreground font-semibold">No events yet</span>
      </div>
    </div>
  </div>
</template>
