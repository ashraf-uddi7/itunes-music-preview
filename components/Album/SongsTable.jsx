import "material-design-icons-iconfont/dist/material-design-icons.css";
export default {
  components: {
    loading: () => import("../Ui/Loading.jsx"),
    player: () => import("./Player.jsx")
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
    player: {
      previewUrl: "",
      played: false,
      currentTime: 0
    }
  }),
  computed: {
    albums() {
      return this.$store.getters["store/albums"];
    }
  },
  watch: {
    "player.currentTime"(time) {
      if (this.$refs.audio) {
        if (Math.abs(time - this.$refs.audio.currentTime) > 0.5) {
          this.$refs.audio.currentTime = time;
        }
        if (this.$refs.audio.duration <= time) {
          this.playpause(this.player.previewUrl);
        }
      }
    },
    albums() {
      this.$router.push("/");
    }
  },
  methods: {
    onChangePagination(pagination) {
      this.pagination = { ...pagination };
    },
    updateAudio($event) {
      this.player.currentTime = $event.target.currentTime;
    },
    playpause(previewUrl) {
      if (this.player.previewUrl !== previewUrl) {
        if (this.player.played) {
          this.$refs.audio.pause();
        }
        this.player.previewUrl = previewUrl;
        setTimeout(() => {
          this.$refs.audio.play();
          this.player.played = true;
        }, 400);
      } else {
        if (!this.player.played) {
          setTimeout(() => {
            this.$refs.audio.play();
            this.player.played = true;
          }, 400);
        } else {
          this.player.played = false;
          this.$refs.audio.pause();
        }
      }
    },
    formatTime(miliseconds) {
      var minutes = miliseconds / (1000 * 60);
      var absoluteMinutes = Math.floor(minutes);
      var m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

      //Get remainder from minutes and convert to seconds
      var seconds = (minutes - absoluteMinutes) * 60;
      var absoluteSeconds = Math.floor(seconds);
      var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

      return m + ":" + s;
    }
  },
  render(h) {
    let table = <b> ... </b>;
    if (this.loading) {
      table = <loading loading />;
    } else if (this.songs.length) {
      const rows = this.songs.map(song => {
        return (
          <tr
            key={song.trackId}
            class={{
              active:
                this.player.played && song.previewUrl == this.player.previewUrl
            }}
          >
            <td class="art">
              <player
                track={song}
                playing={
                  this.player.played &&
                  song.previewUrl == this.player.previewUrl
                }
                time={50}
                duration={100}
                on-playpause={this.playpause}
              >
                <img src={song.artworkUrl60} />
              </player>
            </td>
            <td>
              <p> {song.trackName} </p>
            </td>
            <td>
              <p> {this.formatTime(song.trackTimeMillis)} </p>
            </td>
            <td>
              <p> {song.trackNumber} </p>
            </td>
          </tr>
        );
      });

      table = (
        <div>
          <audio
            src={this.player.previewUrl}
            controls
            volume={0.1}
            on-timeupdate={e => this.updateAudio(e)}
            ref="audio"
            hidden
          ></audio>
          <table>
            <thead>
              <tr>
                <th class="art"> </th>
                <th> Título </th>
                <th> Tempo </th>
                <th> Número </th>
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
