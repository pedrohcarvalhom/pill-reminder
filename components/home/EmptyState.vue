<template>
  <div class="w-full md:w-[500px] md:mx-auto h-[50vh] flex flex-col items-center justify-center px-2">
    <span class="text-2xl font-bold my-2">Bem vindo ao <span class="text-red-500">Pill Reminder.</span></span>
    <span class="text-center font-medium mb-4">
      Para começar, <span class="text-red-500">cadastre um paciente.</span> É por ele que iremos cadastrar os remédios
      necessários e compartilhar entre usuários!
    </span>
    <PacientDialog @created="$emit('created')" />
  </div>
</template>

<script setup lang="ts">
defineEmits(['created']);
</script>