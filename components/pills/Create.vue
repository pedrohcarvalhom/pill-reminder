<template>
  <PrimeDialog v-model:visible="isRegisteringPill" modal :style="{ width: '90vw' }">
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>{{ $t('pills.form.name') }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="quantity">
        <FormItem>
          <FormLabel>{{ $t('pills.form.quantity') }}</FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="measure">
        <FormItem>
          <FormLabel>{{ $t('pills.form.measure') }}</FormLabel>
          <FormControl>
            <PillsMeasureSelect v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="hour">
        <FormItem>
          <FormLabel>{{ $t('pills.form.time') }}</FormLabel>
          <FormControl>
            <Input type="time" v-bind="componentField" />
          </FormControl>
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const { t } = useI18n();
const isRegisteringPill = defineModel({ default: false, type: Boolean })
const formSchema = toTypedSchema(z.object({
  name: z.string({ required_error: t('pills.form.nameError') }).min(2).max(50),
  quantity: z.number({ required_error: t('pills.form.quantityError') }).positive(),
  hour: z.string({ required_error: t('pills.form.timeError') }),
  measure: z.enum(['mg', 'gr', 'ml', 'full', 'half'])
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>