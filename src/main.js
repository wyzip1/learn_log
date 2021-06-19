import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './config/axios-options'

createApp(App).use(router).mount('#app')
