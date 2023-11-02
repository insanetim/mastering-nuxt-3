import vsharp from 'vite-plugin-vsharp'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: ['@vueuse/nuxt', '@nuxtjs/supabase', '@pinia/nuxt'],
  supabase: {
    redirect: false
  },
  nitro: {
    prerender: {
      routes: ['/landing']
    }
  },
  vite: {
    plugins: [vsharp()]
  },
  runtimeConfig: {
    stripeSecret: '',
    stripeWebhookSecret: '',
    public: {
      stripeKey: ''
    }
  }
})
