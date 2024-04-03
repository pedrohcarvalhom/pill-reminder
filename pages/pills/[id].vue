<template>
  <main class="md:container md:h-screen">
    <div v-if="status == 'success'">
      <header class="mb-10">
        <a
          class="cursor-pointer"
          @click="router.replace('/')"
        >
          <Icon
            class="w-8 h-8 text-red-500 ml-2 my-1"
            name="ri:arrow-left-line"
          />
        </a>
      </header>
      <div class="mx-4">
        <div class="w-20 h-20 rounded-full bg-red-500" />
        <div class="flex items-center justify-between my-8">
          <div
            v-if="!editingPill"
            class="flex flex-col"
          >
            <span class="text-2xl font-bold">{{ data?.pill.name }}</span>
            <span class="text-lg font-medium">{{ data?.pill.description || '-' }}</span>
          </div>
          <pills-edit
            v-else
            v-model="pillForm"
            @cancel="editingPill = false"
            @save="onSaveClicked"
          />
          <div
            v-if="!editingPill"
            class="flex gap-4"
          >
            <commons-action-buttons @edit="setEditMode" />
          </div>
        </div>
        <div class="flex gap-2 mb-4">
          <pills-measure
            :measure="data?.pill.measure"
            :quantity="data?.pill.quantity"
            time="Por dia"
          />
          <pills-time :quantity="data?.pill.when" />
        </div>
        <pills-schedule-edit
          @on-edit-schedule="editing = true"
          @on-create="onCreatedHour"
        />
        <pills-schedule
          :hours="data?.pill.hour"
          :pill-id="id"
          @updated="refresh"
        />
      </div>
    </div>
    <div
      v-else-if="status == 'pending'"
      class="w-full flex justify-center items-center h-screen animate-ping duration-1000"
    >
      <span class="text-2xl font-bold dark:text-white">Carregando o seu remedio...</span>
    </div>
    <div v-else-if="status == 'error'">
      <span class="text-2xl font-bold text-red-600 dark:text-red-400">Erro ao carregar o seu remedio</span>
    </div>
  </main>
</template>

<script setup lang="ts">
const router = useRouter();
const { updatePillInfo } = usePillService();
const { id } = useRoute().params;
const { data, status, refresh } = await useFetch(`/api/pills/${id}`, {
  method: 'GET',
});
const editing = ref(false);
const editingPill = ref(false);
const pillForm = ref({
  name: '',
  description: '',
});

async function onCreatedHour() {
  editing.value = false;
  await refresh();
}

function setEditMode() {
  editing.value = false;
  editingPill.value = true;
}

async function onSaveClicked() {
  try {
    await updatePillInfo(pillForm.value.name, pillForm.value.description, Number(id));
    await refresh();
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  } finally {
    editingPill.value = false;
  }
}
</script>