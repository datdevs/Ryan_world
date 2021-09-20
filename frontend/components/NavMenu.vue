<template>
  <div :class="$style.Wrap">
    <nav class="nav">
      <ul class="inline-flex items-center flex-wrap space-x-4">
        <template v-for="category in categories">
          <li
            v-if="!category.category"
            :key="`category_${category.id}`"
            :class="[{[$style.HasSub]: category.categories.length > 0}]"
          >
            <nuxt-link
              :class="[$style.Link, {'active-link': category.categories.length > 0 && checkNestedActive($route.params.slug, category.categories)}]"
              class="flex font-medium px-1 py-4 transition-colors"
              :to="{ name: 'categories-slug', params: { slug: category.slug } }"
              tag="a"
            >
              {{ category.name }}
            </nuxt-link>
            <ul
              v-if="category.categories.length > 0"
              :class="$style.SubMenu"
              class="bg-white dark:bg-gray-900 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 py-2 px-4"
            >
              <template v-for="subCategory in category.categories">
                <li :key="`category_${subCategory.id}`">
                  <nuxt-link
                    :class="$style.Link"
                    class="flex font-medium px-1 py-2 transition-colors"
                    :to="{ name: 'categories-slug', params: { slug: subCategory.slug } }"
                    tag="a"
                  >
                    {{ subCategory.name }}
                  </nuxt-link>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    checkNestedActive(m, n) {
      return n.find(ne => ne.slug == m) ? true : false
    }
  }
}
</script>

<style lang="scss" module>
@import '@/assets/scss/variables';

.Wrap {}

.Link {
  color: $omega-color;

  :global(.dark) & {
    color: #ffffff;
  }

  &:global(.active-link),
  &:global(.xactive-link),
  &:hover {
    color: $alpha-color;
  }
}

.HasSub {
  position: relative;
}

.SubMenu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 150px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);
  transition-duration: 150ms;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  pointer-events: none;
  z-index: 1009;

  .HasSub:hover & {
    opacity: 1;
    transform: translateY(0);
    user-select: unset;
    pointer-events: unset;
  }
}
</style>