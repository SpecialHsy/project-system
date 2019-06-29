<template>
  <el-card>
    <mybread one="商品列表" two="商品管理" />
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" plain @click="$router.push('/goodsAdd')">添加商品</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table border :data="tableData" ref="singleTable" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="goods_name" label="商品名称" width="520"></el-table-column>
      <el-table-column property="goods_price" label="商品价格(元)"></el-table-column>
      <el-table-column property="goods_weight" label="商品重量"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="curChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
import mybread from '../layout/mybread'
export default {
  components: {
    mybread
  },
  data () {
    return {
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  methods: {
    // 获取数据
    getData () {
      this.$http({
        url: `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      }).then(res => {
        let { meta, data } = res.data
        if (meta.status === 200) {
          this.tableData = data.goods
          this.total = data.total
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 页容量改变
    sizeChange (size) {
      this.pagesize = size
      this.getData()
    },
    // 页码改变
    curChange (pagenum) {
      this.pagenum = pagenum
      this.getData()
    },
    // 搜索
    search () {
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    query (newquery, oldquery) {
      this.$http({
        url: `goods?query=${newquery}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      }).then(res => {
        let { meta, data } = res.data
        if (meta.status === 200) {
          this.tableData = data.goods
        }
      })
    }
  }
}
</script>

<style>
</style>
