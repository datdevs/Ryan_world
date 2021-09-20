<template>
  <div class="container mx-auto my-10">
    <div class="grid grid-cols-3 gap-6">
      <ArticleCard
        v-for="(article, index) in articles"
        :key="`article_${article.id}`"
        :article="article"
        :index="index"
      />
    </div>
    <Pagination
      class="my-16"
      :page="pagination.current"
      :size="pagination.size"
      :total="pagination.total"
      data-aos="fade-up"
    />
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
