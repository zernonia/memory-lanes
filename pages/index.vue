<script setup lang="ts">
import { colors } from '@/types/enum'

const user = useSupabaseUser()
</script>

<template>
  <div class="mx-auto">
    <section class="flex flex-col p-24 items-center w-full">
      <h1 class="text-5xl lg:text-6xl font-bold text-center">
        Create your Memory Lane for 2023
      </h1>
      <h2 class="my-8 text-3xl lg:text-4xl font-medium text-gray-300 text-center">
        Recap your year by crafting the most memorable timeline <br>
        and share with your friends!
      </h2>

      <UiButton size="lg" as-child>
        <NuxtLink :to=" user?.id ? '/edit' : '/login'">
          Create yours now!
        </NuxtLink>
      </UiButton>
    </section>

    <section class="p-24 flex flex-col items-center">
      <h3 class="text-xl font-medium">
        Checkout some memory lane ❤️
      </h3>

      <div>
        <NuxtLink
          to="/u/zernonia"
          class="bg-[var(--color)] w-64 relative -rotate-2 hover:rotate-2 hover:shadow-xl flex flex-col border-[5px] border-white h-80 rounded-xl p-4 shadow-none transition duration-300 active:scale-[97.5%]"
          :style="{ '--color': colors.Red }"
          draggable="false"
        >
          <div class="flex-1">
            <h5 class="text-lg font-medium">
              My 2023
            </h5>
          </div>
          <div>
            <img class="rounded-full overflow-hidden border-[5px] w-16 h-16 border-white" src="https://lh3.googleusercontent.com/a/ACg8ocKip0dW3LQR3RKSKl5lF1AFabcoqAy1LHJmbGhFZesBRrI=s96-c" alt="zernonia's avatar">
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
