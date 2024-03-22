<template>
  <Card class="w-full h-20 flex p-2 my-1 border border-b-slate-100">
    <div class="flex items-center">
      <div class="h-10 w-10 bg-red-500 rounded-full"></div>
      <CardHeader class="mt-2">
        <CardTitle>{{ pacient.name }}</CardTitle>
        <CardDescription>{{ pacient.description }}</CardDescription>
      </CardHeader>
    </div>
    <CardFooter class="flex items-center mt-5 ml-auto">
      <PacientDropdown />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
const pacient = {
  name: 'Pacient Name',
  description: 'Pacient Description',
  id: 1,
}
</script>