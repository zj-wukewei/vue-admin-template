import modules from "../components/base";
import BasicRenderModal from "../components/crud-table/modal/basic-render-modal.vue";
import ModalButton from "../components/crud-table/actions/modal-button.vue";
export const setupCustomComponents = (app) => {
  Object.keys(modules).forEach((component) => {
    app.component(component, modules[component]);
  });
  app.component("basic-render-modal", BasicRenderModal);
  app.component("modal-button", ModalButton);
};
