<template>
  <main>
    <div class="container">
      <div class="row">
        <Card
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
      <SongsTable :songs="songs" :loading="loading" />
    </div>
  </main>
</template>
<script>
export default {
  transition: "fade",
  components: {
    Card: () => import("~/components/Ui/Card.jsx"),
    SongsTable: () => import("~/components/Album/SongsTable.jsx")
  },
  computed: {
    album() {
      const album = this.$store.getters["store/album"];
      if (!album) {
        return {};
      }
      return album;
    },
    songs() {
      const songs = this.$store.getters["store/songs"];
      if (!songs) {
        return [];
      }
      return songs;
    },
    loading() {
      return this.$store.getters["store/loading"];
    }
  },
  mounted() {
    if (!this.album.artistId) {
      this.$router.push("/");
    }
    this.$store.dispatch("store/getSongs");
  }
};
</script>

<style lang="scss">
.container {
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
    transition: all linear 0.4s;
    img {
      transition: all linear 0.4s;
    }
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

  table {
    tbody {
      tr.active picture .controls,
      tr:hover picture .controls {
        opacity: 1;
        z-index: 1;
      }
      tr {
        cursor: default;
        td:nth-of-type(1):before {
          content: "Arte";
        }

        td:nth-of-type(2):before {
          content: "Música";
        }

        td:nth-of-type(3):before {
          content: "Tempo";
        }

        td:nth-of-type(4):before {
          content: "Número";
        }
      }
      tr.active {
        picture {
          border-radius: 100%;
          img {
            animation: rotate 3s linear infinite;
          }
        }
      }
    }
  }
}
</style>
