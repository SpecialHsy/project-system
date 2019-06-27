<template>
  <el-card>
    <mybread one="权限管理" two="权限列表"></mybread>
    <el-table class="mytable" :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="authName" label="权限名称" width="120"></el-table-column>
      <el-table-column property="path" label="路径" width="120"></el-table-column>
      <el-table-column label="层级">
          <template slot-scope="scope">
              {{scope.row.level==='0'?'一级':scope.row.level==='1'?'二级':'三级'}}
          </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import mybread from '../layout/mybread'
export default {
  data () {
    return {
      tableData: []
    }
  },
  components: {
    mybread
  },
  methods: {
    getpower () {
      this.$http({
        method: 'get',
        url: 'rights/list'
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.tableData = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getpower()
  }
}
</script>

<style>
.mytable {
  margin-top: 20px;
}
</style>
