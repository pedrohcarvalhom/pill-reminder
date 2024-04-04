<template>
  <CommonsBaseDialog v-model:open="open">
    <template #trigger>
      <Button>{{ props.buttonLabel }}</Button>
    </template>
    <template #title>
      Cadastro de paciente
    </template>
    <template #description>
      <form @submit.prevent="onSubmit">
        <FormField
          v-slot="{ componentField }"
          name="name"
        >
          <FormItem class="mt-4">
            <FormControl>
              <Input
                v-bind="componentField"
                placeholder="Nome do paciente"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="description"
        >
          <FormItem class="mt-6 flex flex-col">
            <FormLabel>Descreva o seu paciente</FormLabel>
            <FormControl>
              <Textarea
                class="rounded-md p-2"
                v-bind="componentField"
                placeholder="Informações úteis para se lembrar..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex items-center mt-4 gap-2">
          <Button type="submit">
            <Loader2
              v-if="isLoading"
              class="w-4 h-4 mr-2 animate-spin"
            />
            {{ $t('register.form.title') }}
          </Button>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </div>
      </form>
    </template>
  </CommonsBaseDialog>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { AlertDialogCancel } from '@/components/ui/alert-dialog'
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
import { useUserStore } from '~/store/user'

const props = defineProps({
  buttonLabel: {
    type: String,
    default: '+ Cadastrar novo paciente'
  }
});
const emit = defineEmits(['created']);
const open = ref(false);
const isLoading = ref(false);
const { t } = useI18n();
const { user } = storeToRefs(useUserStore());
const formSchema = toTypedSchema(z.object({
  name: z.string({ required_error: "Nome é obrigatório" }).min(2, t('pills.form.nameLength')).max(50, t('pills.form.nameLengthPlus')),
  description: z.string().optional(),
}));
const form = useForm({
  validationSchema: formSchema,
});
const onSubmit = form.handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    await $fetch('/api/pacient', {
      method: 'POST',
      query: {
        email: user.value?.email
      },
      body: {
        name: values.name,
        description: values.description,
      },
    });
    emit('created');
    open.value = false;
  } catch (error) {
    window.alert("Ocorreu um erro ao cadastrar o paciente. Tente novamente")
  } finally {
    isLoading.value = false;
  }
});
</script>