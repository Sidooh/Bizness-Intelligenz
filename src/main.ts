import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import { createPinia } from "pinia";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { defaultConfig, plugin } from '@formkit/vue'
import {
    FaChartPie,
    GiMoneyStack,
    MdCurrencyexchange,
    MdErrorSharp,
    MdSupervisoraccountOutlined
} from 'oh-vue-icons/icons'

import 'simplebar/dist/simplebar.min.css';
import '@nabcellent/sui-vue/dist/style.css'

addIcons(
    FaChartPie,
    MdSupervisoraccountOutlined,
    MdCurrencyexchange,
    MdErrorSharp,
    GiMoneyStack
)

createApp(App)
    .component('v-icon', OhVueIcon)
    .use(createPinia())
    .use(router)
    .use(plugin, defaultConfig({
        config: {
            classes: {
                input: 'form-control form-control-sm'
            }
        },
        icons: {
            'login-circle': '<svg class="ms-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="m10.998 16 5-4-5-4v3h-9v2h9z"></path><path d="M12.999 2.999a8.938 8.938 0 0 0-6.364 2.637L8.049 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051S20 10.13 20 12s-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637C21.063 16.665 22 14.405 22 12s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path></svg>'
        }
    }))
    .mount('#app')
