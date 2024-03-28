<template>
  <div class="container h-[85vh] flex justify-center">
    <div v-if="status == 'pending'">
      <span class="text-2xl font-bold dark:text-white animate-ping">Carregando o paciente...</span>
    </div>
    <div v-if="status == 'success'" class="flex flex-col justify-center sm:w-[400px]">
      <span class="text-center mb-4">Você deseja cadastrar o paciente
        <span class="text-red-500">{{ data?.pacient.name }}</span>?
        A partir de agora, <span class="text-red-500 font-bold">você terá acesso aos remédios e horários de uso
          dele.</span>
      </span>

      <Button variant="outline" class="hover:bg-red-500 dark:bg-slate-50 dark:text-black" @click="registerPacient">
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" /> Cadastrar
      </Button>
      <Button variant="outline" class="bg-red-500 text-white dark:bg-red-800 mt-2" @click="$router.replace('/')">
        Cancelar
      </Button>
    </div>
    <div v-if="status == 'error'">
      <span class="text-2xl font-bold text-red-600 dark:text-red-400">Erro ao carregar o paciente</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { useUserStore } from '~/store/user';

const { id } = useRoute().params;
const { invitedBy } = useRoute().query;
const { user } = storeToRefs(useUserStore());
const loading = ref(false);

const { data, status } = await useFetch(`/api/pacient/${id}/invitation`, {
  method: 'GET',
  query: {
    email: user.value?.email,
    invitedBy: invitedBy?.toString(),
  },
  onResponseError: ({ response }) => {
    console.log(response)
  },
});

async function registerPacient() {
  try {
    loading.value = true;
    await $fetch(`/api/pacient/${id}/invitation`, {
      method: 'POST',
      query: {
        email: user.value?.email,
        invitedBy: invitedBy?.toString(),
      },
    });
    window.alert('Paciente registrado com sucesso!');
    navigateTo('/');
  } catch (error) {
    if (error instanceof Error) {
      if (error.status == '409') {
        window.alert('Você já possui este paciente cadastrado. Redirecionando...');
        setTimeout(() => {
          navigateTo('/')
        }, 1000)
      } else {
        window.alert("Ocorreu um erro ao registrar o paciente. Tente novamente")
      }
    }
  } finally {
    loading.value = false;
  }
}

</script>