<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Icon
        class="h-6 w-6 hover:text-red-600 transition-all duration-300 ease-in-out"
        name="ic:baseline-menu"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="$emit('on-delete')">
        Excluir
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

defineEmits(['on-delete']);
</script>