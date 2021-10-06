const requireComponent = require.context(".", false, /.vue$/);
const modules = {};
requireComponent.keys().forEach((fileName) => {
  // 获取组件配置(组件模板)

  const componentConfig = requireComponent(fileName);
  // 将被注册的组件名字,对获取的组件文件名进行处理
  const componentName = fileName
    .replace(/^\.\/_/, "")
    .replace(/\.\w+$/, "")
    .split("./")
    .join("")
    .split("-")
    .map((item, index) => {
      if (index === 0) {
        return item;
      }
      return item.slice(0, 1).toUpperCase() + item.slice(1);
    })
    .join("");
  // 将组件在循环中注册到全局，

  modules[componentName] = componentConfig.default || componentConfig;
});
export default modules;
