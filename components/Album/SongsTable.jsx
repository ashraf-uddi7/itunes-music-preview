export default {
  components: {
    loading: () => import("../Ui/Loading.jsx")
  },
  props: {
    songs: {
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
    filterdSongs() {
      if (!this.songs || !this.songs.length) {
        return [];
      }
      // pagination
      let songs = [...this.songs];
      return songs.splice(
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
      table = <loading loading />;
    } else if (this.filterdSongs.length) {
      const rows = this.filterdSongs.map(song => {
        return (
          <tr key={song.collectionId}>
            <td class="art">
              <picture>
                <img src={song.artworkUrl60} />
              </picture>
            </td>
            <td>
              <p> {song.artistName} </p>
            </td>
            <td>
              <p> {song.collectionName} </p>
            </td>
            <td>
              <p> {song.primaryGenreName} </p>
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
        </div>
      );
    }
    return table;
  }
};
