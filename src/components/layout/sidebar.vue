<template>
  <el-aside width="200px">
    <el-menu :router="true" :unique-opened="true" class="el-menu-vertical-demo">
      <el-submenu v-for="item in powerList" :key="item.id" :index="item.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="value in item.children" :key="value.id" :index="value.path">
            <i class="el-icon-menu"></i>
            {{value.authName}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data () {
    return {
      powerList: []
    }
  },
  methods: {
    getrightsData () {
      this.$http({
        url: 'menus'
      }).then(res => {
        let { meta, data } = res.data
        if (meta.status === 200) {
          this.powerList = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getrightsData()
  }
}
</script>

<style>
</style>
