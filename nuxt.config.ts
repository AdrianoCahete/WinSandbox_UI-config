// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: ['@nuxt/ui'],
  
  // Enable pages directory for filesystem routing
  pages: true,
  
  css: [],
  
  app: {
    head: {
      title: 'Windows Sandbox UI Config',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
