<template>
  <div>
    <UCard class="sticky top-22">
      <template #header>
        <h2 class="font-semibold">Generated Config</h2>
      </template>

      <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <Shiki class="bg-gray-100 dark:bg-gray-800 overflow-x-auto whitespace-pre-wrap" lang="xml" :code="generatedConfig" />
      </div>
      <template #footer>
        <p class="text-muted text-xs">
          You can copy or download this file in the
          <ULink to="#download-files">end of the page</ULink>
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  config: any;
}>();

const generatedConfig = computed(() => {
  let xml = "<Configuration>\n";

  for (const [key, value] of Object.entries(props.config)) {
    if (key === "MappedFolders" || key === "LogonCommand") {
      continue;
    }

    if (value !== null && value !== undefined) {
      const outputValue =
        typeof value === "boolean" ? (value ? "Enable" : "Disable") : value;
      xml += `  <${key}>${outputValue}</${key}>\n`;
    }
  }

  const mappedFolders = props.config.MappedFolders.filter(
    (folder: any) => folder.HostFolder && folder.HostFolder.trim() !== ""
  );

  if (mappedFolders.length > 0) {
    xml += "  <MappedFolders>\n";
    for (const folder of mappedFolders) {
      xml += "    <MappedFolder>\n";
      xml += `      <HostFolder>${folder.HostFolder}</HostFolder>\n`;
      if (folder.SandboxFolder && folder.SandboxFolder.trim() !== "") {
        xml += `      <SandboxFolder>${folder.SandboxFolder}</SandboxFolder>\n`;
      }
      xml += `      <ReadOnly>${
        folder.ReadOnly === true ? "true" : "false"
      }</ReadOnly>\n`;
      xml += "    </MappedFolder>\n";
    }
    xml += "  </MappedFolders>\n";
  }

  if (props.config.LogonCommand && props.config.LogonCommand.trim() !== "") {
    xml += "  <LogonCommand>\n";
    xml += `    <Command>${props.config.LogonCommand}</Command>\n`;
    xml += "  </LogonCommand>\n";
  }

  xml += "</Configuration>";
  return xml;
});
</script>
