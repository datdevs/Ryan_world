<template>
  <div class="bg-white dark:bg-gray-900">
    <Header
      :logo="logo"
      :pagetitle="global.siteName"
    >
      <nav-menu :categories="categories" />
      <search-bar />
      <switch-mode />
    </Header>
    <nuxt keep-alive />
    <Footer :settings="global" />
  </div>
</template>

<script>
import { getStrapiMedia } from '../utils/medias'
import { websiteURL } from '@/utils/filters'

export default {
  filters: {
    websiteURL
  },
  data() {
    return {
      global: null,
      logo: null,
      categories: []
    }
  },
  async fetch() {
    this.categories = await this.$strapi.find('categories')
    const global = await this.$strapi.find('global')
    this.global = global
    this.logo = getStrapiMedia(global.logo.url)
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      url: websiteURL(this.global.site_config.domain, this.global.site_config.ssl),
      name: this.global.siteName,
      logo: {
        '@id': this.logo
      }
    }
  },
  mounted() {
    if (this.global.app_id && this.global.app_id.fb_app_id) {
      const fb_app_id = this.global.app_id.fb_app_id;
      (async () => {
        const { integrateFacebookSDK, initFacebookSDK } = await import('../utils/init.js')
        integrateFacebookSDK(document, 'script', 'facebook-jssdk')
        initFacebookSDK(fb_app_id)
      })()
    }
  }
}
</script>
