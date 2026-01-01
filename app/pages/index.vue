<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Windows Sandbox Configuration
      </h1>
      
      <!-- Profile Selection -->
      <div class="mb-8">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Quick Profiles</h2>
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Selected:</span>
                <span class="text-sm font-bold text-primary-600 dark:text-primary-400">
                  {{ isCustomConfig ? 'Custom' : currentProfile }}
                </span>
              </div>
            </div>
          </template>
          <div class="flex gap-3 flex-wrap">
            <UButton 
              v-for="profileName in Object.keys(profiles)" 
              :key="profileName"
              @click="loadProfile(profileName)"
              :variant="currentProfile === profileName && !isCustomConfig ? 'solid' : 'outline'"
              color="primary"
            >
              {{ profileName }}
            </UButton>
            <UButton 
              v-if="isCustomConfig"
              variant="solid"
              color="gray"
              disabled
            >
              Custom
            </UButton>
          </div>
          <p v-if="!isCustomConfig && currentProfile" class="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {{ profiles[currentProfile].description }}
          </p>
          <p v-else-if="isCustomConfig" class="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Custom configuration - settings have been manually adjusted
          </p>
        </UCard>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Panel - Form -->
        <div class="space-y-6">
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">Configuration Options</h2>
            </template>
            
            <!-- Form Groups -->
            <div class="space-y-6">
              <!-- Toggle Options -->
              <div 
                v-for="(propData, propKey) in toggleProperties" 
                :key="propKey"
                class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-2"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <label class="text-base font-medium text-gray-900 dark:text-white">
                      {{ propData.label }}
                    </label>
                    <UButton
                      icon="i-heroicons-information-circle"
                      size="xs"
                      variant="ghost"
                      color="gray"
                      @click="showInfo(propKey)"
                    />
                  </div>
                  <USelectMenu
                    v-model="config[propKey]"
                    :options="propData.values"
                    class="w-32"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ propData.description }}
                </p>
              </div>

              <!-- Memory Option -->
              <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <label class="text-base font-medium text-gray-900 dark:text-white">
                      {{ propertiesData.MemoryInMB.label }}
                    </label>
                    <UButton
                      icon="i-heroicons-information-circle"
                      size="xs"
                      variant="ghost"
                      color="gray"
                      @click="showInfo('MemoryInMB')"
                    />
                  </div>
                  <UInput
                    v-model.number="config.MemoryInMB"
                    type="number"
                    :min="propertiesData.MemoryInMB.min"
                    :max="propertiesData.MemoryInMB.max"
                    class="w-32"
                  />
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ propertiesData.MemoryInMB.description }}
                </p>
              </div>

              <!-- Third-Party Software Installation -->
              <div class="pt-4">
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Additional Software (Coming Soon)
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  These options will automatically install software in the sandbox using PowerShell scripts.
                </p>
                
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <UCheckbox
                        v-model="installOptions.winget"
                        :disabled="true"
                      />
                      <label class="text-sm font-medium text-gray-400 dark:text-gray-500">
                        Install winget (Windows Package Manager)
                      </label>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <UCheckbox
                        v-model="installOptions.msstore"
                        :disabled="true"
                      />
                      <label class="text-sm font-medium text-gray-400 dark:text-gray-500">
                        Install Microsoft Store
                      </label>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <UCheckbox
                        v-model="installOptions.vscode"
                        :disabled="true"
                      />
                      <label class="text-sm font-medium text-gray-400 dark:text-gray-500">
                        Install Visual Studio Code
                      </label>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <UCheckbox
                        v-model="installOptions.git"
                        :disabled="true"
                      />
                      <label class="text-sm font-medium text-gray-400 dark:text-gray-500">
                        Install Git
                      </label>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <UCheckbox
                        v-model="installOptions.chrome"
                        :disabled="true"
                      />
                      <label class="text-sm font-medium text-gray-400 dark:text-gray-500">
                        Install Google Chrome
                      </label>
                    </div>
                  </div>
                </div>
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
              <pre class="text-sm text-gray-800 dark:text-gray-200 font-mono overflow-x-auto whitespace-pre-wrap">{{ generatedConfig }}</pre>
            </div>
            
            <template #footer>
              <div class="flex justify-end gap-2">
                <UButton 
                  @click="copyToClipboard"
                  icon="i-heroicons-clipboard-document"
                  variant="outline"
                >
                  Copy to Clipboard
                </UButton>
              </div>
            </template>
          </UCard>
        </div>
      </div>

      <!-- Download Button -->
      <div class="mt-6">
        <UCard>
          <div class="flex flex-col items-center gap-4">
            <div class="flex items-center gap-3">
              <UButton 
                @click="downloadConfig"
                icon="i-heroicons-arrow-down-tray"
                size="lg"
                color="primary"
              >
                Download Configuration (.wsb)
              </UButton>
              
              <UButton 
                @click="downloadAsZip"
                icon="i-heroicons-archive-box-arrow-down"
                size="lg"
                variant="outline"
                :disabled="!hasAdditionalFiles"
              >
                Download as ZIP (with scripts)
              </UButton>
            </div>
            <p v-if="hasAdditionalFiles" class="text-sm text-gray-500 dark:text-gray-400">
              ZIP includes .wsb file and PowerShell installation scripts
            </p>
            <p v-else class="text-sm text-gray-500 dark:text-gray-400">
              ZIP download available when additional software is selected
            </p>
          </div>
        </UCard>
      </div>
    </UContainer>

    <!-- Info Modal -->
    <UModal v-model="infoModalOpen">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">{{ selectedPropInfo?.label }}</h3>
        </template>
        
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            {{ selectedPropInfo?.detailedInfo }}
          </p>
          <UButton
            v-if="selectedPropInfo?.docUrl"
            :to="selectedPropInfo.docUrl"
            target="_blank"
            icon="i-heroicons-arrow-top-right-on-square"
            variant="outline"
          >
            View Microsoft Documentation
          </UButton>
        </div>
        
        <template #footer>
          <div class="flex justify-end">
            <UButton @click="infoModalOpen = false" variant="soft">
              Close
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import propertiesData from '../data/properties.json'
import defaultProfile from '../data/profiles/default.json'
import secureProfile from '../data/profiles/secure.json'
import communityProfile from '../data/profiles/community.json'
import balancedProfile from '../data/profiles/balanced.json'

