import modules from "../components/base";

export const setupCustomComponents = (app) => {
  Object.keys(modules).forEach((component) => {
    app.component(component, modules[component]);
  });
};
