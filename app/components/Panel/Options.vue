<template>
  <div class="space-y-6">
    <UCard>
      <div class="space-y-6">
        <PanelOptSwitch :config="config" />
        <PanelOptMemory :config="config" />
        <PanelOptMappedFolders
          :config="config"
          :current-profile="currentProfile"
          @update="emit('update')"
        />
        <PanelOptLogonCommand :config="config" @update="emit('update')" />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  config: any;
  currentProfile: string;
}>();

const emit = defineEmits<{
  update: [];
}>();
</script>
