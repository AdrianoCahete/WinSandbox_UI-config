<template>
  <div
    v-for="(propData, propKey) in toggleProperties"
    :id="`opt-${propKey}`"
    :key="propKey"
    class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
  >
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <label
          class="text-base font-medium text-gray-900 dark:text-white block mb-1"
        >
          {{ propData.label }}
        </label>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ propData.description }}
        </p>
      </div>
      <USwitch v-model="config[propKey]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import propertiesData from "../../../data/properties.json";

defineProps<{
  config: any;
}>();

const toggleProperties = computed(() => {
  const props: any = {};
  for (const [key, value] of Object.entries(propertiesData)) {
    if (value.type === "toggle") {
      props[key] = value;
    }
  }
  return props;
});
</script>
