<template>
<Card class="mx-2 rounded-xl bg-gray-50">
  <CardHeader>
    <CardTitle class="text-2xl">
      {{ medicine.name }}
    </CardTitle>
  </CardHeader>

  <CardContent>
    <CardDescription>
      {{ medicine.amount }}, {{ medicine.when }}, {{ medicine.time }}
    </CardDescription>
  </CardContent>
</Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const medicine = ref({
  name: "Dipirona",
  amount: 10,
  when: "At lunch",
  time: "12:00 AM"
})
</script>