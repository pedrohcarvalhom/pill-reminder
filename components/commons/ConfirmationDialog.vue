<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <span> {{ props.title }} </span>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <span> {{ props.description }} </span>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div class="flex items-center justify-end mt-4 gap-2">
          <Button @click="emit('on-confirm')" :disabled="props.loading">
            <Loader2 v-if="props.loading" class="w-4 h-4 mr-2 animate-spin" />
            {{ $t('buttons.save') }}
          </Button>
          <AlertDialogCancel>{{ $t('buttons.cancel') }}</AlertDialogCancel>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const open = defineModel<boolean>('open', { required: true });
const emit = defineEmits(['on-confirm']);
</script>