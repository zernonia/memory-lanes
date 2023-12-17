<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from '@/components/ui/toast'

const user = useSupabaseUser()
const { profile } = useProfile()

const profileFormSchema = toTypedSchema(z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    })
    .optional(),
  handler: z
    .string()
    .min(3, {
      message: 'Handler must be at least 3 characters',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    username: profile.value?.username ?? undefined,
    handler: profile.value?.slug ?? '',
    email: user.value?.email,
  },
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Profile
    </h3>
    <p class="text-sm text-muted-foreground">
      This is how others will see you on the site.
    </p>
  </div>
  <UiSeparator />
  <form class="space-y-8" @submit="onSubmit">
    <UiFormField v-slot="{ componentField }" name="username">
      <UiFormItem>
        <UiFormLabel>Username</UiFormLabel>
        <UiFormControl>
          <UiInput type="text" placeholder="" v-bind="componentField" />
        </UiFormControl>
        <UiFormDescription>
          This is your public display name. It can be your real name or a pseudonym.
        </UiFormDescription>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="handler">
      <UiFormItem>
        <UiFormLabel>Handler</UiFormLabel>
        <UiFormControl>
          <UiInput type="text" placeholder="" v-bind="componentField" />
        </UiFormControl>
        <UiFormDescription>
          This is your public handler.
        </UiFormDescription>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>

    <UiFormField v-slot="{ componentField }" name="email">
      <UiFormItem>
        <UiFormLabel>Email</UiFormLabel>

        <UiInput v-bind="componentField" disabled />
        <UiFormDescription>
          You can manage verified email addresses in your email settings.
        </UiFormDescription>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>

    <div class="flex gap-2 justify-start">
      <UiButton type="submit">
        Update profile
      </UiButton>

      <UiButton
        type="button"
        variant="outline"
        @click="resetForm"
      >
        Reset form
      </UiButton>
    </div>
  </form>
</template>
