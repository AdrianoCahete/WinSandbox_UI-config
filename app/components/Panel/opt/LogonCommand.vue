<template>
  <div
    id="opt-LogonCommand"
    class="border-t border-gray-200 dark:border-gray-700 pt-6"
  >
    <div class="flex items-center gap-2 mb-2">
      <label class="text-base font-medium text-gray-900 dark:text-white">
        {{ propertiesData.LogonCommand.label }}
      </label>
      <UIcon
        v-if="hasEmptyLogonCommand"
        name="i-heroicons-exclamation-triangle"
        class="w-4 h-4 text-yellow-500"
      />
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
      {{ propertiesData.LogonCommand.description }}
    </p>
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-3">
      {{ propertiesData.LogonCommand.detailedInfo }}
    </p>
    <UInput
      v-model="config.LogonCommand"
      placeholder="C:\Users\WDAGUtilityAccount\Desktop\script.ps1"
      @change="checkForCustomConfig"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import propertiesData from "../../../data/properties.json";

const props = defineProps<{
  config: any;
}>();

const emit = defineEmits<{
  update: [];
}>();

const hasEmptyLogonCommand = computed(() => {
  return props.config.LogonCommand && props.config.LogonCommand.trim() === "";
});

const checkForCustomConfig = () => {
  emit("update");
};
</script>
