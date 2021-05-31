<template>
  <div id="login">
    <div class="login_wrap">
      <ul class="menu_tab">
        <li
          :class="{ current: item.isActive }"
          v-for="item in menuTabs"
          :key="item.id"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login_form"
        size="medium"
      >
        <el-form-item prop="username" class="login_form_item">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="login_form_item">
          <label for="">密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="rPassword"
          class="login_form_item"
          v-show="type === 'register'"
        >
          <label for="">重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.rPassword"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha" class="login_form_item">
          <label for="">验证码</label>
          <el-row :gutter="20">
            <el-col :span="16"
              ><el-input v-model="ruleForm.captcha"></el-input>
            </el-col>
            <el-col :span="8"
              ><el-button
                type="success"
                style="width: 100%; display: block"
                @click="getCaptcha()"
                :disabled="captchaBtnStatus.status"
                >{{ captchaBtnStatus.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="login_form_item">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="width: 100%"
            :disabled="loginBtnStatus"
            >{{ type === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSms, login, register } from "@/api/login";
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import {
  stripScript,
  validateEmail,
  validatePass,
  validateCode,
} from "@/utils/validate";
export default {
  name: "Login",
  setup(props, { refs, root }) {
    //用户名验证
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        callback();
      }
    };
    //密码验证
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = value = stripScript(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码必须包含至少6个字符、至多20个字符"));
      } else {
        callback();
      }
    };
    //重复密码验证
    let validaterPassword = (rule, value, callback) => {
      //当为登录状态且是通过v-show控制重复密码输入组件的显示状态时，需要直接让重复密码的校验通过。
      //因为v-show只是改变了display的值，重复密码的组件依旧存在，所以他的校验规则依旧会生效。
      //而通过v-if控制的组件在登录状态时根本没有生成，所以没有校验
      //v-show
      if (type.value === "login") {
        callback();
      }
      //v-if 指令
      //do nothing
      ruleForm.rPassword = value = stripScript(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("两次输入的密码不一致，请重新输入"));
      } else {
        callback();
      }
    };
    //验证码验证
    let validateCaptcha = (rule, value, callback) => {
      ruleForm.captcha = value = stripScript(value);
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateCode(value)) {
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    const menuTabs = reactive([
      { txt: "登录", isActive: true, type: "login" },
      { txt: "注册", isActive: false, type: "register" },
    ]);
    const loginBtnStatus = ref(true);
    const captchaBtnStatus = reactive({
      status: false,
      text: "获取验证码",
    });
    const timer = ref(null);
    const ruleForm = reactive({
      username: "",
      password: "",
      rPassword: "",
      captcha: "",
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      rPassword: [{ validator: validaterPassword, trigger: "blur" }],
      captcha: [{ validator: validateCaptcha, trigger: "blur" }],
    });
    const type = ref("login");
    //*******************************************************************methods */
    /**
     * 登录注册切换
     */
    const toggleMenu = (item) => {
      //清除预设
      menuTabs.forEach((elem) => {
        elem.isActive = false;
      });
      //高光切换
      item.isActive = true;
      //修改类型
      type.value = item.type;
      //表单重置
      refs["ruleForm"].resetFields();
    };
    /**
     * 获取验证码
     */
    const getCaptcha = () => {
      if (ruleForm.username === "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式错误");
        return false;
      }
      captchaBtnStatus.status = true;
      captchaBtnStatus.text = "发送中";
      let data = {
        username: ruleForm.username,
        module: type.value,
      };
      getSms(data)
        .then((res) => {
          root.$message({
            message: res.data.message,
            type: "success",
          });
          loginBtnStatus.value = false;
          countDown(30);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    /**
     * 倒计时
     */
    const countDown = (num) => {
      if (timer.value) {
        clearInterval(timer.value);
      }
      timer.value = setInterval(() => {
        num--;
        if (num === 0) {
          clearInterval(timer.value);
          captchaBtnStatus.status = false;
          captchaBtnStatus.text = "再次获取";
        } else {
          captchaBtnStatus.text = `倒计时${num}秒`;
        }
      }, 1000);
    };
    /**
     * 登录注册切换时清除倒计时
     */
    const clearCountDown = () => {
      captchaBtnStatus.status = false;
      captchaBtnStatus.text = "获取验证码";
      clearInterval(timer.value);
    };
    /**
     * 用户注册
     */
    const userRegister = (data) => {
      register(data)
        .then((res) => {
          root.$message({
            message: res.data.message,
            type: "success",
          });
          toggleMenu(menuTabs[0]);
          clearCountDown();
          loginBtnStatus.value = true;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    /**
     * 用户登录
     */
    const userLogin = (data) => {
      login(data)
        .then((res) => {
          root.$message({
            message: res.data.message,
            type: "success",
          });
          loginBtnStatus.value = true;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    /**
     * 表单提交
     */
    const submitForm = (formName) => {
      console.log(type.value)
      refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            username: ruleForm.username,
            password: ruleForm.password,
            code: ruleForm.captcha,
          };
          if ((type.value === "login")) {
            userLogin(data);
          } else {
            userRegister(data);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    /*********************************************************************lifecycle */
    onMounted(() => {});
    return {
      menuTabs,
      loginBtnStatus,
      captchaBtnStatus,
      ruleForm,
      rules,
      type,
      toggleMenu,
      submitForm,
      getCaptcha,
    };
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login_wrap {
  width: 380px;
  margin: auto;
}
.menu_tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  .current {
    background-color: #344a1f;
  }
}
.login_form {
  color: #fff;
  label {
    display: block;
  }
  margin-top: 29px;
}
.login_form_item {
  margin-top: 20px;
}
</style>
