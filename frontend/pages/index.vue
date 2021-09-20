<template>
  <div>
    <Banner />
    <Articles
      :articles="articles || []"
      :pagination="page"
    />
  </div>
</template>

<script>
import { getMetaTags } from '@/utils/seo'
import { getStrapiMedia } from '@/utils/medias'

export default {
  async asyncData({ $strapi, query }) {
    const page = {
      current: parseInt(query.page, 10) || 1,
      size: 9,
      total: await $strapi.count('articles')
    }
    return {
      articles: await $strapi.find('articles', {
        _sort: 'created_at:desc',
        _start: (page.current - 1) * page.size,
        _limit: page.size
      }),
      homepage: await $strapi.find('homepage'),
      global: await $strapi.find('global'),
      page
    }
  },
  head() {
    const { seo } = this.homepage
    const { defaultSeo, favicon, siteName } = this.global

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      ...seo
    }

    return {
      titleTemplate: `%s | ${siteName}`,
      title: this.homepage.hero.title,
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: 'favicon',
          href: getStrapiMedia(favicon.url)
        }
      ]
    }
  },
  watch: {
    '$route.query': 'fetchData'
  },
  updated() {
    window.scrollTo(0, 0)
  },
  methods: {
    async fetchData() {
      this.page = {
        current: parseInt(this.$route.query.page, 10) || 1,
        size: 9,
        total: await this.$strapi.count('articles')
      }
      this.articles = await this.$strapi.find('articles', {
        _sort: 'created_at:desc',
        _start: (this.page.current - 1) * this.page.size,
        _limit: this.page.size
      })
    }
  }
}
</script>
