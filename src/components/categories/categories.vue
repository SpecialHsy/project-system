<template>
  <el-card>
    <mybread one="商品管理" two="商品分类"/>
    <el-button type="success" plain class="mybtn">添加分类</el-button>
    <el-table :data="categoriesData" style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column label="级别" width="180">
        <template slot-scope="scope">{{scope.row.cat_level===0?'一级':scope.row.level===1?'二级':'三级'}}</template>
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
    <div class="block">
      <el-pagination
        :current-page="5"
        :page-sizes="[3, 5, 10,15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div>
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
      categoriesData: []
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
        } else {
          this.$message.error(meta.msg);
        }
      });
    }
  },
  mounted() {
    this.getcategories();
  }
};
</script>

<style scoped>
.mybtn {
  margin-top: 20px;
}
</style>
