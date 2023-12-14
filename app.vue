<script setup lang="ts">
import { useChat } from "ai/vue"

const { messages, input, handleInputChange, handleSubmit } = useChat({
  headers: { "Content-Type": "application/json" }
})


</script>


<template>
  <div class="p-4">
    <div class="flex items-center max-w-[24rem]">
      <UiInput v-model="input" @keydown.enter="handleSubmit"></UiInput>
      <UiButton @click="handleSubmit">Submit</UiButton>
    </div>
    <div>
      <div v-for="m in messages" :key="m.id" class="whitespace-pre-wrap"> {{ m.role === "user" ? "User: " : "AI: " }} {{
        m.content }} </div>
    </div>
  </div>
</template>
