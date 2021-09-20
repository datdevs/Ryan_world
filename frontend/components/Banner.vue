<template>
  <div
    :class="$style.Wrap"
    class="pt-5 dark:bg-black dark:bg-opacity-20"
  >
    <div class="container mx-auto">
      <div class="grid grid-cols-2">
        <div class="flex flex-col justify-center">
          <div
            class="text-5xl leading-tight font-bold whitespace-pre-line"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span>Hello, I'm <span class="text-alpha">Ryan</span>
              Welcome to my world</span>
          </div>
          <div
            class="text-gray-500 text-xl font-medium mt-4 dark:text-gray-400"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span>Đăng ký nhận tin và đừng bỏ lỡ bất cứ bài viết nào mới từ tôi.</span>
          </div>
          <div
            class="mt-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <email-subscribe />
          </div>
        </div>
        <div
          :class="$style.Image"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <developer-image />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeveloperImage from '../assets/Developer.vue'

export default {
  components: {
    DeveloperImage
  }
}
</script>

<style lang="scss" module>
.Wrap {
  background: #f8f8f9;
}

.Image {
  svg {
    margin-left: auto;
    width: 80%;
  }
}
</style>