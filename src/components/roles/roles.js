import mybread from '../layout/mybread.vue'
export default {
    components: {
        mybread
    },
    data() {
        return {
            tableData: [],
            DialogVisible: false,
            rolelist: [],
            defaultProps: {
                // 设置主选项
                label: 'authName',
                // 子选项
                children: 'children',
            },
            // 默认选中
            defaultcheckedkeys: []
        }
    },
    methods: {
        getrules() {
            this.$http({
                method: 'get',
                url: 'roles'
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status === 200) {
                    this.tableData = data
                }
            })
        },
        removeTag(role, rightId) {
            this.$http({
                method: 'delete',
                url: `/roles/${role.id}/rights/${rightId}`
            }).then(res => {
                let { data, meta } = res.data
                if (meta.status === 200) {
                    this.$message({
                        type: 'success',
                        message: meta.msg
                    })
                    role.children = data.data
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除权限失败'
                    });
                }
            })
        },
        setpower(roledata) {
            this.defaultcheckedkeys = []
            this.DialogVisible = true
            this.$http({
                method: 'get',
                url: 'rights/tree'
            }).then(res => {
                let { meta, data } = res.data
                if (meta.status === 200) {
                    this.rolelist = data
                    roledata.forEach(item1 => {
                        item1.children.forEach(item2 => {
                            item2.children.forEach(item3 => {
                                this.defaultcheckedkeys.push(item3.id)
                            })
                        })
                    })
                }
            })
        },
    },
    mounted() {
        this.getrules()
    }
}