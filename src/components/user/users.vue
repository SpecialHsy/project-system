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
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" plain @click="edit(scope.row.id)"></el-button>
            <el-button type="success" icon="el-icon-check" plain></el-button>
            <el-button type="danger" icon="el-icon-delete" plain @click="remove(scope.row.id)"></el-button>
          </el-row>
        </template>
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
    <el-dialog title="修改用户" :visible.sync="editdialog">
      <el-form>
        <el-input autocomplete="off" v-model="userinfo.id" type="hidden"></el-input>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userinfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editcancle">取 消</el-button>
        <el-button type="primary" @click.prevent="edituser(id)">确 定</el-button>
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
      editdialog: false,
      // 表头宽
      formLabelWidth: "80px",
      userinfo: {
        id: "",
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      id: ""
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
      for (const key in this.userinfo) {
        this.userinfo[key] = "";
      }
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
    },
    remove(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          method: "delete",
          url: "http://localhost:8888/api/private/v1/users/" + id,
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(res => {
          let { data, meta } = res.data;
          if (meta.status === 200) {
            if (this.total == 6) {
              this.pagenum = 1;
              this.getdata();
            }
            this.getdata();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        });
      });
    },
    edit(id) {
      this.editdialog = true;
      this.$http({
        method: "get",
        url: "http://localhost:8888/api/private/v1/users/" + id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        let { data, meta } = res.data;
        this.userinfo.id = data.id;
        this.userinfo.username = data.username;
        this.userinfo.email = data.email;
        this.userinfo.mobile = data.mobile;
      });
    },
    editcancle() {
      this.editdialog = false;
    },
    edituser(id) {
      id = this.userinfo.id;
      this.$http({
        method: "put",
        url: "http://localhost:8888/api/private/v1/users/" + id,
        data: this.userinfo,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.editdialog = false;
        this.getdata();
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