// Load all profiles
const profiles: Record<string, any> = {
  'Default': defaultProfile,
  'Secure': secureProfile,
  'Community': communityProfile,
  'Balanced': balancedProfile
}

// Configuration state - using Default profile values
const config = ref({
  vGPU: 'Disable',
  Networking: 'Enable',
  AudioInput: 'Disable',
  VideoInput: 'Disable',
  ProtectedClient: 'Disable',
  PrinterRedirection: 'Disable',
  ClipboardRedirection: 'Enable',
  MemoryInMB: 4096
})

// Additional software installation options (disabled for now)
const installOptions = ref({
  winget: false,
  msstore: false,
  vscode: false,
  git: false,
  chrome: false
})

// Check if any additional files are needed
const hasAdditionalFiles = computed(() => {
  return Object.values(installOptions.value).some(v => v === true)
})

// Current profile tracking
const currentProfile = ref('Default')
const isCustomConfig = ref(false)

// Watch for config changes to detect custom modifications
watch(config, (newConfig) => {
  // Check if current config matches any profile
  let matchesProfile = false
  for (const [profileName, profile] of Object.entries(profiles)) {
    const profileConfig = profile.config
    const matches = Object.keys(profileConfig).every(key => {
      return profileConfig[key] === newConfig[key]
    })
    if (matches) {
      matchesProfile = true
      if (currentProfile.value !== profileName) {
        currentProfile.value = profileName
        isCustomConfig.value = false
      }
      break
    }
  }
  
  if (!matchesProfile && !isCustomConfig.value) {
    isCustomConfig.value = true
  }
}, { deep: true })

// Info modal state
const infoModalOpen = ref(false)
const selectedPropInfo = ref<any>(null)

// Get toggle properties (exclude MemoryInMB which is handled separately)
const toggleProperties = computed(() => {
  const props: any = {}
  for (const [key, value] of Object.entries(propertiesData)) {
    if (value.type === 'toggle') {
      props[key] = value
    }
  }
  return props
})

// Load a profile
const loadProfile = (profileName: string) => {
  const profile = profiles[profileName]
  if (profile) {
    currentProfile.value = profileName
    isCustomConfig.value = false
    config.value = { ...profile.config }
  }
}

// Show info modal
const showInfo = (propKey: string) => {
  selectedPropInfo.value = propertiesData[propKey]
  infoModalOpen.value = true
}

// Generate configuration XML
const generatedConfig = computed(() => {
  let xml = '<?xml version="1.0" encoding="utf-8"?>\n<Configuration>\n'
  
  // Add each property - only include non-default values or always include them
  for (const [key, value] of Object.entries(config.value)) {
    if (value !== null && value !== undefined) {
      xml += `  <${key}>${value}</${key}>\n`
    }
  }
  
  xml += '</Configuration>'
  return xml
})

// Copy configuration to clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedConfig.value)
    console.log('Configuration copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Download configuration as .wsb file
const downloadConfig = () => {
  const blob = new Blob([generatedConfig.value], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  
  // Generate filename with current date
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const filename = `WinSandbox_${year}-${month}-${day}.wsb`
  
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Download as ZIP with PowerShell scripts (placeholder for now)
const downloadAsZip = async () => {
  // This will be implemented later when PS1 scripts are added from GitHub
  console.log('ZIP download will be available when PowerShell scripts are integrated from GitHub')
  
  // Placeholder: Show what would be included
  alert('ZIP download feature coming soon!\n\nWill include:\n- WinSandbox configuration (.wsb)\n- PowerShell installation scripts (.ps1)\n- Scripts fetched from external GitHub repositories')
}

// Initialize with Default profile on mount
loadProfile('Default')
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
