
<template>
  <Button variant="outline" class="w-full hover:bg-green-500 hover:text-white" @click="emit('on-edit')">
    {{ $t('buttons.edit') }}
  </Button>
  <Button variant="outline" class="w-full hover:bg-red-500 hover:text-white" @click="open = true">
    {{ $t('buttons.remove') }}
  </Button>
  <CommonsBaseDialog v-model:open="open">
    <template #title>
      <span> {{ props.title }} </span>
    </template>
    <template #description>
      <span> {{ props.description }} </span>
      <div class="flex items-center justify-end mt-4 gap-2">
        <Button @click="onConfirm" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          {{ $t('buttons.remove') }}
        </Button>
        <AlertDialogCancel>{{ $t('buttons.cancel') }}</AlertDialogCancel>
      </div>
    </template>
  </CommonsBaseDialog>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  onConfirmClicked: {
    type: Function,
    required: true
  },
});
const open = ref(false);
const isLoading = ref(false);
const emit = defineEmits(['on-edit']);

const onConfirm = async () => {
  try {
    isLoading.value = true;
    await props.onConfirmClicked();
  } finally {
    isLoading.value = false;
  }
}
</script>