<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Windows Sandbox Configuration
      </h1>

      <div class="mb-8">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Quick Profiles</h2>
              <div class="flex items-center justify-between gap-2">
                <span
                  class="text-sm font-medium text-gray-600 dark:text-gray-400"
                  >Selected:</span
                >
                <span
                  class="text-sm font-bold text-primary-600 dark:text-primary-400"
                >
                  {{ isCustomConfig ? "Custom" : currentProfile }}
                </span>
              </div>
            </div>
          </template>
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

            <UButton
              v-if="isCustomConfig"
              variant="solid"
              color="neutral"
              disabled
            >
              Custom
            </UButton>
          </div>

          <p
            v-if="!isCustomConfig && currentProfile"
            class="mt-3 text-sm text-gray-600 dark:text-gray-400"
          >
            {{ profiles[currentProfile].description }}
          </p>
          <p
            v-else-if="isCustomConfig"
            class="mt-3 text-sm text-gray-600 dark:text-gray-400"
          >
            Custom configuration - settings have been manually adjusted
          </p>
        </UCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Panel - Form -->
        <div class="space-y-6">
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">Options</h2>
            </template>

            <div class="space-y-6">
              <div
                v-for="(propData, propKey) in toggleProperties"
                :key="propKey"
                class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-2"
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
                  <USwitch
                    v-model="config[propKey]"
                  />
                </div>
              </div>

              <!-- Memory Option -->
              <div class="pb-6">
                <div class="flex items-center justify-between mb-2">
                  <!-- TODO: Change values by multiple (to match memory multiples) -->
                  <label
                    class="text-base font-medium text-gray-900 dark:text-white"
                  >
                    {{ propertiesData.MemoryInMB.label }}
                  </label>
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

              <!-- Mapped Folders -->
              <div class="pb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
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
                  <!-- TODO: Make it easier drag&drop the variables into the input fields -->
                  💡 Windows 11 23H2+: You can use environment variables like %USERPROFILE%, %TEMP%, %ProgramFiles%
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
                          <label class="text-xs font-medium text-gray-600 dark:text-gray-400">
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
                          <label class="text-xs font-medium text-gray-600 dark:text-gray-400">
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
                <p v-else class="text-sm text-gray-400 dark:text-gray-500 italic">
                  No folders mapped. Click "Add Folder" to share folders with the sandbox.
                </p>
              </div>

              <!-- Logon Command -->
              <div class="pb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
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
                  placeholder='C:\Users\WDAGUtilityAccount\Desktop\script.ps1'
                  @change="checkForCustomConfig"
                  class="w-full"
                />
              </div>

              <!-- Third-Party Software Installation -->
              <!-- <div class="pt-4">
                <h3
                  class="text-lg font-semibold mb-4 text-gray-900 dark:text-white"
                >
                  Additional Software (Coming Soon)
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  These options will automatically install software in the
                  sandbox using PowerShell scripts.
                </p>

                <div class="space-y-3">
                  <div
                    v-for="(optionData, optionKey) in installOptionsData"
                    :key="optionKey"
                    class="flex items-center justify-between"
                  >
                    <div class="flex items-center gap-2">
                      <UCheckbox
                        v-model="installOptions[optionKey]"
                        :disabled="true"
                      />
                      <label
                        class="text-sm font-medium text-gray-400 dark:text-gray-500"
                      >
                        {{ optionData.label }}
                      </label>
                    </div>
                  </div>
                </div>
              </div> -->

            </div>
          </UCard>
        </div>

        <!-- Right Panel - Configuration Output -->
        <div>
          <UCard class="sticky top-8">
            <template #header>
              <h2 class="text-xl font-semibold">Generated Configuration</h2>
            </template>

            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <!-- TODO: Add a XML theme here -->
              <pre
                class="text-sm text-gray-800 dark:text-gray-200 font-mono overflow-x-auto whitespace-pre-wrap"
                >{{ generatedConfig }}</pre
              >
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
                <!-- TODO: Add a toast after copied -->
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

              <!-- <UButton
                @click="downloadAsZip"
                icon="i-heroicons-archive-box-arrow-down"
                size="lg"
                variant="outline"
                :disabled="!hasAdditionalFiles"
              >
                Download as ZIP (with scripts)
              </UButton> -->
            </div>
            <!-- <div>
              <p
                v-if="hasAdditionalFiles"
                class="text-sm text-gray-500 dark:text-gray-400"
              >
                ZIP includes .wsb file and PowerShell installation scripts
              </p>
              <p v-else class="text-sm text-gray-500 dark:text-gray-400">
                ZIP download available when additional software is selected
              </p>
            </div> -->
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import installOptionsData from "../data/installOptions.json";
import balancedProfile from "../data/profiles/balanced.json";
import communityProfile from "../data/profiles/community.json";
import defaultProfile from "../data/profiles/default.json";
import secureProfile from "../data/profiles/secure.json";
import propertiesData from "../data/properties.json";

const profiles: Record<string, any> = {
  Default: defaultProfile,
  Secure: secureProfile,
  Community: communityProfile,
  Balanced: balancedProfile,
};

const config = ref({ ...defaultProfile.config });

