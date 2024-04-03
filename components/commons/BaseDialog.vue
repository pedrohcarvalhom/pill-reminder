<template>
  <AlertDialog v-model:open="open">
    <AlertDialogTrigger>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <slot name="title" />
        </AlertDialogTitle>
        <AlertDialogDescription>
          <slot name="description" />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <slot name="footer-actions" />
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const open = defineModel<boolean>('open', { required: true })
</script>