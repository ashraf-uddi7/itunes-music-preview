export default {
  functional: true,
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  render(h, { props }) {
    let loading = (
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

    if (!props.loading) {
      loading = false;
    }

    return loading;
  }
};
