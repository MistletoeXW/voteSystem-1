// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Fastclick from 'fastclick'
// import 'normalize.css'
// import iView from 'view-design'
// import 'view-design/dist/styles/iview.css';
import 'interceptors/interceptor'
import axios from 'axios'

import GeminiScrollbar from 'vue-gemini-scrollbar'

Vue.use(GeminiScrollbar)
// Vue.use(ElementUI);

Vue.prototype.$axios = axios

// Vue.use(iView)

Vue.config.productionTip = false

const FastClick = require('fastclick')
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
