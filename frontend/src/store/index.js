import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
    },
    getters: {
        isLoggedIn (state) {
            return state.token !== null
        }
    },
    mutations: {
        setToken (state, token) {
            this._vm.$http.defaults.headers.common['Authorization'] = `Bearer ${  token}`
            localStorage.setItem('access_token', token)
            state.token = token
        },
    },
    actions: {
        register(context,data){
            console.log(data.readonly)
            return this._vm.$http
                .post('user/register', {
                    username: data.username,
                    password: data.password,
                    readonly: data.readonly
                })
                .then(response => {
                    return response
                })
        },
        login (context, credentials) {
            return this._vm.$http
                .post('user/login', {
                    username: credentials.username,
                    password: credentials.password
                })
                .then(response => {
                    const token = response.data
                    context.commit('setToken', token)
                    return response
                })
        }
    },
})
