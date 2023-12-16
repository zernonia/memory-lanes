<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Item {
  title: string
  to: string
}

const route = useRoute()

const sidebarNavItems: Item[] = [
  {
    title: 'Profile',
    to: '/settings/profile',
  },
]
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <UiButton
      v-for="item in sidebarNavItems"
      :key="item.title"
      as-child
      variant="ghost"
      :class="cn(
        'w-full text-left justify-start',
        route.path === item.to && 'bg-muted hover:bg-muted',
      )"
    >
      <NuxtLink :to="item.to">
        {{ item.title }}
      </NuxtLink>
    </UiButton>
  </nav>
</template>
