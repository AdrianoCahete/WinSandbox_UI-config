<template>
  <UHeader>
    <template #left>
      <h1 class="text-xl font-bold">Windows Sandbox Configuration</h1>
    </template>
    <template #right>
      <div class="flex items-center gap-3">
        <UColorModeButton />
        <UButton
          to="https://github.com/AdrianoCahete/WinSandbox_UI-config"
          target="_blank"
          icon="i-simple-icons-github"
          variant="ghost"
          color="neutral"
          aria-label="GitHub Repository"
        />
      </div>
    </template>
  </UHeader>
</template>
