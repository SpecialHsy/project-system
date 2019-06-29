<template>
  <el-card>
    <mybread one="订单管理" two="订单列表" />
    <el-table :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="order_number" label="订单编号" width="280"></el-table-column>
      <el-table-column property="order_price" label="订单价格" width="120"></el-table-column>
      <el-table-column property="name" label="是否付款" width="120">
        <template slot-scope="scope">
          <el-tag type="danger">{{scope.row.pay_status==='0'?'未付款' :'已付款'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="is_send" label="是否发货"></el-table-column>
      <el-table-column label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currPage"
      @size-change="sizeChange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <div id="mybox" class="mybox"></div>
  </el-card>
</template>

<script>
import mybread from '../layout/mybread'
import BMap from 'BMap'
export default {
  components: {
    mybread
  },
  data () {
    return {
      tableData: [],
      query: '',
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 5,
      // 页容量选项
      pagesizes: [5, 10, 15],
      // 总条数
      total: 0
    }
  },
  methods: {
    //   获取订单数据
    getdata () {
      this.$http({
        method: 'get',
        url: `/orders?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          if (data.goods.length === 0 && this.pagenum !== 1) {
            this.pagenum--
            this.getdata()
            return
          }
          this.tableData = data.goods
          this.total = data.total
        }
      })
    },
    // 页码更改
    currPage (currentPage) {
      this.pagenum = currentPage
      this.getdata()
    },
    // 页容量更改
    sizeChange (size) {
      this.pagesize = size
      this.getdata()
    }
  },
  mounted () {
    this.getdata()
    var map = new BMap.Map('mybox')
    var point = new BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
    map.addControl(new BMap.NavigationControl())
    map.addControl(new BMap.ScaleControl())
    map.addControl(new BMap.OverviewMapControl())
    map.addControl(new BMap.MapTypeControl())

    var driving = new BMap.DrivingRoute(map, {
      renderOptions: {
        map: map,
        autoViewport: true
      }
    })
    var start = new BMap.Point(116.310791, 40.003419)
    var end = new BMap.Point(118.182, 25.0588)
    driving.search(start, end)
  }
}
</script>

<style>
.mybox {
  width: 100%;
  height: 600px;
}
</style>
