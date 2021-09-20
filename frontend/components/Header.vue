<template>
  <header
    ref="header"
    :class="$style.Header"
    class="bg-white py-2 sticky top-0 backdrop-filter backdrop-blur-2xl bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-60"
  >
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <div
        :class="$style.LogoWrap"
        class="inline-flex"
      >
        <nuxt-link
          class="inline-flex text-2xl font-bold uppercase"
          to="/"
          tag="a"
        >
          <img
            v-if="logo"
            class="lazyload"
            :data-src="logo"
            :alt="pagetitle"
            width="200"
            height="68"
            draggable="false"
          >
          <span v-else>{{ pagetitle }}</span>
        </nuxt-link>
      </div>
      <div
        v-if="$slots"
        :class="$style.Right"
      >
        <slot />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    logo: {
      type: String,
      default: null
    },
    pagetitle: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.checkScroll()
  },
  methods: {
    checkScroll() {
      const sY = window.scrollY,
        hH = this.$refs.header
      sY > hH.offsetHeight ? hH.classList.add(this.$style.Shadow) : hH.classList.remove(this.$style.Shadow)

      window.addEventListener('scroll', () => {
        window.scrollY > hH.offsetHeight ? hH.classList.add(this.$style.Shadow) : hH.classList.remove(this.$style.Shadow)
      })
    }
  }
}
</script>

<style lang="scss" module>
@import '@/assets/scss/variables';

.Header {
  z-index: 1000;

  &.Shadow {
    --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    :global(.dark) & {
      box-shadow: 0 1px 0 0 rgb(55, 65, 81);
    }
  }
}

.LogoWrap {
  a {
    background: $gradient-1;
    color: $beta-color;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  img {
    height: 68px;
    width: auto;

    &:not(:global(.lazyloaded)) {
      &::after {
        background: #ffffff;

        :global(.dark) & {
          background: #1f2937;
        }
      }
    }
  }
}

.Right {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>