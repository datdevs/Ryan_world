<template>
  <div
    v-if="totalPage != 0 && totalPage != 1"
    class="text-center"
  >
    <div
      :class="$style.Pagination"
      class="inline-flex items-center rounded-full p-1 bg-gray-50 dark:bg-gray-800"
    >
      <button
        v-if="page != 1"
        :class="$style.Controller"
        class="rounded-full inline-flex items-center leading-none py-3 px-8 transition-colors hover:bg-alpha hover:text-white dark:bg-gray-700 dark:text-gray-200"
        @click="prev"
      >
        <i class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z" />
          </svg>
        </i>
      </button>
      <span class="text-gray-500 mx-5 dark:text-gray-300">Trang <strong>{{ page }}</strong>/<strong>{{ totalPage }}</strong></span>
      <button
        v-if="page != totalPage"
        :class="$style.Controller"
        class="rounded-full inline-flex items-center leading-none py-3 px-8 transition-colors hover:bg-alpha hover:text-white dark:bg-gray-700 dark:text-gray-200"
        @click="next"
      >
        <i class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z" />
          </svg>
        </i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: null
    },
    size: {
      type: Number,
      default: null
    },
    total: {
      type: Number,
      default: null
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.size)
    }
  },
  methods: {
    prev() {
      this.$router.push({ query: { page: this.page - 1 } })
    },
    next() {
      this.$router.push({ query: { page: this.page + 1 } })
    }
  }
}
</script>

<style lang="scss" module>
@import '@/assets/scss/variables';

.Pagination {
}

.Controller {
  background: $omegaLight;
  color: $omega-color;
}
</style>