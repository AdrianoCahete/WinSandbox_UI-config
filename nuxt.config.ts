// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  modules: ["@nuxt/ui", "nuxt-shiki"],

  future: {
    compatibilityVersion: 4,
  },

  routeRules: {
    "/": { prerender: true },
  },

  app: {
    head: {
      title: "Windows Sandbox UI Config",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  shiki: {
    bundledLangs: ["xml"],
    bundledThemes: ["github-light", "material-theme-palenight"],
    defaultTheme: {
      light: "github-light",
      dark: "material-theme-palenight",
    },
  },

  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
});
