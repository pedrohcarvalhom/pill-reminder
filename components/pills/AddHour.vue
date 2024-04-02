<template>
  <div class="mt-2">
    <div v-show="props.editing" class="flex items-center gap-2">
      <Input v-model="hourSelected" class="my-2 ml-auto w-40 bg-red-50" type="time" />
      <div>
        <a :class="hourSelected ? 'cursor-pointer' : 'cursor-not-allowed'"
          class="cursor-pointer transition-all duration-150 ease-in-out" @click="saveHour">
          <Icon class="w-8 h-8 transition-all duration-150 ease-in-out" name="icon-park-solid:check-one"
            :class="hourSelected ? 'text-green-500' : 'text-gray-400'" />
        </a>
        <a class="cursor-pointer" @click="emit('cancel')">
          <Icon class="w-8 h-8 text-red-500" name="icon-park-solid:close-one" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
const emit = defineEmits(['cancel', 'created']);

async function saveHour() {
  if (!hourSelected.value) return;

  try {
    const { success } = await $fetch(`/api/hours/${props.pillId}`, {
      method: 'POST',
      body: {
        hour: hourSelected.value
      },
    });

    if (success) emit('created');
  } catch (error) {
    window.alert("Ocorreu um erro ao adicionar a hora. Tente novamente")
  } finally {
    emit('cancel');
  }
}
</script>