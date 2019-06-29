export default {
  components: {
    pagination: () => import("../Ui/Pagination.vue")
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
    }
  }),
  computed: {
    filterdAlbums() {
      if (!this.albums || !this.albums.length) {
        return [];
      }
      // pagination
      let albums = [...this.albums];
      return albums.splice(
        this.pagination.itemsFrom,
        this.pagination.itemsPerPage
      );
    }
  },
  methods: {
    onChangePagination(pagination) {
      this.pagination = { ...pagination };
    }
  },
  render(h) {
    let table = <b> ... </b>;
    if (this.loading) {
      table = (
        <div class="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      );
    } else if (this.filterdAlbums.length) {
      const rows = this.filterdAlbums.map(album => {
        return (
          <tr key={album.collectionId}>
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
          </tr>
        );
      });

      table = (
        <div>
          <table>
            <thead>
              <tr>
                <th class="art"> </th>
                <th> Artista </th>
                <th> Album </th>
                <th> Gênero </th>
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
