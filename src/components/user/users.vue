<template>
  <!-- 卡片 -->
  <el-card>
    <!-- 面包屑导航 -->
    <mybread one="用户管理" two="用户列表"></mybread>
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
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="openOff(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" plain @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" plain @click="remove(scope.row.id)"></el-button>
            <el-button type="success" icon="el-icon-check" plain @click="setrule(scope.row.id)"></el-button>
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
      <el-form :model="userinfo" ref="ruleForm" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input autocomplete="off" v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input autocomplete="off" v-model="userinfo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input autocomplete="off" v-model="userinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userinfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialog=false">取 消</el-button>
        <el-button type="primary" @click.prevent="adduser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改用户" :visible.sync="editdialog">
      <el-form :model="userinfo" ref="ruleForm" :rules="rules">
        <el-input autocomplete="off" v-model="userinfo.id" type="hidden"></el-input>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userinfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input autocomplete="off" v-model="userinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userinfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialog=false">取 消</el-button>
        <el-button type="primary" @click.prevent="edituser(id)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="ruledialog">
      <el-form :model="ruleinfo">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          {{ruleinfo.username}}
          <el-input autocomplete="off" v-model="ruleinfo.username" :disabled="true" type="hidden"></el-input>
        </el-form-item>
        <el-form-item label="选择角色" label-width="90px">
          <el-select v-model="ruleinfo.rid" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="item in selectlist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ruledialog=false">取 消</el-button>
        <el-button type="primary" @click="set">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import mybread from "../layout/mybread";
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
      ruledialog: false,
      // 表头宽
      formLabelWidth: "80px",
      userinfo: {
        id: "",
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      ruleinfo: {
        username: "",
        id: "",
        rid: ""
      },
      selectlist: [],
      id: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 获取数据并渲染
    getdata() {
      this.$http({
        method: "get",
        url: `/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          if (data.users.length === 0 && this.pagenum != 1) {
            this.pagenum--;
            this.getdata();
            return;
          }
          this.tableData = data.users;
          this.total = data.total;
        }
      });
    },
    // 页码更改
    currPage(currentPage) {
      this.pagenum = currentPage;
      this.getdata();
    },
    // 页容量更改
    sizeChange(size) {
      this.pagesize = size;
      this.getdata();
    },
    // 搜索
    search() {
      this.getdata();
    },
    // 打开添加面板
    open() {
      this.adddialog = true;
      for (const key in this.userinfo) {
        this.userinfo[key] = "";
      }
    },
    // 添加用户
    adduser() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/users",
            data: this.userinfo,
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }).then(res => {
            let { data, meta } = res.data;
            if (meta.status === 201) {
              this.$message({
                message: meta.msg,
                type: "success"
              });
              this.adddialog = false;
              this.getdata();
              for (const key in this.userinfo) {
                this.userinfo[key] = "";
              }
            }
          });
        }
      });
    },
    // 删除用户
    remove(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          method: "delete",
          url: "/users/" + id,
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
    // 打开修改面板并获取数据
    edit(id) {
      this.editdialog = true;
      this.$http({
        method: "get",
        url: "/users/" + id
      }).then(res => {
        let { data, meta } = res.data;
        this.userinfo.id = data.id;
        this.userinfo.username = data.username;
        this.userinfo.email = data.email;
        this.userinfo.mobile = data.mobile;
      });
    },
    // 修改用户
    edituser(id) {
      id = this.userinfo.id;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            method: "put",
            url: "/users/" + id,
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
      });
    },
    // 状态设置
    openOff(id, type) {
      this.$http({
        method: "put",
        url: `/users/${id}/state/${type}`,
        data: this.userinfo
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
        }
      });
    },
    // 角色面板打开并获取数据
    setrule(id) {
      this.ruledialog = true;
      this.$http({
        method: "get",
        url: "/users/" + id
      }).then(res => {
        let { data, meta } = res.data;
        this.ruleinfo.username = data.username;
        this.ruleinfo.id = data.id;
        this.ruleinfo.rid = data.rid;
        this.$http({
          method: "get",
          url: "/roles",
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(res => {
          let { data, meta } = res.data;
          if (meta.status === 200) {
            this.selectlist = data;
          }
        });
      });
    },
    // 角色分配
    set() {
      this.$http({
        method: "put",
        url: `/users/${this.ruleinfo.id}/role`,
        data: { rid: this.ruleinfo.rid }
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            type: "success",
            message: meta.msg
          });
          this.ruledialog = false;
        }
      });
    }
  },
  mounted() {
    this.getdata();
  },
  components: {
    mybread
  }
};
</script>

<style>
</style>
