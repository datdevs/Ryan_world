<template>
  <div
    data-aos="fade-up"
    :data-aos-delay="index % 3 - 1 === 0 ? '200' : index % 3 === 2 ? '300' : '100'"
  >
    <div
      :class="$style.Wrap"
      class="h-full relative overflow-hidden rounded-3xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-transparent hover:shadow-xl dark:bg-gray-800 dark:bg-opacity-30 dark:border-gray-700 dark:hover:bg-opacity-100"
    >
      <div v-if="image && article.image">
        <nuxt-link
          :key="article.id"
          class="block"
          :to="{ name: 'articles-slug', params: { slug: article.slug } }"
        >
          <img
            :class="$style.Image"
            class="lazyload"
            :data-src="getStrapiMedia(article.image.url)"
            width="320"
            height="180"
            :alt="article.image.alternativeText != null ? article.image.alternativeText : article.image.name"
            draggable="false"
          >
        </nuxt-link>
      </div>
      <div class="p-6">
        <div
          v-if="article.category"
          class="mb-3"
        >
          <nuxt-link
            :key="article.category.id"
            :class="`bg-${article.category.color}-200 text-${article.category.color}-800 inline-block rounded-md text-xs leading-none capitalize font-semibold py-1.5 px-4`"
            :to="{ name: 'categories-slug', params: { slug: article.category.slug } }"
          >
            {{ article.category.name }}
          </nuxt-link>
        </div>
        <div class="mb-3">
          <nuxt-link
            :key="article.id"
            :class="$style.Title"
            class="block text-lg font-semibold"
            :to="{ name: 'articles-slug', params: { slug: article.slug } }"
          >
            {{ article.title }}
          </nuxt-link>
        </div>
        <div
          :class="$style.Description"
          class="text-gray-400 dark:text-gray-500 mb-3"
        >
          <span>{{ article.description }}</span>
        </div>
        <div class="text-gray-500 text-sm leading-none font-medium">
          <span class="inline-flex items-center">
            <i class="icon text-base mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256c141.4 0 256-114.6 256-256C512 114.6 397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM358.1 287.2L280 242.1V120C280 106.8 269.3 96 256 96S232 106.8 232 120V256c0 8.578 4.578 16.5 12 20.78l90.06 52C337.8 330.1 341.1 332 346 332c8.281 0 16.36-4.297 20.8-12C373.5 308.5 369.5 293.8 358.1 287.2z" />
              </svg>
            </i>
            {{ article.created_at | formatTime }}</span>
        </div>
      </div>
      <nuxt-link
        :key="article.id"
        class="block absolute inset-0"
        :to="{ name: 'articles-slug', params: { slug: article.slug } }"
      />
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from '../utils/medias'
import { formatTime } from '../utils/filters'

export default {
  filters: {
    formatTime
  },
  props: {
    index: {
      type: Number,
      default: 1
    },
    image: {
      type: Boolean,
      default: true
    },
    article: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style lang="scss" module>
.Wrap {
  // box-shadow: 1px 1px 6px 0 rgba(1, 1, 1, 0.1);
  // height: 100%;
  transition-property: box-shadow, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  // &:hover {
  //   box-shadow: 0px 2px 4px rgba(46, 41, 51, 0.08), 0px 5px 10px rgba(71, 63, 79, 0.16);
  //   transform: translateY(-0.25rem);
  // }
}

.Image {
  height: 200px;
  width: 100%;
  object-fit: cover;

  &:not(:global(.lazyloaded)) {
    &::after {
      content: 'Đang tải...';
    }
  }
}

.Title,
.Description {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
