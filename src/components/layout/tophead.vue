<template>
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
        <h3>
          <a href="#" @click.prevent="logout">退出</a>
        </h3>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 第一种
        // this.$router.push('/login')
        // 第二种
        this.$router.push({ name: 'login' })
        window.localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      })
    }
  }
}
</script>

<style>
</style>
