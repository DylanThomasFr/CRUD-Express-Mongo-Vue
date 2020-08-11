import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Register from "../views/Register";
import Posts from "../views/Posts";
import store from "../store"


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: { requiresVisitor: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresVisitor: true }
    },
    {
        path: '/posts',
        name: 'Posts',
        component: Posts,
        meta: { requiresAuth: true }
    },

]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({
                name: 'Login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.isLoggedIn) {
            next({
                name: 'Posts',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    }
})


export default router
