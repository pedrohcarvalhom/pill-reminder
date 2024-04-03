<template>
  <div class="card flex justify-content-center">
    <PrimeSidebar
      v-model:visible="visible"
      position="right"
      header="Pill Reminder"
    >
      <div class="h-full flex">
        <PrimeMenu
          :model="items"
          :pt="{ root: ({ }) => { return 'border-none h-full' } }"
        >
          <template #submenuheader="{ item }">
            <span class="font-bold mr-4">{{ item.label }}</span>
          </template>
        </PrimeMenu>
      </div>
    </PrimeSidebar>
    <Icon
      class="w-6 h-6"
      name="flat-color-icons:settings"
      @click="visible = true"
    />
  </div>
</template>

<script setup lang="ts">
const visible = ref(false)
const colorMode = useColorMode()
const items = ref([
  {
    label: 'Tema',
    items: [
      {
        label: 'Claro',
        command: () => {
          colorMode.preference = 'light'
        }
      },
      {
        label: 'Escuro',
        command: () => {
          colorMode.preference = 'dark'
        }
      }
    ]
  },
  {
    label: 'Ações',
    items: [
      {
        label: 'Logout',
        command: async () => {
          await useSupabaseClient().auth.signOut();
          navigateTo('/login');
        },
      },
    ]
  },
]);
</script>