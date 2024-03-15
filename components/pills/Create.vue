<template>
  <PrimeDialog v-model:visible="isRegisteringPill" modal :style="{ width: '90vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <span class="text-xl font-bold mb-4">{{ $t('pills.form.title') }}</span>
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem class="mt-4">
          <FormLabel>{{ $t('pills.form.name') }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="description">
        <FormItem class="mt-5 flex flex-col">
          <FormLabel>Descrição do remédio</FormLabel>
          <FormControl>
            <Textarea class="border border-black rounded-md p-2" v-bind="componentField" />
          </FormControl>
          <FormDescription>Informações úteis para se lembrar</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="measure">
        <FormItem class="mt-4">
          <FormLabel>{{ $t('pills.form.measure') }}</FormLabel>
          <FormControl>
            <PillsMeasureSelect v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="quantity">
        <FormItem class="mt-4">
          <FormLabel>{{ $t('pills.form.quantity') }}</FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="when">
        <FormItem class="mt-4">
          <FormLabel>Quantas vezes por semana? (Apenas números)</FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" />
          </FormControl>
          <FormMessage />
          <FormDescription>Ex.: 1 vez por semana, 2 vezes...</FormDescription>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="hour">
        <FormItem class="mt-4">
          <FormLabel>{{ $t('pills.form.time') }}</FormLabel>
          <FormControl>
            <Input type="time" v-bind="componentField" />
          </FormControl>
          <FormDescription>{{ $t('pills.form.timeDescription') }}</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button class="mt-4" type="submit">{{ $t('buttons.save') }}</Button>
    </form>
  </PrimeDialog>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { useUserStore } from '~/store/user'
import { usePillStore } from '~/store/pill'

const isRegisteringPill = defineModel({
  type: Boolean,
  default: false,
})
const { t } = useI18n();
const formSchema = toTypedSchema(z.object({
  name: z.string({ required_error: t('pills.form.nameError') }).min(2, t('pills.form.nameLength')).max(50, t('pills.form.nameLengthPlus')),
  description: z.string().optional(),
  when: z.number({ required_error: 'Campo obrigatório', invalid_type_error: 'Deve ser um número' }).min(1, 'Deve ser maior que 0').max(7, t('pills.form.invalidQtd')),
  quantity: z.number({ required_error: t('pills.form.quantityError'), invalid_type_error: t('pills.form.invalidQtd') }).positive(t('pills.form.invalidQtd')),
  hour: z.string({ required_error: t('pills.form.timeError'), invalid_type_error: t('pills.form.timeError') }),
  measure: z.enum(['mg', 'gr', 'ml', 'full', 'half'])
}))

const form = useForm({
  validationSchema: formSchema,
})

const userStore = useUserStore()
const { setPill } = usePillStore()
const onSubmit = form.handleSubmit(async (values) => {
  try {
    const body = {
      ...values,
      email: userStore.email,
    }
    const { pill } = await $fetch('/api/pills', {
      method: 'POST',
      body
    });

    setPill({ hours: pill.hours, id: pill.id, name: pill.name, quantity: pill.quantity, measure: pill.measure })
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorConverted = error as any

    if (errorConverted.status === 401) {
      window.alert("Não autenticado, faça login novamente.")
      return
    } else {
      window.alert(errorConverted.message)
    }
  }


  isRegisteringPill.value = false
})
</script>