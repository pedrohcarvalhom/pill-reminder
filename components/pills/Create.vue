<template>
  <PrimeDialog
    v-model:visible="isRegisteringPill"
    modal
    :style="{ width: '90vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <span class="text-xl font-bold mb-4">{{ $t('pills.form.title') }}</span>
    <form @submit="onSubmit">
      <FormField
        v-slot="{ componentField }"
        name="name"
      >
        <FormItem class="mt-4">
          <FormLabel>{{ $t('pills.form.name') }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="description"
      >
        <FormItem class="mt-5 flex flex-col">
          <FormLabel>Descrição do remédio</FormLabel>
          <FormControl>
            <Textarea
              class="rounded-md p-2"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription>Informações úteis para se lembrar</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="pacient"
      >
        <FormItem class="mt-4">
          <FormLabel>Paciente</FormLabel>
          <FormControl>
            <PillsPacientSelect
              :pacients="props.pacients"
              :pacient-selected="props.selectedPacient"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="measure"
      >
        <FormItem class="mt-4">
          <FormLabel>{{ $t('pills.form.measure') }}</FormLabel>
          <FormControl>
            <PillsMeasureSelect v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="quantity"
      >
        <FormItem class="mt-4">
          <FormLabel>{{ $t('pills.form.quantity') }}</FormLabel>
          <FormControl>
            <Input
              type="number"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription>{{ $t('pills.form.quantityHint') }}</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="when">
        <FormItem class="mt-4">
          <FormLabel>Quantas vezes por semana?</FormLabel>
          <FormControl>
            <PillsTimesAtWeek v-bind="componentField" />
          </FormControl>
          <FormMessage />
          <FormDescription>Ex.: Preciso dar 2 gotas, 3 vezes por semana...</FormDescription>
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
      <Button class="mt-4" type="submit" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        {{ $t('buttons.save') }}
      </Button>
    </form>
  </PrimeDialog>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
import type { PacientResponse } from '~/types/types'
import { Loader2 } from 'lucide-vue-next'

const emit = defineEmits(['created'])
const props = defineProps({
  pacients: {
    type: Array as PropType<PacientResponse[]>,
    default: () => []
  },
  selectedPacient: {
    type: Object,
    default: undefined
  }
})

const isRegisteringPill = defineModel({
  type: Boolean,
  default: false,
})
const isLoading = ref(false);
const { t } = useI18n();
const formSchema = toTypedSchema(z.object({
  name: z.string({ required_error: t('pills.form.nameError') }).min(2, t('pills.form.nameLength')).max(50, t('pills.form.nameLengthPlus')),
  description: z.string().optional(),
  when: z.number({ required_error: 'Campo obrigatório', invalid_type_error: 'Deve ser um número' }).min(1, 'Deve ser maior que 0').max(7, t('pills.form.invalidQtd')),
  quantity: z.number({ required_error: t('pills.form.quantityError'), invalid_type_error: t('pills.form.invalidQtd') }).positive(t('pills.form.invalidQtd')),
  hour: z.string({ required_error: t('pills.form.timeError'), invalid_type_error: t('pills.form.timeError') }),
  measure: z.enum(['mg', 'gr', 'ml', 'full', 'half', 'drops']),
  pacient: z.number({ required_error: "Paciente obrigatório" }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const userStore = useUserStore()
const onSubmit = form.handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const body = {
      ...values,
    }
    await $fetch('/api/pills', {
      method: 'POST',
      body,
      query: {
        email: userStore.user?.email
      }
    });

    window.alert("Remédio cadastrado com sucesso! Por favor, recarregue a página para vê-los")
    emit('created');
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  } finally {
    isLoading.value = false
  }


  isRegisteringPill.value = false
});
</script>