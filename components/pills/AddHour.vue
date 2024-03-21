<template>
  <div class="mt-2">
    <div v-show="props.editing" class="flex items-center gap-2">
      <Input v-model="hourSelected" class="my-2 ml-auto w-40 bg-red-50" type="time" />
      <div>
        <a @click="saveHour">
          <Icon class="w-8 h-8 transition-all duration-150 ease-in-out" name="icon-park-solid:check-one"
            :class="hourSelected ? 'text-green-500' : 'text-gray-400'" />
        </a>
        <a @click="emit('cancel')">
          <Icon class="w-8 h-8 text-red-500" name="icon-park-solid:close-one" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePillStore } from '@/store/pill';
const props = defineProps({
  pillId: {
    type: String,
    required: true
  },
  editing: {
    type: Boolean,
    default: false
  },
})
const hourSelected = ref("");
const emit = defineEmits(['cancel']);
const { addNewHourToPill } = usePillStore();

async function saveHour() {
  try {
    const { hour, pillId } = await $fetch(`/api/pills/update_hour/${props.pillId}`, {
      method: 'POST',
      body: {
        hour: hourSelected.value
      },
    });
    addNewHourToPill(pillId, hour);
  } catch (error) {
    window.alert("Ocorreu um erro ao adicionar a hora. Tente novamente")
  } finally {
    emit('cancel');
  }
}
</script>