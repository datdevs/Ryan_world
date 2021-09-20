<template>
  <div>
    <div class="container mx-auto">
      <div
        class="relative rounded-3xl lazyload overflow-hidden"
        :class="{[`${$style.Background} h-96 flex items-center justify-center text-gray-50 mt-5 mb-20`]: category.image}"
        :data-bgset="category.image ? getStrapiMedia(category.image.url) : ''"
      >
        <div
          :class="$style.Title"
          class="relative text-center mt-5 mb-20"
        >
          <h1 class="block text-5xl leading-tight font-bold capitalize tracking-wider">
            {{ category.name }}
          </h1>
          <span
            class="block text-lg mt-4"
            :class="`${category.image ? 'text-gray-200' : 'text-gray-500'}`"
          >{{ page.total }} bài viết</span>
        </div>
      </div>
      <!-- <div class="flex flex-wrap justify-between">
        <button
          class="inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium px-4 py-2 sm:py-2.5 hover:border-gray-300 text-gray-700 border border-gray-200 dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
          @click="openModal"
        >
          Chọn chuyên mục
          <i class="icon ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z" />
            </svg>
          </i>
        </button>
      </div> -->
    </div>
    <Articles
      :articles="articles || []"
      :pagination="page"
    />
    <!-- <Modal
      v-model="modalVisible"
      title="Chọn chuyên mục khác"
    >
      <span>Hello</span>
    </Modal> -->
  </div>
</template>

<script>
import { getMetaTags } from '../../utils/seo'
import { getStrapiMedia } from '../../utils/medias'

export default {
  async asyncData({ $strapi, params, query }) {
    const page = {
      current: parseInt(query.page, 10) || 1,
      size: 9,
      total: await $strapi.count('articles', { 'category.name': params.slug })
    }
    return {
      category: await $strapi.findOne('categories', params.slug),
      articles: await $strapi.find('articles', {
        'category.name': params.slug,
        _sort: 'created_at:desc',
        _start: (page.current - 1) * page.size,
        _limit: page.size
      }),
      global: await $strapi.find('global'),
      page
    }
  },
  data() {
    return {
      modalVisible: false
    }
  },
  head() {
    const { defaultSeo, favicon, siteName } = this.global

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      metaTitle: `${this.category.name} articles`,
      metaDescription: `All articles about ${this.category.name}`
    }

    return {
      title: fullSeo.metaTitle,
      titleTemplate: `%s | ${siteName}`,
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
    getStrapiMedia,
    async fetchData() {
      this.page = {
        current: parseInt(this.$route.query.page, 10) || 1,
        size: 9,
        total: await this.$strapi.count('articles', { 'category.name': this.$route.params.slug })
      }
      this.articles = await this.$strapi.find('articles', {
        'category.name': this.$route.params.slug,
        _sort: 'created_at:desc',
        _start: (this.page.current - 1) * this.page.size,
        _limit: this.page.size
      })
    },
    openModal() {
      this.modalVisible = true
    }
  }
}
</script>

<style lang="scss" module>
.Background {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }

  .Title {
    margin: 0;
    z-index: 5;
  }
}
</style>