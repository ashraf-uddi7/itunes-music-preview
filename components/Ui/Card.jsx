export default {
  functional: true,
  props: {
    title: {
      type: String,
      default: () => ""
    },
    subtitle: {
      type: String,
      default: () => ""
    },
    classes: {
      type: String,
      default: () => ""
    },
    image: {
      type: String,
      default: () => ""
    }
  },
  render: (h, { props, listeners }) => (
    <div class={`card ${props.classes}`} on-click={listeners.click}>
      <picture>
        <img src={props.image} />
      </picture>
      <p>{props.title}</p>
      <span>{props.subtitle}</span>
    </div>
  )
};
