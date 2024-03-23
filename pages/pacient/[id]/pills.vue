<template>
<div v-if="status == 'success'">
  <div v-for="pill in pills" :key="pill.id">
    <span>{{ pill.name }}</span>
  </div>
</div>
</template>

<script setup lang="ts">

const { id } = useRoute().params;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pills = ref<any[]>([]);
const { status } = await useFetch(`/api/pacient/${id}/pills`, {
  method: 'GET',
  transform: (data) => {
    pills.value = data.pills;
  }
});

</script>