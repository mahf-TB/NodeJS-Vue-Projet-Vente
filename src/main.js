import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../public/css/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vue-multiselect/dist/vue-multiselect.css';


createApp(App).use(store).use(router).mount('#app')

