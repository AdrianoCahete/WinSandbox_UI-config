<template>
  <div
    id="opt-MappedFolders"
    class="border-t border-gray-200 dark:border-gray-700 pt-6"
  >
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <label class="text-base font-medium text-gray-900 dark:text-white">
          {{ propertiesData.MappedFolders.label }}
        </label>
        <UIcon
          v-if="hasEmptyMappedFolders"
          name="i-heroicons-exclamation-triangle"
          class="w-4 h-4 text-yellow-500"
        />
      </div>
      <UButton
        @click="addMappedFolder"
        icon="i-heroicons-plus"
        size="xs"
        color="primary"
      >
        Add Folder
      </UButton>
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
      {{ propertiesData.MappedFolders.description }}
    </p>
    <UAlert
      v-if="propertiesData.MappedFolders.warning"
      icon="i-heroicons-exclamation-triangle"
      color="warning"
      variant="subtle"
      class="mb-3"
      title="Security Warning"
      :description="propertiesData.MappedFolders.warning"
    />
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-3">
      💡 Windows 11 23H2+: You can use environment variables like
      %USERPROFILE%, %TEMP%, %ProgramFiles%
    </p>

    <div v-if="config.MappedFolders.length > 0" class="space-y-3">
      <div
        v-for="(folder, index) in config.MappedFolders"
        :key="index"
        class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <div class="flex items-start gap-2">
          <div class="flex-1 space-y-2">
            <div>
              <label
                class="text-xs font-medium text-gray-600 dark:text-gray-400"
              >
                Host Folder
              </label>
              <UInput
                v-model="folder.HostFolder"
                placeholder="C:\Users\%USERNAME%\Documents"
                class="mt-1 w-full"
                @change="checkForCustomConfig"
              />
            </div>
            <div>
              <label
                class="text-xs font-medium text-gray-600 dark:text-gray-400"
              >
                Sandbox Folder
              </label>
              <UInput
                v-model="folder.SandboxFolder"
                placeholder="C:\Users\WDAGUtilityAccount\Desktop\Documents"
                class="mt-1 w-full"
                @change="checkForCustomConfig"
              />
            </div>
            <div class="flex items-center gap-2">
              <UCheckbox
                v-model="folder.ReadOnly"
                @change="checkForCustomConfig"
                label="Read-only (recommended for security)"
              />
            </div>
          </div>
          <UButton
            @click="removeMappedFolder(index)"
            icon="i-heroicons-trash"
            size="xs"
            color="error"
            variant="ghost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import propertiesData from "../../../data/properties.json";

const props = defineProps<{
  config: any;
  currentProfile: string;
}>();

const emit = defineEmits<{
  update: [];
}>();

const hasEmptyMappedFolders = computed(() => {
  return props.config.MappedFolders.some(
    (folder: any) => !folder.HostFolder || folder.HostFolder.trim() === ""
  );
});

const addMappedFolder = () => {
  const isSecureProfile =
    props.currentProfile === "Secure" || props.currentProfile === "Balanced";
  props.config.MappedFolders.push({
    HostFolder: "",
    SandboxFolder: "",
    ReadOnly: isSecureProfile,
  });
  checkForCustomConfig();
};

const removeMappedFolder = (index: number) => {
  props.config.MappedFolders.splice(index, 1);
  checkForCustomConfig();
};

const checkForCustomConfig = () => {
  emit("update");
};
</script>
