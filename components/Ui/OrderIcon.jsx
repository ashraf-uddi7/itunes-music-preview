export default {
  functional: true,
  props: {
    field: {
      type: String,
      default: () => ""
    },
    orderby: {
      type: Object,
      default: () => ({})
    }
  },
  render(h, { props }) {
    if (props.orderby.field != props.field) {
      return null;
    }

    const icon =
      props.orderby.dir == "asc" ? "keyboard_arrow_down" : "keyboard_arrow_up";
    return <i class="material-icons"> {icon} </i>;
  }
};
