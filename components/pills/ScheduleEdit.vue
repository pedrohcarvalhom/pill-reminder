<template>
  <div class="flex justify-between items-center my-4">
    <span class="text-2xl font-bold text-black dark:text-white">{{
      $t('pills.schedule') }}
    </span>
    <a
      class="flex items-center justify-center transition-all duration-150 ease-in-out"
      :class="disableEditing ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer'"
      @click="onClick"
    >
      <icon
        class="text-red-500 mb-1 mr-1 w-5 h-5"
        name="mdi:pencil-plus-outline"
      />
      <span class="text-lg font-bold mr-1 text-red-500 dark:text-red-300">
        {{ editing ? 'Editando...' : $t('buttons.edit') }}
      </span>
    </a>
  </div>
  <pills-add-hour
    :editing="editing"
    :pill-id="id"
    @cancel="editing = false"
    @created="$emit('on-create')"
  />
</template>

<script setup lang="ts">
const emit = defineEmits(['on-edit-schedule', 'on-create']);
const props = defineProps({
  disableEditing: {
    type: Boolean,
    default: false
  }
});
const { id } = useRoute().params;
const editing = ref(false);

const onClick = () => {
  if (props.disableEditing) return;
  emit('on-edit-schedule');
  editing.value = true;
}
</script>