const installOptions = ref(
  Object.fromEntries(
    Object.entries(installOptionsData).map(([key, value]) => [
      key,
      value.enabled,
    ])
  )
);

// const hasAdditionalFiles = computed(() => {
//   return Object.values(installOptions.value).some((v) => v === true);
// });

const currentProfile = ref("Default");
const isCustomConfig = ref(false);

watch(
  config,
  (newConfig) => {
    let matchesProfile = false;
    for (const [profileName, profile] of Object.entries(profiles)) {
      const profileConfig = profile.config;
      const matches = Object.keys(profileConfig).every((key) => {
        if (key === 'MappedFolders' || key === 'LogonCommand') {
          return true;
        }
        const profileValue = profileConfig[key] === 'Enable' ? true : profileConfig[key] === 'Disable' ? false : profileConfig[key];
        return profileValue === newConfig[key];
      });
      if (matches) {
        matchesProfile = true;
        currentProfile.value = profileName;
        isCustomConfig.value = false;
        break;
      }
    }

    if (!matchesProfile) {
      isCustomConfig.value = true;
    }
  },
  { deep: true }
);

const toggleProperties = computed(() => {
  const props: any = {};
  for (const [key, value] of Object.entries(propertiesData)) {
    if (value.type === "toggle") {
      props[key] = value;
    }
  }
  return props;
});

// Computed for validation warnings
const hasEmptyMappedFolders = computed(() => {
  return config.value.MappedFolders.some(
    (folder: any) => !folder.HostFolder || folder.HostFolder.trim() === ""
  );
});

const hasEmptyLogonCommand = computed(() => {
  return (
    config.value.LogonCommand &&
    config.value.LogonCommand.trim() === ""
  );
});

// Functions for Mapped Folders
const addMappedFolder = () => {
  const isSecureProfile = currentProfile.value === "Secure" || currentProfile.value === "Balanced";
  config.value.MappedFolders.push({
    HostFolder: "",
    SandboxFolder: "",
    ReadOnly: isSecureProfile,
  });
  checkForCustomConfig();
};

const removeMappedFolder = (index: number) => {
  config.value.MappedFolders.splice(index, 1);
  checkForCustomConfig();
};

const checkForCustomConfig = () => {
  config.value = { ...config.value };
};

const loadProfile = (profileName: string) => {
  const profile = profiles[profileName];
  if (profile) {
    currentProfile.value = profileName;
    isCustomConfig.value = false;
    const profileConfig = { ...profile.config };
    for (const [key, value] of Object.entries(profileConfig)) {
      if (value === 'Enable') {
        profileConfig[key] = true;
      } else if (value === 'Disable') {
        profileConfig[key] = false;
      }
    }
    config.value = profileConfig;
  }
};

const generatedConfig = computed(() => {
  let xml = '<!-- Generated by Windows Sandbox Web Config Tool - https://github.com/AdrianoCahete/WinSandbox_UI-config -->\n';
  xml += '<Configuration>\n';

  for (const [key, value] of Object.entries(config.value)) {
    if (key === 'MappedFolders' || key === 'LogonCommand') {
      continue;
    }

    if (value !== null && value !== undefined) {
      const outputValue = typeof value === 'boolean' ? (value ? 'Enable' : 'Disable') : value;
      xml += `  <${key}>${outputValue}</${key}>\n`;
    }
  }

  const mappedFolders = config.value.MappedFolders.filter(
    (folder: any) => folder.HostFolder && folder.HostFolder.trim() !== ''
  );

  if (mappedFolders.length > 0) {
    xml += '  <MappedFolders>\n';
    for (const folder of mappedFolders) {
      xml += '    <MappedFolder>\n';
      xml += `      <HostFolder>${folder.HostFolder}</HostFolder>\n`;
      if (folder.SandboxFolder && folder.SandboxFolder.trim() !== '') {
        xml += `      <SandboxFolder>${folder.SandboxFolder}</SandboxFolder>\n`;
      }
      xml += `      <ReadOnly>${folder.ReadOnly === true ? 'true' : 'false'}</ReadOnly>\n`;
      xml += '    </MappedFolder>\n';
    }
    xml += '  </MappedFolders>\n';
  }

  if (config.value.LogonCommand && config.value.LogonCommand.trim() !== '') {
    xml += '  <LogonCommand>\n';
    xml += `    <Command>${config.value.LogonCommand}</Command>\n`;
    xml += '  </LogonCommand>\n';
  }

  xml += "</Configuration>";
  return xml;
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedConfig.value);
    // TODO: Add a toaster
    console.log("Configuration copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

const downloadConfig = () => {
  const blob = new Blob([generatedConfig.value], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const filename = `WinSandbox_${year}-${month}-${day}.wsb`;

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// const downloadAsZip = async () => {
//   console.log(
//     "ZIP download will be available when PowerShell scripts are integrated from GitHub"
//   );
//   // alert('ZIP download feature coming soon!\n\nWill include:\n- WinSandbox configuration (.wsb)\n- PowerShell installation scripts (.ps1)\n- Scripts fetched from external GitHub repositories')
// };

loadProfile("Default");
</script>
