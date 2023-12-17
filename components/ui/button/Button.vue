<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { ReloadIcon } from '@radix-icons/vue'
import { buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
    :disabled="loading"
  >
    <slot />
    <ReloadIcon v-if="loading" class="w-4 h-4 ml-2 animate-spin" />
  </Primitive>
</template>
