import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Cart from '@/components/cart.vue'
import Address from '@/components/address.vue'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Cart',
        component: Cart
    }, {
        path: '/address',
        name: 'Address',
        component: Address
    }]
})
