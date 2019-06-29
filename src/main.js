import Vue from 'vue'
import App from './App'
import router from './router'
// 引入饿了么ui
import ElementUI from 'element-ui'
// 引入封存的axios
import myaxios from './assets/js/myaxios'
// 引入树形组件
import ElTreeGrid from 'element-tree-grid'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'

// 引入富文本
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 定义全局的时间过滤器
// 格式化时间的过滤器
Vue.filter('dateFormat', originVal => {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1).toString().padStart(2, '0')
  const d = dt
    .getDate()
    .toString()
    .padStart(2, '0')

  const hh = dt
    .getHours()
    .toString()
    .padStart(2, '0')
  const mm = dt
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const ss = dt
    .getSeconds()
    .toString()
    .padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.use(VueQuillEditor)
Vue.use(ElementUI)
Vue.use(myaxios)
Vue.component(ElTreeGrid.name, ElTreeGrid)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
