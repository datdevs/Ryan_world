<template>
  <div>
    <div class="container mx-auto my-10">
      <div
        v-if="article.category"
        class="mb-5"
      >
        <nuxt-link
          :key="article.category.id"
          :class="`bg-${article.category.color}-200 text-${article.category.color}-800 inline-block rounded-md leading-none capitalize font-semibold py-1.5 px-4`"
          :to="{ name: 'categories-slug', params: { slug: article.category.slug } }"
        >
          {{ article.category.name }}
        </nuxt-link>
      </div>
      <div class="mb-10">
        <h1 class="block text-5xl leading-tight font-bold">
          {{ article.title }}
        </h1>
      </div>
      <div
        :class="$style.Block"
        class="relative mb-12 py-2 pl-6"
      >
        <div class="flex items-center">
          <div
            v-if="article.author"
            class="mr-5"
          >
            <img
              :class="$style.Avatar"
              class="rounded-full lazyload"
              :data-src="getStrapiMedia(article.author.picture.url)"
              width="50"
              height="50"
              :alt="article.author.name"
              draggable="false"
            >
          </div>
          <div>
            <span
              v-if="article.author"
              class="block text-lg text-gray-600 font-medium capitalize mb-0.5 dark:text-gray-200"
            >{{ article.author.name }}</span>
            <span class="block text-sm text-gray-400 font-medium">Đăng vào lúc {{ article.created_at | formatTime }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="article.image"
        class="mb-10"
      >
        <img
          :class="$style.Image"
          class="rounded-3xl lazyload"
          :data-src="getStrapiMedia(article.image.url)"
          width="1000"
          height="500"
          :alt="article.image.alternativeText != null ? article.image.alternativeText : article.image.name"
          draggable="false"
          :style="`aspect-ratio:${article.image.width}/${article.image.height}`"
        >
      </div>
      <div
        :class="$style.BoxShadow"
        class="bg-white divide-y divide-gray-300 rounded-3xl mb-10 p-8 dark:bg-gray-800 dark:bg-opacity-30 dark:divide-gray-700"
      >
        <div 
          v-if="article.content"
          :class="$style.Content"
          v-html="$md.render(article.content)"
        />
        <socials-share
          :class="{'mt-10':article.content}"
          class="pt-6"
          url="https://datdevsx.vuji.tech/"
        />
      </div>
      <!-- <div
        :class="$style.BoxShadow"
        class="bg-white dark:bg-gray-900 rounded-3xl mb-20 p-8"
      >
        <facebook-comments url="https://datdevsx.vuji.tech/" />
      </div> -->
      <div
        v-if="relatedArticle.length > 0"
        :class="$style.Block"
        class="relative mt-20 mb-10 py-0.5 pl-8"
      >
        <span class="text-xl font-medium capitalize">Bài viết liên quan</span>
      </div>
      <div v-if="relatedArticle.length > 0">
        <div class="grid grid-cols-2 gap-6">
          <ArticleCard
            v-for="article in relatedArticle"
            :key="`relatedArticle_${article.id}`"
            :image="false"
            :article="article"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from '../../utils/medias'
import { getMetaTags } from '../../utils/seo'
import { formatTime, websiteURL } from '@/utils/filters'

export default {
  filters: {
    formatTime,
    websiteURL
  },
  async asyncData({ $strapi, params }) {
    const matchingArticles = await $strapi.findOne('articles', params.slug)
    const relatedArticle = await $strapi.find('articles', { 
      slug_nin: params.slug,
      ['category.slug']: matchingArticles.category.slug,
      _sort: 'created_at:desc'
    })
    const shuffleArticle = relatedArticle.sort(() => 0.5 - Math.random())
    const limitRelatedArticle = shuffleArticle.slice(0, 4)

    return {
      article: matchingArticles,
      relatedArticle: limitRelatedArticle,
      global: await $strapi.find('global'),
      homepage: await $strapi.find('homepage')
    }
  },
  data() {
    return {
      apiUrl: process.env.strapiBaseUri,
      url: 'http://localhost:3000' + this.$route.fullPath
    }
  },
  head() {
    const { defaultSeo, favicon, siteName } = this.global

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      metaTitle: this.article.title,
      metaDescription: this.article.description,
      shareImage: this.article.image
    }

    return {
      titleTemplate: `%s | ${siteName}`,
      title: fullSeo.metaTitle,
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: 'favicon',
          href: getStrapiMedia(favicon.url)
        }
      ]
    }
  },
  jsonld() {
    const breadcrumbs = [
      {
        name: this.homepage.hero.title,
        url: websiteURL(this.global.site_config.domain, this.global.site_config.ssl)
      },
      {
        name: this.article.title,
        url: websiteURL(`${this.global.site_config.domain}/${this.article.slug}`, this.global.site_config.ssl)
      }
    ]
    const items = breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        '@id': item.url,
        url: item.url,
        name: item.name
      }
    }))
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': websiteURL(`${this.global.site_config.domain}/${this.article.slug}`, this.global.site_config.ssl),
        headline: this.article.title,
        description: this.article.description,
        isPartOf: {
          '@id': websiteURL(`${this.global.site_config.domain}/categories/${this.article.category.slug}`, this.global.site_config.ssl)
        },
        mainEntityOfPage: {
          '@id': websiteURL(`${this.global.site_config.domain}/categories/${this.article.category.slug}`, this.global.site_config.ssl)
        },
        image: [
          this.getStrapiMedia(this.article.image.url)
        ],
        datePublished: this.article.created_at,
        dateModified: this.article.updated_at,
        author: {
          '@type': 'Person',
          name: this.article.author.name,
          url: websiteURL(`${this.global.site_config.domain}/${this.article.author.email}`, this.global.site_config.ssl)
        }
      }
    ]
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style lang="scss" module>
@import '@/assets/scss/variables';

