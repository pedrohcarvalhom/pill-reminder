<template>
  <CardHeader>
    <CardTitle>Bem vindo ao Pill Reminder</CardTitle>
  </CardHeader>
  <CardContent>
    <form @submit="onSubmit">
      <FormField
        v-slot="{ componentField }"
        name="name"
      >
        <FormItem class="mt-4">
          <FormLabel>{{ $t('register.form.name') }}</FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="email"
      >
        <FormItem class="mt-4">
          <FormLabel>{{ $t('register.form.email') }}</FormLabel>
          <FormControl>
            <Input
              type="email"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="password"
      >
        <FormItem class="mt-4">
          <FormLabel>{{ $t('register.form.password') }}</FormLabel>
          <FormControl>
            <Input
              type="password"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex flex-col mt-4">
        <Button
          class=" bg-red-950 w-1/2 mx-auto"
          type="submit"
        >
          Criar conta
        </Button>
        <Button
          variant="ghost"
          class="p-0 mt-1"
          @click="$emit('haveAccount')"
        >
          Já possui uma conta? Faça login
        </Button>
      </div>
    </form>
  </CardContent>
</template>

<script setup lang="ts">
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const supabase = useSupabaseClient();
const { t } = useI18n();
const formSchema = toTypedSchema(z.object({
  name: z.string({ required_error: t('register.form.nameError') }).min(2).max(50),
  email: z.string({ required_error: t('register.form.emailError') }).email(),
  password: z.string({ required_error: t('register.form.passwordError') }).min(6),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  const { name, email, password } = values
  const { supabaseError } = await signUpToSupabase({ name, email, password })
  const { apiError } = await registerUser({ name, email })

  if (apiError.value?.statusCode == 409) {
    window.alert(apiError.value.statusMessage)
    return;
  } else if (supabaseError) {
    window.alert("Ocorreu um erro ao criar o usuário. Tente novamente")
    return;
  } else if (apiError.value) {
    window.alert("Ocorreu um erro ao salvar o usuário. Tente novamente")
    return;
  }

  window.alert("Usuário criado com sucesso! Por favor confirme seu email cadastrado.")
  emit('haveAccount')
})

async function signUpToSupabase({ name, email, password }: { name: string, email: string, password: string }) {
  const { data, error: supabaseError } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: 'http://localhost:3000/login',
      data: {
        full_name: name
      }
    },
  });

  return { data, supabaseError }
}

async function registerUser({ name, email }: { name: string, email: string }) {
  const { error: apiError } = useAsyncData('user', async () => await $fetch('/api/user', {
    method: 'POST',
    body: {
      name: name,
      email: email
    },
    headers: {
      'Content-Type': 'application/json'
    },
  }))

  return { apiError }
}

const emit = defineEmits(['haveAccount'])
</script>