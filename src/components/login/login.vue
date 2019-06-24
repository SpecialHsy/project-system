<template>
  <div class="login">
    <div class="content">
      <el-form
        :model="userinfo"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
        :rules="rules"
      >
        <h2>用户名</h2>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userinfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="mybtn" @click.prevent="register">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    register() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/login",
            data: this.userinfo
          })
            .then(res => {
              let { data, meta } = res.data;
              if (meta.status == 200) {
                this.$message({
                  message: "登录成功,欢迎回来",
                  type: "success"
                });
                window.localStorage.setItem("token", data.token);
                this.$router.push("/");
              } else {
                this.$message.error(meta.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>

<style>
.login {
  background-color: #324152;
  width: 100%;
  height: 100%;
  position: relative;
}
.content {
  width: 580px;
  padding: 40px;
  height: 440px;
  box-sizing: border-box;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
.mybtn {
  width: 100%;
}
</style>
