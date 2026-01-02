<template>
  <div class="mb-8">
    <UCard>
      <div class="flex gap-3 flex-wrap">
        <UFieldGroup orientation="horizontal">
          <UButton
            v-for="profileName in Object.keys(profiles)"
            :key="profileName"
            @click="loadProfile(profileName)"
            :variant="
              currentProfile === profileName && !isCustomConfig
                ? 'solid'
                : 'outline'
            "
            color="primary"
          >
            {{ profileName }}
          </UButton>
        </UFieldGroup>

        <UButton v-if="isCustomConfig" variant="solid" color="neutral" disabled>
          Custom
        </UButton>
      </div>

      <p
        v-if="!isCustomConfig && currentProfile"
        class="mt-2 text-sm text-gray-600 dark:text-gray-400"
      >
        {{ profiles[currentProfile].description }}
      </p>
      <p
        v-else-if="isCustomConfig"
        class="mt-2 text-sm text-gray-600 dark:text-gray-400"
      >
        Custom configuration - settings have been manually adjusted
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  profiles: Record<string, any>;
  currentProfile: string;
  isCustomConfig: boolean;
}>();

const emit = defineEmits<{
  loadProfile: [profileName: string];
}>();

const loadProfile = (profileName: string) => {
  emit("loadProfile", profileName);
};
</script>
