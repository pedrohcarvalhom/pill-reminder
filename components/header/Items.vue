<template>
  <div class="card flex justify-content-center">
    <PrimeSidebar v-model:visible="visible" position="right" header="Pill Reminder">
      <div class="h-full flex">
        <PrimeMenu :model="items" :pt="{ root: ({ }) => { return 'border-none h-full' } }">
          <template #submenuheader="{ item }">
            <span class="font-bold">{{ item.label }}</span>
          </template>
        </PrimeMenu>
      </div>
    </PrimeSidebar>
    <Icon class="w-6 h-6" name="flat-color-icons:settings" @click="visible = true" />
  </div>
</template>

<script setup lang="ts">
const visible = ref(false)

const items = ref([
  {
    label: 'Remédios',
    items: [
      {
        label: 'Adicionar',
      },
      {
        label: 'Editar',
      }
    ]
  },
]);
</script>