<template>
  <CardHeader>
    <CardTitle>Bem vindo ao Pill Reminder</CardTitle>
  </CardHeader>
  <CardContent>
    <form @submit="onSubmit">
      <FormField
        v-slot="{ componentField }"
        name="email"
      >
        <FormItem class="mt-4">
          <FormLabel>{{ $t('register.form.email') }}</FormLabel>
          <FormControl>
            <Input
              class="dark:bg-gray-600"
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
              class="dark:bg-gray-600"
              type="password"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex flex-col mt-4">
        <Button class="bg-red-950 dark:bg-gray-200 w-1/2 mx-auto" type="submit">
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          Login
        </Button>
        <Button variant="ghost" class="p-0 mt-1" @click="$emit('dontHaveAccount')">
          {{ $t('register.dontHaveAcount') }}
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
import { useUserStore } from '~/store/user'
import { Loader2 } from 'lucide-vue-next'

const isLoading = ref(false);
const userStore = useUserStore();
const router = useRouter()
const supabase = useSupabaseClient();
const { t } = useI18n();
const formSchema = toTypedSchema(z.object({
  email: z.string({ required_error: t('register.form.emailError') }).email({ message: "Email inválido" }),
  password: z.string({ required_error: t('register.form.passwordError') }).min(6, { message: "Senha inválida" }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    isLoading.value = true
    const { data, error: supabaseError } = await loginSupabase(values)
    const { user } = await loginApi(values)

    if (supabaseError?.message == 'Email not confirmed') {
      window.alert(t('errors.confirm-email'))
      return
    }

    if (!user) {
      window.alert(t('errors.user-not-found'))
      return;
    }

    if (supabaseError?.status) {
      window.alert(t('errors.wrong-password'))
      return;
    }

    if (!user || !data.session) {
      window.alert('Não foi possível definir o usuário. Recarregue a página.')
      return;
    }

    userStore.setUser({
      email: user.email,
      id: user.id,
      name: user.name
    })

    userStore.setUserAuthorization(user.email!, data.session.access_token!)
    router.push('/')
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message)
    }
  } finally {
    isLoading.value = false
  }
})

async function loginSupabase(values: { email: string, password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password
  });

  return { data, error }
}

async function loginApi(values: { email: string, password: string }) {
  const { user } = await $fetch('/api/user', {
    method: 'GET',
    query: {
      email: values.email
    }
  })

  return { user }
}

defineEmits(['dontHaveAccount'])
</script>