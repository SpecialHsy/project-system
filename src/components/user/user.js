import mybread from '../layout/mybread'
export default {
  data () {
    return {
      tableData: [],
      query: '',
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 10,
      // 页容量选项
      pagesizes: [5, 10, 15],
      // 总条数
      total: 0,
      // 对话框
      adddialog: false,
      editdialog: false,
      ruledialog: false,
      // 表头宽
      formLabelWidth: '80px',
      userinfo: {
        id: '',
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      ruleinfo: {
        username: '',
        id: '',
        rid: ''
      },
      selectlist: [],
      id: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取数据并渲染
    getdata () {
      this.$http({
        method: 'get',
        url: `/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          if (data.users.length === 0 && this.pagenum !== 1) {
            this.pagenum--
            this.getdata()
            return
          }
          this.tableData = data.users
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
    },
    // 搜索
    search () {
      this.getdata()
    },
    // 打开添加面板
    open () {
      this.adddialog = true
      for (const key in this.userinfo) {
        this.userinfo[key] = ''
      }
    },
    // 添加用户
    adduser () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            method: 'post',
            url: '/users',
            data: this.userinfo,
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            let { meta } = res.data
            if (meta.status === 201) {
              this.$message({
                message: meta.msg,
                type: 'success'
              })
              this.adddialog = false
              this.getdata()
              for (const key in this.userinfo) {
                this.userinfo[key] = ''
              }
            } else {
              this.$message.error(meta.msg)
            }
          })
        }
      })
    },
    // 删除用户
    remove (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'delete',
          url: '/users/' + id,
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }).then(res => {
          let { meta } = res.data
          if (meta.status === 200) {
            if (this.total === 6) {
              this.pagenum = 1
              this.getdata()
            }
            this.getdata()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error(meta.msg)
          }
        })
      })
    },
    // 打开修改面板并获取数据
    edit (id) {
      this.editdialog = true
      this.$http({
        method: 'get',
        url: '/users/' + id
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.userinfo.id = data.id
          this.userinfo.username = data.username
          this.userinfo.email = data.email
          this.userinfo.mobile = data.mobile
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 修改用户
    edituser (id) {
      id = this.userinfo.id
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            method: 'put',
            url: '/users/' + id,
            data: this.userinfo,
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.editdialog = false
            this.getdata()
          })
        }
      })
    },
    // 状态设置
    openOff (id, type) {
      this.$http({
        method: 'put',
        url: `/users/${id}/state/${type}`,
        data: this.userinfo
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 角色面板打开并获取数据
    setrule (id) {
      this.ruledialog = true
      this.$http({
        method: 'get',
        url: '/users/' + id
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.ruleinfo.username = data.username
          this.ruleinfo.id = data.id
          this.ruleinfo.rid = data.rid
          this.$http({
            method: 'get',
            url: '/roles',
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            let { data, meta } = res.data
            if (meta.status === 200) {
              this.selectlist = data
            } else {
              this.$message.error(meta.msg)
            }
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 角色分配
    set () {
      this.$http({
        method: 'put',
        url: `/users/${this.ruleinfo.id}/role`,
        data: { rid: this.ruleinfo.rid }
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          })
          this.ruledialog = false
        }
      })
    }
  },
  mounted () {
    this.getdata()
  },
  watch: {
    query (newKey, oldKey) {
      this.$http({
        method: 'get',
        url: `/users?query=${newKey}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.tableData = data.users
        }
      })
    }
  },
  components: {
    mybread
  }
}
