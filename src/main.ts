import { createApp } from 'vue'
import App from './App.vue'
import 'remixicon/fonts/remixicon.css'
import '@/assets/scss/main.scss'
import router from './router'
import directives from './directives'
const app = createApp(App)
directives(app);
app.use(router).mount('#app')
