<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Windows Sandbox Configuration
      </h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Panel - Form -->
        <div class="space-y-6">
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">Configuration Options</h2>
            </template>
            
            <!-- Form Groups -->
            <div class="space-y-6">
              <!-- Group 1: vGPU -->
              <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-base font-medium text-gray-900 dark:text-white">
                    vGPU (Virtual GPU)
                  </label>
                  <USwitch 
                    v-model="config.vgpu.enabled"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enable or disable GPU virtualization sharing. When enabled, the sandbox can share the host's GPU for hardware acceleration.
                </p>
              </div>

              <!-- Group 2: Networking -->
              <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-base font-medium text-gray-900 dark:text-white">
                    Networking
                  </label>
                  <USwitch 
                    v-model="config.networking.enabled"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Control network access for the sandbox. When disabled, the sandbox will have no network connectivity.
                </p>
              </div>

              <!-- Group 3: Protected Client -->
              <div class="pb-2">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-base font-medium text-gray-900 dark:text-white">
                    Protected Client
                  </label>
                  <USwitch 
                    v-model="config.protectedClient.enabled"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Adds additional security hardening to the sandbox. When enabled, provides extra isolation for sensitive operations.
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Right Panel - Configuration Output -->
        <div>
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">Generated Configuration</h2>
            </template>
            
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <pre class="text-sm text-gray-800 dark:text-gray-200 font-mono overflow-x-auto">{{ generatedConfig }}</pre>
            </div>
            
            <template #footer>
              <div class="flex justify-end">
                <UButton 
                  @click="copyToClipboard"
                  icon="i-heroicons-clipboard-document"
                  color="primary"
                >
                  Copy to Clipboard
                </UButton>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Configuration state
const config = ref({
  vgpu: {
    enabled: true
  },
  networking: {
    enabled: true
  },
  protectedClient: {
    enabled: false
  }
})

// Template for Windows Sandbox configuration
const configTemplate = `<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <vGPU>{vgpu}</vGPU>
  <Networking>{networking}</Networking>
  <ProtectedClient>{protectedClient}</ProtectedClient>
</Configuration>`

// Generate configuration based on current selections
const generatedConfig = computed(() => {
  return configTemplate
    .replace('{vgpu}', config.value.vgpu.enabled ? 'Enable' : 'Disable')
    .replace('{networking}', config.value.networking.enabled ? 'Enable' : 'Disable')
    .replace('{protectedClient}', config.value.protectedClient.enabled ? 'Enable' : 'Disable')
})

// Copy configuration to clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedConfig.value)
    // Could add a toast notification here
    console.log('Configuration copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
