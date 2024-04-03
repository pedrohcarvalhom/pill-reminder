<template>
  <div class="flex flex-col gap-2 w-[250px] md:w-[400px]">
    <Input
      v-model="formInput.name"
      type="text"
      placeholder="Novo nome"
    />
    <Textarea
      v-model="formInput.description"
      placeholder="Nova descrição"
    />
    <div class="flex gap-2">
      <Button
        variant="outline"
        class="border-red-500 text-red-500 hover:text-red-400"
        @click="emit('cancel')"
      >
        {{ $t('buttons.cancel') }}
      </Button>
      <Button
        :disabled="!formInput.name || !formInput.description"
        class="bg-green-500 hover:bg-green-700 hover:text-white"
        @click="emit('save')"
      >
        {{ $t('buttons.save') }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['cancel', 'save']);
const formInput = defineModel({ type: Object, default: { name: "", description: "" } });
</script>