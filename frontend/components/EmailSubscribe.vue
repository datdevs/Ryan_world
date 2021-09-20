<template>
  <form
    :class="$style.Wrap"
    class="inline-flex rounded-full"
  >
    <input
      class="input-control bg-white dark:bg-gray-800 rounded-l-full py-0 px-6"
      type="email"
      placeholder="Email của bạn"
      required
    >
    <button
      class="bg-gradient hover:opacity-90 font-medium text-white rounded-r-full py-0 px-8 transition-opacity"
      type="submit"
    >
      Đăng ký
    </button>
  </form>
</template>

<script>
export default {

}
</script>

<style lang="scss" module>
.Wrap {
  box-shadow: 0 2px 20px rgba(0,0,0,0.05);

  input,
  button {
    height: 50px;
  }

  input {
    width: 280px;
  }
}
</style>