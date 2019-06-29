<template>
  <div>
    <input
      v-model="text"
      type="text"
      @input="change"
      :placeholder="placeholder"
    />
    <div class="icon">
      <div
        :style="{ visibility: isTyping ? 'visible' : 'hidden' }"
        class="ticontainer"
      >
        <div class="tiblock">
          <div class="tidot" />
          <div class="tidot" />
          <div class="tidot" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: () => false
    },
    placeholder: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      text: "",
      isTyping: false,
      timeout: null
    };
  },
  methods: {
    change(e) {
      clearTimeout(this.timeout);
      this.isTyping = true;
      this.timeout = setTimeout(() => {
        this.isTyping = false;
        this.$emit("change", this.text);
      }, 700);
    }
  }
};
</script>

<style lang="scss" scoped>
.tiblock {
  align-items: center;
  display: flex;
  height: 17px;
  .tidot {
    background-color: #90949c;
    -webkit-animation: isTypingAnimation 1.5s infinite ease-in-out;
    border-radius: 2px;
    display: inline-block;
    height: 4px;
    margin-right: 2px;
    width: 4px;
    &:nth-child(1) {
      -webkit-animation-delay: 200ms;
    }
    &:nth-child(2) {
      -webkit-animation-delay: 300ms;
    }
    &:nth-child(3) {
      -webkit-animation-delay: 400ms;
    }
  }
}

.icon {
  position: absolute;
  right: 7px;
  bottom: -12px;
}

@-webkit-keyframes isTypingAnimation {
  0% {
    -webkit-transform: translateY(0px);
  }
  28% {
    -webkit-transform: translateY(-5px);
  }
  44% {
    -webkit-transform: translateY(0px);
  }
}
</style>
