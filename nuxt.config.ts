// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: 'https://noti.virgil246.eu.org',
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ['@vuestic/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-lodash'
    , 'nuxt-simple-sitemap'],
  vuestic: {
    config:
    {
    },

  },
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"],
    alias: [
      ["camelCase", "stringToCamelCase"], // => stringToCamelCase
      ["kebabCase", "stringToKebab"], // => stringToKebab
      ["isDate", "isLodashDate"], // => _isLodashDate
    ],
  },

})