<template>
  <div
    :class="$style.Wrap"
    class="flex"
  >
    <button
      :class="[$style.Switch, {[$style.Dark]:dark}]"
      class="inline-flex relative rounded-full transition-colors"
      @click="toggleDark"
    >
      <i class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" />
        </svg>
      </i>
      <i class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M480 224h-48c-17.69 0-32 14.33-32 32s14.31 32 32 32H480c17.69 0 32-14.33 32-32S497.7 224 480 224zM256 112c17.67 0 32-14.31 32-32V32c0-17.69-14.33-32-32-32S224 14.31 224 32v48C224 97.69 238.3 112 256 112zM112 256c0-17.67-14.31-32-32-32H32C14.31 224 0 238.3 0 256s14.31 32 32 32h48C97.69 288 112 273.7 112 256zM403.1 154.2l33.94-33.94c12.51-12.51 12.5-32.76 .0047-45.25s-32.75-12.51-45.26-.0016l-33.94 33.94c-12.51 12.51-12.5 32.76-.0047 45.25C370.3 166.7 390.6 166.7 403.1 154.2zM108.9 154.2c12.51 12.51 32.76 12.49 45.26-.0016c12.5-12.5 12.5-32.75-.0047-45.25L120.2 74.98c-12.51-12.51-32.76-12.49-45.26 .0016S62.47 107.7 74.98 120.2L108.9 154.2zM256 160C202.1 160 160 202.1 160 256c0 53.02 42.98 96 96 96s96-42.98 96-96C352 202.1 309 160 256 160zM403.1 357.8c-12.51-12.51-32.76-12.49-45.26 .0023c-12.5 12.5-12.5 32.75 .0047 45.25l33.94 33.94c12.51 12.51 32.76 12.49 45.26-.0016s12.5-32.75-.0047-45.25L403.1 357.8zM108.9 357.8l-33.94 33.94c-12.51 12.51-12.5 32.76-.0047 45.25s32.75 12.51 45.26 .0016l33.94-33.94c12.51-12.51 12.5-32.76 .0047-45.25C141.7 345.3 121.4 345.3 108.9 357.8zM256 400c-17.67 0-32 14.31-32 32V480c0 17.69 14.33 32 32 32s32-14.31 32-32v-48C288 414.3 273.7 400 256 400z" />
        </svg>
      </i>
      <span
        :class="$style.Control"
        class="absolute rounded-full transition-transform"
      />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dark: false
    }
  },
  mounted() {
    if (localStorage.rwtheme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.dark = true
    } else {
      this.dark = false
    }
  },
  methods: {
    toggleDark() {
      this.dark = !this.dark
      if (this.dark) {
        localStorage.rwtheme = 'dark'
        document.documentElement.classList.add('dark')
      } else {
        localStorage.rwtheme = 'light'
        document.documentElement.classList.remove('dark')
      }
    }
  }
}
</script>

<style lang="scss" module>
.Wrap {
  margin-left: 12px;
}

.Switch {
  background: linear-gradient(45deg,#FF7D6B,#FFD64C);
  color: #ffffff;
  padding: 2px;

  :global(.icon) {
    font-size: 14px;
    padding: 2px;
  }

  &.Dark {
    background: linear-gradient(45deg,#3366FF,#AC15B8);
  }
}

.Control {
  background: currentColor;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;

  .Dark & {
    transform: translateX(100%);
  }
}
</style>