import { setupNativeUiPlus } from "./native-ui";
import { setupCustomComponents } from "./custom-components";

export const setupVueAppPlus = (app) => {
  setupNativeUiPlus(app);
  setupCustomComponents(app);
};
