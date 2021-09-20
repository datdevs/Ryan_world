<template>
  <div class="flex flex-wrap">
    <div
      :class="$style.FbLike"
      class="fb-like"
      :data-href="url"
      data-layout="button_count"
      data-size="large"
      data-lazy
    />
    <div
      class="fb-share-button mr-2.5"
      :data-href="url"
      data-layout="button_count"
      data-size="large"
      data-lazy
    />
    <div
      class="fb-save"
      :data-uri="url"
      data-size="large"
      data-lazy
    />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      try {
        window.FB.XFBML.parse()
      } catch (err) {
        console.log(err)
      }
    }, 10)
  }
}
</script>

<style lang="scss" module>
.FbLike {
  margin-left: -10px;
}
</style>