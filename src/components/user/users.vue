<template>
  <!-- 卡片 -->
  <el-card>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区 -->
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
            <el-button slot="append" icon="el-icon-search" @click.prevent="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" plain @click="open">添加用户</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格区 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-row>
          <el-button type="primary" icon="el-icon-edit" plain></el-button>
          <el-button type="success" icon="el-icon-check" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" plain></el-button>
        </el-row>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->
    <el-pagination
      @current-change="currPage"
      @size-change="sizeChange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog title="添加用户" :visible.sync="adddialog">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userinfo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userinfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addcancle">取 消</el-button>
        <el-button type="primary" @click.prevent="adduser">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      query: "",
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 5,
      // 页容量选项
      pagesizes: [3, 5, 10],
      // 总条数
      total: 0,
      // 对话框
      adddialog: false,
      // 表头宽
      formLabelWidth: "80px",
      userinfo: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    };
  },
  methods: {
    getdata() {
      this.$http({
        method: "get",
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data.users;
          this.total = data.total;
        }
      });
    },
    currPage(currentPage) {
      this.pagenum = currentPage;
      this.getdata();
    },
    sizeChange(size) {
      this.pagesize = size;
      this.getdata();
    },
    search() {
      this.getdata();
    },
    open() {
      this.adddialog = true;
    },
    addcancle() {
      this.adddialog = false;
    },
    adduser() {
      this.$http({
        method: "post",
        url: "http://localhost:8888/api/private/v1/users",
        data: this.userinfo,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 201) {
          this.adddialog = false;
          this.getdata();
          for (const key in this.userinfo) {
            this.userinfo[key] = "";
          }
        }
      });
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style>
</style>
