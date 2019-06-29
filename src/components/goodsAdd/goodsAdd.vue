<template>
  <el-card>
    <mybread one="商品列表" two="商品管理" />
    <!-- 提示框 -->
    <el-alert style="margin: 20px 0;" title="添加商品信息" type="info" center show-icon></el-alert>
    <!-- active:激活步骤 finish-status:完成状态-->
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品信息"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tab-position设置位置 -->
    <!-- tab 被选中时触发 -->
    <!-- activeName双向绑定的数据,默认显示的tab栏 -->
    <el-tabs tab-position="left" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="基本信息" name="first">
        <el-form
          label-position="top"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :model="goodsobj"
          :rules="rules"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="goodsobj.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="goodsobj.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="weight">
            <el-input v-model="goodsobj.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="number">
            <el-input v-model.number="goodsobj.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="class">
            {{opvalue}}
            <el-cascader clearable v-model="opvalue" :options="options" :props="props"></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">
        <div v-for="(item,index) in goodsmany" :key="index">
          <h5>{{item.attr_name}}</h5>
          <div>
            <el-checkbox
              border
              v-model="checked"
              v-for="(val,index) in item.attr_vals.split(',')"
              :key="index"
            >{{val}}</el-checkbox>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品信息" name="third">
        <el-form
          v-for="(item,index) in goodsonly"
          :key="index"
          label-position="top"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item :label="item.attr_name">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">
        <!-- action 图片上传地址 -->
        <!-- 后台服务需要添加token才能接收信息 -->
        <!-- on-preview钩子函数可以添加一段逻辑代码，图片上传时执行 -->
        <!-- 上传元素显示方式list-type -->
        <!-- on-success文件上传成功时 -->
        <!-- on-remove文件删除时 -->
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture"
          :headers="postHeader"
          :on-success="uploadsuccess"
          :on-remove="remove"
          :on-preview="seeimg"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="fifth">
        <el-button type="primary" @click="addgoods">添加商品</el-button>
        <!-- 引入富文本 -->
        <quill-editor v-model="content" ref="myQuillEditor"></quill-editor>
      </el-tab-pane>
    </el-tabs>
    <!-- 预览图片 -->
    <el-dialog title="提示" :visible.sync="imgdialog" width="30%">
      <img ref="imglink" src alt />
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgdialog = false">取 消</el-button>
        <el-button type="primary" @click="imgdialog = false">确 定</el-button>
      </span>
    </el-dialog>
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
      // 步骤条激活的下标s
      active: 0,
      // 默认显示的tab栏
      activeName: 'first',
      // 级联选择器分类数据源
      options: [],
      // 级联框的数据
      opvalue: [],
      // 级联选择器配置项
      props: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        checkStrictly: true
      },
      // 默认选中
      checked: true,
      // 商品参数
      goodsmany: [],
      // 商品属性
      goodsonly: [],
      // 上传请求头
      postHeader: {
        Authorization: window.localStorage.getItem('token')
      },
      // 上传图片集合
      fileList: [],
      // 图片预览
      imgdialog: false,
      // 双向绑定
      goodsobj: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: '',
        goods_introduce: ''
      },
      content: '',
      // 验证规则
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { type: 'number', message: '商品数量必须为数字值' }
        ],
        class: [{ required: true, message: '请输入商品分类', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // tab点击事件
    tabClick (tag) {
      // 步骤条与tag同步
      this.active = +tag.index
      // 判断商品参数
      if (tag.index === '1') {
        this.getparams('many')
      }
      if (tag.index === '2') {
        this.getparams('only')
      }
    },
    // 获取商品参数属性
    getparams (sel) {
      if (this.opvalue.length !== 0) {
        this.$http({
          url: `categories/
            ${this.opvalue[this.opvalue.length - 1]}/attributes?sel=${sel}`
        }).then(res => {
          let { meta, data } = res.data
          if (meta.status === 200) {
            if (sel === 'many') {
              this.goodsmany = data
            } else {
              this.goodsonly = data
            }
          } else {
            this.$message.error(meta.msg)
          }
        })
      } else {
        this.$message.error('请选择商品分类')
      }
    },
    // 获取商品数据
    getgoods () {
      this.$http({
        url: 'categories'
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.options = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    uploadsuccess (response, file, fileList) {
      // response上传成功后响应的信息
      // file 上传成功后的文件信息
      // fileList上传成功后的集合
      this.fileList.push(response.data.tmp_path)
    },
    remove (file, fileList) {
      let img = file.response.data.tmp_path
      this.fileList.forEach((item, index) => {
        if (item === img) {
          this.fileList.splice(index, 1)
        }
      })
    },
    // 图片预览
    seeimg (file) {
      let img = file.response.data.url
      // 数据获取是异步的，执行时数据还没渲染到
      this.imgdialog = true
      this.$nextTick(() => {
        this.$refs.imglink.src = img
      })
    },
    addgoods () {
      this.goodsobj.goods_cat = this.opvalue.join(',')
      this.$http({
        method: 'post',
        url: 'goods',
        data: {
          ...this.goodsobj,
          goods_introduce: this.content
        }
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 201) {
          this.$message.success(meta.msg)
          this.$router.push('/goods')
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getgoods()
  }
}
</script>

<style>
.el-step__title {
  font-size: 14px;
}
h5 {
  font-weight: normal;
}
.el-checkbox {
  margin-right: 0;
}
.el-steps--horizontal {
  margin-bottom: 20px;
}
.ql-container.ql-snow {
  height: 376px;
}
</style>
