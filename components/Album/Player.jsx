import RadialProgressBar from "vue-radial-progress";
export default {
  functional: true,
  components: {
    RadialProgressBar
  },
  props: {
    track: {
      default: () => ({}),
      type: Object
    },
    playing: {
      default: () => false,
      type: Boolean
    },
    time: {
      default: () => 50,
      type: Number
    },
    duration: {
      default: () => 100,
      type: Number
    }
  },
  render(h, { props, listeners, children }) {
    let controls = (
      <div
        class="controls"
        on-click={listeners.playpause.bind(this, props.track.previewUrl)}
      >
        <i class="material-icons"> play_arrow </i>
      </div>
    );
    if (props.playing) {
      controls = (
        <div
          class="controls"
          on-click={listeners.playpause.bind(this, props.track.previewUrl)}
        >
          <i class="material-icons"> pause </i>
        </div>
      );
    }

    return (
      <picture>
        {controls}
        {children}
      </picture>
    );
  }
};
