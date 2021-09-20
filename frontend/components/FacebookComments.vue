<template>
  <div
    class="fb-comments"
    :data-href="url"
    data-width="100%"
    data-numposts="5"
    data-lazy
  />
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
