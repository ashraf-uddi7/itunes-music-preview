<template>
  <div>
    <loading v-if="loading" loading />

    <table v-if="!loading && filterdAlbums.length">
      <thead>
        <tr>
          <th class="art"></th>
          <th @click="setOrder('artistName')">
            <b>Artista</b>
            <OrderIcon :orderby="orderBy" field="artistName" />
          </th>
          <th @click="setOrder('collectionName')">
            <b>Album</b>
            <OrderIcon :orderby="orderBy" field="collectionName" />
          </th>
          <th @click="setOrder('primaryGenreName')">
            <b>Gênero</b>
            <OrderIcon :orderby="orderBy" field="primaryGenreName" />
          </th>
          <th @click="setOrder('releaseDate')">
            <b>Lançamento</b>
            <OrderIcon :orderby="orderBy" field="releaseDate" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="album in filterdAlbums"
          :key="album.collectionId"
          @click="openAlbum(album)"
        >
          <td class="art">
            <picture>
              <img :src="album.artworkUrl60" />
            </picture>
          </td>
          <td>
            <p>{{ album.artistName }}</p>
          </td>
          <td>
            <p>{{ album.collectionName }}</p>
          </td>
          <td>
            <p>{{ album.primaryGenreName }}</p>
          </td>
          <td>
            <p>{{ album.releaseDate | moment("DD/MM/YYYY") }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-if="!loading && filterdAlbums.length"
      :size="albums.length"
      @change="onChangePagination"
    />
  </div>
</template>

<script>
import Vue from "vue";
Vue.use(require("vue-moment"));
export default {
  components: {
    pagination: () => import("../Ui/Pagination.vue"),
    loading: () => import("../Ui/Loading"),
    OrderIcon: () => import("../Ui/OrderIcon")
  },
  props: {
    albums: {
      default: () => [],
      type: Array
    },
    loading: {
      default: () => false,
      type: Boolean
    }
  },
  data: () => ({
    pagination: {
      itemsFrom: 1,
      itemsTo: 1,
      current: 1,
      itemsPerPage: 1
    },
    orderBy: {
      field: null,
      dir: "asc"
    }
  }),
  computed: {
    filterdAlbums() {
      if (!this.albums || !this.albums.length) {
        return [];
      }
      // pagination
      let albums = [...this.albums];
      if (this.orderBy.field) {
        albums.sort(this.compare(this.orderBy.field, this.orderBy.dir));
      }

      return albums.splice(
        this.pagination.itemsFrom,
        this.pagination.itemsPerPage
      );
    }
  },
  methods: {
    onChangePagination(pagination) {
      this.pagination = { ...pagination };
    },
    openAlbum(album) {
      this.$store.commit("store/SET_ALBUM", album);
      this.$router.push("album");
    },
    compare(key, order = "asc") {
      return (a, b) => {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order == "desc" ? comparison * -1 : comparison;
      };
    },
    setOrder(field) {
      let orderBy;
      if (field == this.orderBy.field) {
        orderBy = {
          ...this.orderBy,
          dir: this.orderBy.dir == "asc" ? "desc" : "asc"
        };
      } else {
        orderBy = {
          field,
          dir: "asc"
        };
      }
      this.orderBy = orderBy;
    }
  }
};
</script>
<style lang="scss">
th i.material-icons {
  vertical-align: middle;
}
</style>
