import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import vSelect from 'vue-select'
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
Vue.use(VModal)

Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css'

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'

// Vue.use(Buefy)
// import VueSweetalert2 from 'vue-sweetalert2';

// // If you don't need the styles, do not connect
// import 'sweetalert2/dist/sweetalert2.min.css';

// Vue.use(VueSweetalert2);

Vue.mixin({
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
    timeConverter(UNIX_timestamp) {
      console.log('UNIX_timestamp:', UNIX_timestamp)
      if (UNIX_timestamp) {
        if (UNIX_timestamp.indexOf('-') > -1) {
          var date = UNIX_timestamp.split(' ')[0].split('-')
          date = date[2] + '/' + date[1] + '/' + date[0]
          var time = UNIX_timestamp.split(' ')[1]
          var ret = date + ' - ' + time
        } else {
          var a = new Date(+UNIX_timestamp)
          console.log('a:', a)
          var months = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
          var year = a.getFullYear()
          // var month = months[a.getMonth()];
          var month = a.getMonth() + 1
          var date = a.getDate()
          var hour = a.getHours()
          var min = a.getMinutes()
          var sec = a.getSeconds()
          var ret = date + '/' + month + '/' + year + ' - ' + hour + ':' + min + ':' + sec
          console.log('log:', time)
        }
      }
      return ret
    }
  }
})
// Install BootstrapVue
// Vue.use(BootstrapVue)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
