import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "./token";
import { TOKEN_KEY } from "@/config/constans";
import store from "@/store";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或编辑数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或编辑数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000,
});

service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers[TOKEN_KEY] = token;
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 0) {
      ElMessage({
        message: res.msg,
        type: "error",
        duration: 3 * 1000,
      });
      if (res.code == 10008) {
        store.dispatch("user/logout").then(() => {
          location.reload();
        });
      }
      return Promise.reject(response);
    } else {
      return Promise.resolve(response.data.data);
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    const errMsg = codeMessage[error.response.status] || error.message;
    ElMessage({
      message: errMsg,
      type: "error",
      duration: 3 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
