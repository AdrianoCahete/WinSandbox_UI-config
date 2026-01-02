<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />

    <UContainer class="py-8">
      <PanelProfiles
        :profiles="profiles"
        :current-profile="currentProfile"
        :is-custom-config="isCustomConfig"
        @load-profile="loadProfile"
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PanelOptions :config="config" :current-profile="currentProfile" @update="checkForCustomConfig" />
        <PanelResults :config="config" />
      </div>

      <PanelDownload :config="config" />
    </UContainer>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const {
  profiles,
  config,
  currentProfile,
  isCustomConfig,
  loadProfile,
  checkForCustomConfig,
} = useProfileManager();
</script>
