<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem class="mt-4">
        <FormLabel>Nome do paciente</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem class="mt-10 flex flex-col">
        <FormLabel>Descreva o seu paciente</FormLabel>
        <FormControl>
          <Textarea class="rounded-md p-2" v-bind="componentField" placeholder="Informações úteis para se lembrar..." />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const { t } = useI18n();
const formSchema = toTypedSchema(z.object({
  name: z.string({ required_error: "Nome é obrigatório" }).min(2, t('pills.form.nameLength')).max(50, t('pills.form.nameLengthPlus')),
  description: z.string().optional(),
}))

const form = useForm({
  validationSchema: formSchema,
})
const onSubmit = form.handleSubmit(async (values) => {
  console.log(values)
})
</script>