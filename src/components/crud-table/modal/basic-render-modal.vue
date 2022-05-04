<script>
import { ref, unref } from "vue";
import { useModalInner, BasicModal } from "@/components";

export default {
  name: "basic-render-modal",
  emits: ["ok", "register"],
  props: {
    modalId: {
      type: String,
      default: () => "",
    },
    componentProps: {
      type: Object,
      default: () => ({}),
    },
    render: {
      type: Function,
      default: () => <div>默认占位</div>,
    },
  },
  setup(props) {
    const valueRef = ref();
    const [modalRegister, methods] = useModalInner((data) => {
      valueRef.value = data;
    });

    return () => {
      const value = unref(valueRef);
      const slotContent = props.render(value, methods);
      return (
        <BasicModal onRegister={modalRegister} {...props.componentProps}>
          {slotContent}
        </BasicModal>
      );
    };
  },
};
</script>
