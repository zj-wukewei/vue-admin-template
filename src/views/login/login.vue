<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-left"></div>
      <div class="login-right">
        <div class="login-title">账号密码登录</div>
        <n-form ref="form" :model="params">
          <n-form-item path="userName">
            <n-input
              v-model:value="params.userName"
              clearable
              placeholder="请输入账号"
            >
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="params.password"
              placeholder="请输入6位密码"
              type="password"
            >
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              :loading="params.loading"
              :disabled="btnDisabled"
              @click="onSubmit"
            >
              立即登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { setToken } from "@/utils/token";

export default {
  name: "Login",
  setup() {
    const params = reactive({
      userName: "",
      password: "",
      loading: false,
    });
    const router = useRouter();
    const route = useRoute();
    const onSubmit = async () => {
      try {
        params.loading = true;
        const data = await window.API.user.login(params);
        setToken(data?.token);
        if (route.query?.redirect) {
          const { redirect, ...others } = route.query;
          router.replace({ path: redirect, query: others });
        } else {
          router.replace("/");
        }
      } catch (e) {
        console.log(e);
      } finally {
        params.loading = false;
      }
    };

    return {
      btnDisabled: computed(
        () => !(params.userAccount != "" && params.password.length > 5)
      ),
      onSubmit,
      params,
    };
  },
};
</script>
<style lang="less">
.login {
  background: #f0f7ff;
  height: 100%;
}
.login-wrapper {
  width: 709px;
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.login-left {
  width: 239px;
  height: 494px;
  background-size: 239px 494px;
  background: #18a058;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-right {
  background: #fff;
  flex: auto;
  border-radius: 0px 10px 10px 0px;
  padding: 0 50px;

  .login-title {
    font-size: 30px;
    color: #444;
    font-weight: 500;
    margin-bottom: 25px;
    margin-top: 70px;
  }

  .n-form {
    img {
      width: 26px;
    }

    .n-input__input-el {
      height: 56px;
    }
    .n-input__icon {
      line-height: 56px;
    }
    .n-button {
      width: 100%;
      min-height: 56px;
      font-size: 20px;
    }
  }
}
</style>
