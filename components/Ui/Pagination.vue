<template>
  <div v-if="size" class="container pagination">
    <div class="row">
      <div class="c6-xs">
        <div class="row">
          <div class="c5-xs">
            <a :class="{ disabled: current == 1 }" @click.prevent="prev">
              anterior
            </a>
          </div>
          <div class="c2-xs">{{ current }}</div>
          <div class="c5-xs">
            <a :class="{ disabled: current == pages }" @click.prevent="next">
              próxima
            </a>
          </div>
        </div>
      </div>
      <div class="c6-xs">
        {{ itemsFrom + 1 }} a {{ itemsTo + 1 }} de {{ size + 1 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    current: 0,
    pages: 1,
    itemsPerPage: 10,
    itemsFrom: 0,
    itemsTo: 0
  }),
  watch: {
    current() {
      this.updateItems();
    }
  },
  mounted() {
    this.pages = Math.ceil(this.size / this.itemsPerPage);
    this.current = 1;
  },
  methods: {
    prev() {
      if (this.current == 1) {
        return;
      }
      this.current = this.current - 1;
    },
    next() {
      if (this.current == this.pages) {
        return;
      }
      this.current = this.current + 1;
    },
    updateItems() {
      const itemsTo = this.current * this.itemsPerPage;
      this.itemsTo = itemsTo > this.size ? this.size : itemsTo;
      this.itemsFrom = itemsTo - this.itemsPerPage;
      this.$emit("change", {
        itemsFrom: this.itemsFrom,
        itemsTo: this.itemsTo,
        itemsPerPage: this.itemsPerPage,
        current: this.current
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  padding: 20px 0;
  .row {
    a {
      cursor: pointer;
      font-weight: bold;
      &.disabled {
        font-weight: normal;
        cursor: no-drop;
      }
    }
  }
}
</style>
