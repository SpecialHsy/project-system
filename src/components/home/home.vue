<template>
  <el-container>
    <el-header>
      <el-row class="head">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../assets/img/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <h1>电商管理系统</h1>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <h3>退出</h3>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :router='true' :unique-opened='true' class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                角色列表</el-menu-item>
                 <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                商品列表</el-menu-item>
                 <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                分类参数</el-menu-item>
                <el-menu-item index="3-3">
                <i class="el-icon-menu"></i>
                商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                数据报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {};
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
  text-align: center;
  line-height: 160px;
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
  color: rgb(0, 89, 255);
}
</style>
