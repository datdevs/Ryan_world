<template>
  <div :class="$style.Wrap">
    <button
      :class="$style.ButtonOpen"
      class="inline-flex items-center font-medium px-1 py-4 transition-colors"
      @click="toggleBox"
    >
      <i class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M504.1 471l-134-134C399.1 301.5 415.1 256.8 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c48.79 0 93.55-16.91 129-45.04l134 134C475.7 509.7 481.9 512 488 512s12.28-2.344 16.97-7.031C514.3 495.6 514.3 480.4 504.1 471zM48 208c0-88.22 71.78-160 160-160s160 71.78 160 160s-71.78 160-160 160S48 296.2 48 208z" />
        </svg>
      </i>
      <span>Tìm kiếm</span>
    </button>
    <div
      v-show="visible"
      ref="search"
      :class="$style.SearchBox"
      class="fixed inset-0"
    >
      <div :class="$style.Form">
        <div
          :class="$style.InputWrap"
          class="rounded-lg flex items-center"
        >
          <i class="icon text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M504.1 471l-134-134C399.1 301.5 415.1 256.8 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c48.79 0 93.55-16.91 129-45.04l134 134C475.7 509.7 481.9 512 488 512s12.28-2.344 16.97-7.031C514.3 495.6 514.3 480.4 504.1 471zM48 208c0-88.22 71.78-160 160-160s160 71.78 160 160s-71.78 160-160 160S48 296.2 48 208z" />
            </svg>
          </i>
          <input
            v-model="searchData"
            type="text"
            placeholder="Tìm kiếm bài viết"
          >
        </div>
      </div>
      <div
        :class="$style.Overlay"
        class="absolute inset-0"
        @click="toggleBox"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      searchData: null
    }
  },
  mounted() {
    document.body.appendChild(this.$refs.search)
  },
  methods: {
    toggleBox () {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss" module>
@import '@/assets/scss/variables';

.Wrap {
  &:not(:first-child) {
    position: relative;
    margin-left: 1rem;
    padding-left: calc(1rem - 2px);

    &::before {
      content: '';
      background: $omega-color;
      position: absolute;
      left: 0;
      height: 20px;
      width: 1px;
      top: 50%;
      margin-top: -10px;
    }
  }
}

.ButtonOpen {
  color: $omega-color;

  :global(.dark) & {
    color: #ffffff;
  }

  &:hover {
    color: $alpha-color;
  }

  :global(.icon) {
    margin-right: 5px;
  }
}

.SearchBox {
  z-index: 5000;
}

.Overlay {
  background: rgba(255,255,255,0.9);
  z-index: 1;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
  }
}

.Form {
  animation: slideUp 200ms cubic-bezier(0.4, 0, 0.2, 1) both;
  width: 600px;
  margin: 100px auto;
  position: relative;
  z-index: 5;
}

.InputWrap {
  background: $omegaLight;
  padding-left: 1rem;

  :global(.icon) {
    color: $omega-color;
  }

  input {
    background: none;
    color: $omega-color;
    padding: 1rem 10px;
    width: 100%;

    &::placeholder {
      color: $omega-color;
    }
  }
}
</style>