.Block {
  &::after {
    content: '';
    position: absolute;
    background: #718096;
    width: 5px;
    top: 0;
    left: 0;
    bottom: 0;
    border-radius: 100px;
  }
}

.Avatar {
  height: 50px;
  width: 50px;
  object-fit: cover;
}

.Image {
  width: 100%;
}

.BoxShadow {
  box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.08);
}

.Content {
  a {
    color: $alpha-color;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  abbr {
    border-bottom: 1px dotted;
    cursor: help;
  }

  cite {
    font-style: italic;
  }

  hr {
    background: #e6e6e6;
    border: none;
    display: block;
    height: 1px;
    margin-bottom: 1.4em;
    margin-top: 1.4em;
  }

  img {
    vertical-align: text-bottom;
  }

  ins {
    background-color: lime;
    text-decoration: none;
  }

  mark {
    background-color: #ff0;
  }

  small {
    font-size: 0.8em;
  }

  strong {
    font-weight: 700;
  }

  sub,
  sup {
    font-size: 0.8em;
  }

  sub {
    vertical-align: sub;
  }

  sup {
    vertical-align: super;
  }

  p,
  dl,
  ol,
  ul,
  blockquote,
  pre,
  table {
    margin-bottom: 1.4em;
  }

  p:last-child,
  dl:last-child,
  ol:last-child,
  ul:last-child,
  blockquote:last-child,
  pre:last-child,
  table:last-child {
    margin-bottom: 0;
  }

  p:empty {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child,
  h5:first-child,
  h6:first-child {
    margin-top: 0;
  }

  h1 {
    font-size: 2.4em;
    margin-bottom: 0.58333em;
    margin-top: 0.58333em;
    line-height: 1;
  }

  h2 {
    font-size: 1.6em;
    margin-bottom: 0.875em;
    margin-top: 1.75em;
    line-height: 1.1;
  }

  h3 {
    font-size: 1.3em;
    margin-bottom: 1.07692em;
    margin-top: 1.07692em;
  }

  h4 {
    font-size: 1.2em;
    margin-bottom: 1.16667em;
    margin-top: 1.16667em;
  }

  h5 {
    font-size: 1.1em;
    margin-bottom: 1.27273em;
    margin-top: 1.27273em;
  }

  h6 {
    font-size: 1em;
    margin-bottom: 1.4em;
    margin-top: 1.4em;
  }

  dd {
    margin-left: 1.4em;
  }

  ol,
  ul {
    list-style-position: outside;
    margin-left: 1.4em;
  }

  ol {
    list-style-type: decimal;
  }

  ol ol {
    list-style-type: lower-alpha;
  }

  ol ol ol {
    list-style-type: lower-roman;
  }

  ol ol ol ol {
    list-style-type: lower-greek;
  }

  ol ol ol ol ol {
    list-style-type: decimal;
  }

  ol ol ol ol ol ol {
    list-style-type: lower-alpha;
  }

  ul {
    list-style-type: disc;
  }

  ul ul {
    list-style-type: circle;
  }

  ul ul ul {
    list-style-type: square;
  }

  ul ul ul ul {
    list-style-type: circle;
  }

  ul ul ul ul ul {
    list-style-type: disc;
  }

  ul ul ul ul ul ul {
    list-style-type: circle;
  }

  blockquote {
    border-left: 4px solid #e6e6e6;
    padding: 0.6em 1.2em;
  }

  blockquote p {
    margin-bottom: 0;
  }

  code,
  kbd,
  samp,
  pre {
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
    background-color: #f2f2f2;
    color: #333;
    font-size: 0.9em;
  }

  code,
  kbd,
  samp {
    border-radius: 3px;
    line-height: 1.77778;
    padding: 0.1em 0.4em 0.2em;
    vertical-align: baseline;
  }

  pre {
    overflow: auto;
    padding: 1em 1.2em;
  }

  pre code {
    background: none;
    font-size: 1em;
    line-height: 1em;
  }

  figure {
    margin-bottom: 2.8em;
    text-align: center;
  }

  figure:first-child {
    margin-top: 0;
  }

  figure:last-child {
    margin-bottom: 0;
  }

  figcaption {
    font-size: 0.8em;
    margin-top: 0.875em;
  }

  table {
    width: 100%;
  }

  table pre {
    white-space: pre-wrap;
  }

  th,
  td {
    font-size: 1em;
    padding: 0.7em;
    border: 1px solid #e6e6e6;
    line-height: 1.4;
  }

  thead tr,
  tfoot tr {
    background-color: #f5f5f5;
  }

  thead th,
  thead td,
  tfoot th,
  tfoot td {
    font-size: 0.9em;
    padding: 0.77778em;
  }

  thead th code,
  thead td code,
  tfoot th code,
  tfoot td code {
    background-color: #fff;
  }

  tbody tr {
    background-color: #fff;
  }
}
</style>