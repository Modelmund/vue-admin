<template>
    <!-- vue 2 版本 -->
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
          <label for="">邮箱</label>
          <el-input
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
        <el-form-item prop="rPassword" class="login_form_item" v-show="type === 'register'">
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
              ><el-input v-model.number="ruleForm.captcha"></el-input>
            </el-col>
            <el-col :span="8"
              ><el-button type="success" style="width: 100%; display: block"
                >获取验证码</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="login_form_item">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stripScript, validateEmail, validatePass, validateCode } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    //用户名验证
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        callback();
      }
    };
    //密码验证
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = value = stripScript(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码必须包含至少6个字符、至多20个字符"));
      } else {
        callback();
      }
    };
    //重复密码验证
    var validaterPassword = (rule, value, callback) => {
      //当为登录状态且是通过v-show控制重复密码输入组件的显示状态时，需要直接让重复密码的校验通过。
      //因为v-show只是改变了display的值，重复密码的组件依旧存在，所以他的校验规则依旧会生效。
      //而通过v-if控制的组件在登录状态时根本没有生成，所以没有校验
      //v-show
      if(this.type === 'login'){
        callback()
      }
      //v-if 指令
      //do nothing
      this.ruleForm.rPassword = value = stripScript(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入的密码不一致，请重新输入"));
      } else {
        callback();
      }
    };
    //验证码验证
    var validateCaptcha = (rule, value, callback) => {
      this.ruleForm.captcha = value = stripScript(value);
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateCode(value)) {
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    return {
      type: "login",
      menuTabs: [
        { txt: "登录", isActive: true, type: 'login' },
        { txt: "注册", isActive: false, type: 'register' },
      ],
      ruleForm: {
        username: "",
        password: "",
        rPassword: "",
        captcha: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        rPassword: [{ validator: validaterPassword, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }],
      },
    };
  },
  methods: {
    toggleMenu(item) {
      //清除预设
      this.menuTabs.forEach((elem) => {
        elem.isActive = false;
      });
      //高光切换
      item.isActive = true;
      //修改类型
      this.type = item.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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
