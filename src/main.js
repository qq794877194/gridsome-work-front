import ElementUI from 'element-ui';
import DefaultLayout from '~/layouts/Default.vue'
import util from './utils/util';
import 'element-ui/lib/theme-chalk/index.css'


export default function(Vue, { router, head, isClient }){
    Vue.use(ElementUI);

    Vue.mixin({
        data(){
            return {
                GRIDSOME_API_URL: process.env.GRIDSOME_API_URL
            }
        }
    });

    Vue.prototype.$util = util;
    Vue.component('Layout', DefaultLayout);
}
