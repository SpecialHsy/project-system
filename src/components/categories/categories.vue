<template>
  <el-card>
    <mybread one="商品管理" two="商品分类"/>
    <el-button type="success" plain class="mybtn" @click="dialog=true">添加分类</el-button>
    <el-table :data="pagelist" style="width: 100%" v-loading="loading">
      <!-- treeKey唯一标识 -->
      <!-- parentKey给当前子元素设置父元素 -->
      <!-- levelKey层级位置 -->
      <el-table-tree-column
        levelKey="cat_level"
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        treeKey="cat_id"
        parentKey="cat_pid"
        prop="cat_name"
        label="分类名称"
        width="180"
      ></el-table-tree-column>
      <el-table-column label="级别" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-if="scope.row.cat_level === 1">二级</span>
          <span v-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效">
        <template slot-scope="scope">{{scope.row.cat_deleted?'无效' :'有效'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pagenum"
      :page-sizes="[5,10,15,20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="categoriesData.length"
      @current-change="curChange"
      @size-change="sizeChange"
    ></el-pagination>
    <el-dialog title="添加商品分类" :visible.sync="dialog">
      <el-form>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="className" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-cascader clearable v-model="selVlaue" :options="options" :props="props"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="setclass">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import mybread from "../layout/mybread";
export default {
  components: {
    mybread
  },
  data() {
    return {
      categoriesData: [],
      pagesize: 5,
      pagenum: 1,
      pagelist: [],
      total: 0,
      dialog: false,
      formLabelWidth: "80px",
      // 级联框数据源
      options: [],
      // 双向绑定
      selVlaue: [],
      props: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        checkStrictly: true
      },
      // 分类数据
      className: "",
      loading: true
    };
  },
  methods: {
    getcategories() {
      this.$http({
        method: "get",
        url: "categories"
      }).then(res => {
        let { meta, data } = res.data;
        if (meta.status === 200) {
          this.categoriesData = data;
          setTimeout(() => {
            this.loading = false;
          }, 300);
          this.getpageList();
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    getpageList() {
      // 条数公式 pagesize*(pagenum-1)~pagesize*pagenum-1,数组slice不包含停止的位数，所以不减1
      let begin = this.pagesize * (this.pagenum - 1);
      let end = this.pagesize * this.pagenum;
      this.pagelist = this.categoriesData.slice(begin, end);
    },
    curChange(currentpage) {
      this.pagenum = currentpage;
      this.getcategories();
    },
    sizeChange(currentsize) {
      this.pagesize = currentsize;
      this.getcategories();
    },
    getdbData() {
      this.$http({
        method: "get",
        url: "categories?type=2"
      }).then(res => {
        let { meta, data } = res.data;
        if (meta.status === 200) {
          this.options = data;
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    setclass() {
      let pid =
        this.selVlaue.length === 0
          ? 0
          : this.selVlaue[this.selVlaue.length - 1];
      let level = this.selVlaue.length;
      this.$http({
        method: "post",
        url: "categories",
        data: {
          cat_pid: pid,
          cat_name: this.className,
          cat_level: level
        }
      }).then(res => {
        let { meta, data } = res.data;
        if (meta.status === 201) {
          this.$message({
            type: "success",
            message: meta.msg
          });
          this.dialog = false;
          this.getdbData();
          this.getcategories();
        } else {
          this.$message.error(meta.msg);
        }
      });
    }
  },
  mounted() {
    this.getcategories();
    this.getdbData();
  }
};
</script>

<style scoped>
.mybtn {
  margin-top: 20px;
}
</style>
