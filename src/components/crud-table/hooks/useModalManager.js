import { provide, inject, reactive, unref } from "vue";
import { useModal } from "../../modal/hooks/useModal";

const MODAL_MANAGER = "crud-table-modals-manager";

export const useModalsActionsContext = () => {
  return inject(MODAL_MANAGER);
};

export const useModalManager = (modals) => {
  // key为modalid，
  const modalsRegister = reactive({});
  const modalsMethods = reactive({});
  modals?.forEach((modal) => {
    const { modalId } = modal;
    const [register, methods] = useModal();
    modalsRegister[modalId] = register;
    modalsMethods[modalId] = methods;
  });
  const openModalId = (modalId, data) => {
    unref(modalsMethods)[modalId]?.openModal(true, data);
  };

  const hideModalId = (modalId) => {
    unref(modalsMethods)[modalId]?.openModal(false);
  };

  const actions = {
    openModalId,
    hideModalId,
  };

  provide(MODAL_MANAGER, actions);

  return { modalsRegister, modalsMethods, actions };
};
