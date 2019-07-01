<template>
  <div v-if="size" class="container pagination">
    <div class="row">
      <div class="c8-xs">
        <div class="text-left">
          <a :class="{ disabled: current == 1 }" @click="firstPage">
            <i class="material-icons"> first_page </i>
          </a>
          <a :class="{ disabled: current == 1 }" @click="prev">
            <i class="material-icons"> navigate_before </i>
          </a>
          <a v-if="current > 2" @click.prevent="current = current - 2">
            {{ current - 2 }}
          </a>
          <a v-if="current != 1" @click.prevent="current = current - 1">
            {{ current - 1 }}
          </a>
          <b>{{ current }}</b>
          <a v-if="current != pages" @click.prevent="current = current + 1">
            {{ current + 1 }}
          </a>
          <a
            v-if="current == 1 && current + 2 < pages"
            @click.prevent="current = current + 2"
          >
            {{ current + 2 }}
          </a>
          <a :class="{ disabled: current == pages }" @click="next">
            <i class="material-icons"> navigate_next </i>
          </a>
          <a :class="{ disabled: current == pages }" @click="lastPage">
            <i class="material-icons"> last_page </i>
          </a>
        </div>
      </div>
      <div class="c4-xs text-right">
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
    firstPage() {
      this.current = 1;
    },
    lastPage() {
      this.current = this.pages;
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
  user-select: none;
  .row {
    b {
      text-decoration: underline;
    }
    a {
      cursor: pointer;
      font-weight: bold;
      height: 32px;
      width: 30px;
      display: inline-block;
      vertical-align: top;
      &.disabled {
        font-weight: normal;
        cursor: no-drop;
      }
      i {
        margin: -1px 0px;
      }
    }
  }
}
</style>
