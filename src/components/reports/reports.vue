<template>
  <el-card>
    <mybread one="数据统计" two="数据报表" />
    <div id="mybox" style="width:60%; height:500px;"></div>
  </el-card>
</template>

<script>
import mybread from '../layout/mybread'
import echarts from 'echarts'
export default {
  components: {
    mybread
  },
  mounted () {
    var myChart = echarts.init(document.getElementById('mybox'))
    this.$http({
      url: 'reports/type/1'
    }).then(res => {
      let { meta, data } = res.data
      if (meta.status === 200) {
        data.xAxis[0].boundaryGap = false
        var options = data
        myChart.setOption(options)
      } else {
        this.$message.error(meta.msg)
      }
    })
  }
}
</script>

<style>
</style>
