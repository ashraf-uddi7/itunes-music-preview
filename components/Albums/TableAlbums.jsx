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
      field: "artistName",
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
      albums.sort(this.compare(this.orderBy.field, this.orderBy.dir));

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
  },
  render(h) {
    let table = <b> ... </b>;
    if (this.loading) {
      table = <loading loading />;
    } else if (this.filterdAlbums.length) {
      const rows = this.filterdAlbums.map(album => {
        return (
          <tr
            key={album.collectionId}
            on-click={this.openAlbum.bind(this, album)}
          >
            <td class="art">
              <picture>
                <img src={album.artworkUrl60} />
              </picture>
            </td>
            <td>
              <p> {album.artistName} </p>
            </td>
            <td>
              <p> {album.collectionName} </p>
            </td>
            <td>
              <p> {album.primaryGenreName} </p>
            </td>
            <td>
              <p> {album.releaseDate} </p>
            </td>
          </tr>
        );
      });

      table = (
        <div>
          <table>
            <thead>
              <tr>
                <th class="art"></th>
                <th on-click={() => this.setOrder("artistName")}>
                  <b>Artista</b>
                  <order-icon orderby={this.orderBy} field="artistName" />
                </th>
                <th on-click={() => this.setOrder("collectionName")}>
                  <b>Album</b>
                  <order-icon orderby={this.orderBy} field="collectionName" />
                </th>
                <th on-click={() => this.setOrder("primaryGenreName")}>
                  <b>Gênero</b>
                  <order-icon orderby={this.orderBy} field="primaryGenreName" />
                </th>
                <th on-click={() => this.setOrder("releaseDate")}>
                  <b>Lançamento</b>
                  <order-icon orderby={this.orderBy} field="releaseDate" />
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
          <pagination
            size={this.albums.length}
            on-change={this.onChangePagination}
          />
        </div>
      );
    }
    return table;
  }
};
