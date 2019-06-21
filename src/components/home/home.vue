<template>
  <el-container>
    <el-header>
      <tophead></tophead>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <sidebar></sidebar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import tophead from "@/components/layout/tophead";
import sidebar from "@/components/layout/sidebar";
export default {
  components: {
    tophead,
    sidebar
  },
  methods: {
    lode() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$message.error("您还没有登录,请先登录");
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    this.lode();
  }
};
</script>

<style>
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
.head img {
  width: 200px;
  height: 60px;
}
.head h1 {
  margin: 0;
  padding: 0;
  line-height: 60px;
  color: #fff;
}
.head h3 {
  margin: 0;
  padding: 0;
  line-height: 60px;
  float: right;
}
.head h3 a {
  color: rgb(0, 60, 255);
  text-decoration: none;
}
</style>
