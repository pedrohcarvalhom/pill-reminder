<template>
  <CardHeader>
    <CardTitle>Bem vindo ao Pill Reminder</CardTitle>
  </CardHeader>
  <CardContent>
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="mt-4">
          <FormLabel>{{ $t('register.form.email') }}</FormLabel>
          <FormControl>
            <Input type="email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="mt-4">
          <FormLabel>{{ $t('register.form.password') }}</FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex flex-col mt-4">
        <Button class=" bg-red-950 w-1/2 mx-auto" type="submit">Login</Button>
        <Button variant="ghost" class="p-0 mt-1" @click="$emit('dontHaveAccount')">Não possui uma conta?
          Registre-se</Button>
      </div>
    </form>
  </CardContent>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useUserStore } from '~/store/user'

const userStore = useUserStore();
const router = useRouter()
const supabase = useSupabaseClient();
const { t } = useI18n();
const formSchema = toTypedSchema(z.object({
  email: z.string({ required_error: t('register.form.emailError') }).email(),
  password: z.string({ required_error: t('register.form.passwordError') }).min(6),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  const { data, error } = await loginSupabase(values)
  const { data: user, error: apiError } = await loginApi(values)

  if (error?.message == 'Email not confirmed') {
    window.alert('Por favor confirme seu email')
    return
  }

  if (error || apiError.value) {
    window.alert('Email ou senha inválidos')
    return;
  }

  if (!user.value || !data.session) {
    window.alert('Não foi possível definir o usuário. Recarregue a página.')
    return;
  }

  userStore.setUser({
    email: user.value.user!.email,
    id: user.value.user!.id,
    name: user.value.user!.name
  })

  userStore.setUserAuthorization(user.value.user!.email!, data.session.access_token!)

  router.push('/')
})

async function loginSupabase(values: { email: string, password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password
  });

  return { data, error }
}

async function loginApi(values: { email: string, password: string }) {
  const { data, error } = await useFetch('/api/user', {
    method: 'GET',
    query: {
      email: values.email
    }
  })
  return { data, error }
}

defineEmits(['dontHaveAccount'])
</script>