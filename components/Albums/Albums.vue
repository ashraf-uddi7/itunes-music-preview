<template>
  <main>
    <table-albums :albums="albums" :loading="loading" />
  </main>
</template>

<script>
export default {
  components: {
    tableAlbums: () => import("./TableAlbums.jsx")
  },
  computed: {
    albums() {
      const albums = this.$store.getters["store/albums"];
      if (!albums) {
        return [];
      }
      return albums;
    },
    loading() {
      return this.$store.getters["store/loading"];
    }
  },
  methods: {
    onChangePage(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss">
@import "~/assets/style/table.scss";
@media only screen and (max-width: 760px) {
  table {
    tbody {
      tr {
        td:nth-of-type(1):before {
          content: "Arte";
        }

        td:nth-of-type(2):before {
          content: "Artista";
        }

        td:nth-of-type(3):before {
          content: "Album";
        }

        td:nth-of-type(4):before {
          content: "Gênero";
        }
      }
    }
  }
}
</style>
