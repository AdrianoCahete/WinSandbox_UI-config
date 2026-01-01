// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  modules: ["@nuxt/ui"],

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
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
});
