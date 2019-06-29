<template>
  <div>
    <header>
      <div class="container">
        <div class="row">
          <div class="c6-xs c4-md c3-lg">
            <h2 class="logo">
              Pontomais Music
            </h2>
          </div>
          <div class="c6-xs c8-md c9-lg">
            <input-component
              :loading="loading"
              placeholder="Busque um artista"
              @change="search"
            />
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <albums />
    </div>
    <div />
  </div>
</template>

<script>
export default {
  components: {
    albums: () => import("../components/Albums/Albums.vue"),
    inputComponent: () => import("../components/Ui/Input.vue")
  },
  computed: {
    loading() {
      return this.$store.getters["store/loading"];
    }
  },
  mounted() {
    this.search({ target: { value: "bethoven" } });
  },
  methods: {
    search(term) {
      if (this.loading) {
        return false;
      }

      if (term.length >= 3) {
        this.$store.dispatch("store/getArtists", term.replace(/\s/g, "+"));
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/style/app.scss";
@import "~/assets/style/responsive.scss";
</style>
