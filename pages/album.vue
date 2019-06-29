<template>
  <main>
    <div class="container">
      <div class="row">
        <card
          classes="c8-xs c10-md c10-lg"
          :title="album.collectionName"
          :subtitle="album.artistName"
          :image="album.artworkUrl100"
          @click="e => e"
        />
        <div class="c4-xs c2-md c2-lg">
          <a @click="$router.push('/')">voltar</a>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  components: {
    card: () => import("~/components/Ui/Card.jsx")
  },
  computed: {
    album() {
      const album = this.$store.getters["store/album"];
      if (!album) {
        return {};
      }

      return album;
    }
  }
};
</script>

<style lang="scss">
.card + a {
  cursor: pointer;
  vertical-align: bottom;
  position: relative;
  display: flex;
  position: absolute;
  bottom: 21px;
  right: 11px;
  text-decoration: none;
  color: #010101;
}

.card + a:hover {
  color: #000000;
  text-decoration: underline;
}
.card + div > a {
  vertical-align: middle;
  float: right;
  cursor: pointer;
  height: 120px;
  padding: 45px 10px;
  font-weight: bold;
}
picture {
  .controls {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #2f2e2ebd;
    opacity: 0;
    transition: ease 0.3s opacity;
    i {
      color: #fff;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 18px;
      cursor: pointer;
    }
    .radial-progress-container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: block;
      float: none;
      margin: auto;
    }
  }
}

picture:hover .controls,
tr.active picture .controls {
  opacity: 1;
}
</style>
