<template>
  <div v-if="visible">
    <div
      :class="$style.Wrap"
      class="fixed inset-0 overflow-y-auto"
    >
      <div class="min-h-screen px-1 md:px-4 flex items-center justify-center">
        <div
          class="absolute inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
          :class="overlayAnim"
          @click="closeModal"
        />
        <div
          class="absolute w-full max-w-6xl my-5 overflow-hidden bg-white border border-black border-opacity-5 shadow-xl rounded-3xl sm:my-10 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-300"
          :class="dialogAnim"
        >
          <div class="py-4 px-6 text-center relative border-b border-gray-100 dark:border-gray-700 md:py-5">
            <button
              class="w-8 h-8 text-lg flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 absolute left-2 top-1/2 transform -translate-y-1/2 sm:left-4"
              @click="closeModal"
            >
              <i class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z" />
                </svg>
              </i>
            </button>
            <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-gray-200">
              {{ title }}
            </h3>
          </div>
          <div class="py-4 px-6 md:py-5">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      overlayAnim: null,
      dialogAnim: null
    }
  },
  watch: {
    visible(val) {
      if (val) {
        document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.offsetWidth}px`
        document.documentElement.style.overflow = 'hidden'
        document.body.appendChild(this.$el)
        this.overlayAnim = this.$style.FadeIn
        this.dialogAnim = this.$style.PopUp
      } else {
        document.documentElement.style.paddingRight = ''
        document.documentElement.style.overflow = ''
      }
    }
  },
  methods: {
    closeModal() {
      this.overlayAnim = this.$style.FadeOut
      this.dialogAnim = this.$style.PopOut
      setTimeout(() => {
        this.$emit('change', false)
      }, 150)
    }
  }
}
</script>

<style lang="scss" module>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
  }
}

.FadeIn {
  animation: fadeIn 150ms ease-in-out both;
}

.FadeOut {
  animation: fadeOut 150ms ease-in-out both;
}

@keyframes PopUp {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
}

@keyframes PopOut {
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}

.PopUp {
  animation: PopUp 150ms ease-in-out both;
}

.PopOut {
  animation: PopOut 150ms ease-in-out both;
}

.Wrap {
  z-index: 5000;
}
</style>