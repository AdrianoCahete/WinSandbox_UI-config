<template>
  <div id="opt-Memory" class="pb-0">
    <div class="flex items-center justify-between mb-2">
      <label class="text-base font-medium text-gray-900 dark:text-white">
        {{ propertiesData.MemoryInMB.label }}
      </label>
      <UInputNumber
        v-model="config.MemoryInMB"
        :default-value="config.MemoryInMB"
        :formatOptions="{ style: 'unit', unit: 'megabyte' }"
        :min="propertiesData.MemoryInMB.min"
        class="w-2/5"
        :step="256"
      />
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      {{ propertiesData.MemoryInMB.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import propertiesData from "../../../data/properties.json";

defineProps<{
  config: any;
}>();
</script>
