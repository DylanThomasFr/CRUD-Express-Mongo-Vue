import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
    },
    getters: {
        isLoggedIn(state) {
            return state.token !== null
        }
    },
    mutations: {
        setToken(state, token) {
            localStorage.setItem('access_token', token)
            state.token = token
        },
        logout(state){
            localStorage.removeItem('access_token')
            state.token = null
        }
    },
    actions: {
        register(context, data) {
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
        login(context, credentials) {
            return this._vm.$http
                .post('user/login', {
                    username: credentials.username,
                    password: credentials.password
                })
                .then(response => {
                    const token = 'Bearer ' + response.data.access_token
                    context.commit('setToken', token)
                    return response
                })
        },
        getRole(context){
            this._vm.$http.defaults.headers.common['Authorization'] = context.state.token
            return this._vm.$http
                .get('user/readonly', )
                .then(response => {
                    return response
                })
        },
        posts(context) {
            this._vm.$http.defaults.headers.common['Authorization'] = context.state.token
            return this._vm.$http
                .get('post')
                .then(response => {
                    return response.data
                })
                .catch(({response}) => {
                    return response
                })
        },
        addPosts(context, post) {
            this._vm.$http.defaults.headers.common['Authorization'] = context.state.token
            return this._vm.$http
                .post('post', {
                    title: post.title,
                    content: post.content
                })
                .then(response => {
                    return response.data
                })
                .catch(({response}) => {
                    return response
                })
        },
        updatePost(context, infos) {
            this._vm.$http.defaults.headers.common['Authorization'] = context.state.token

            return this._vm.$http
                .put('post/' + infos.id, {
                    title: infos.title,
                    content: infos.content
                })
                .then(response => {
                    return response.data
                })
                .catch(({response}) => {
                    return response
                })
        },
        getPost(context, id) {
            this._vm.$http.defaults.headers.common['Authorization'] = context.state.token
            return this._vm.$http
                .get('post/' + id)
                .then(response => {
                    return response.data
                })
                .catch(({response}) => {
                    return response
                })
        },
        deletePost(context,id){
            this._vm.$http.defaults.headers.common['Authorization'] = context.state.token
            return this._vm.$http
                .delete('post/' + id)
                .then(response => {
                    return response.data
                })
                .catch(({response}) => {
                    return response
                })
        },
        getDetails(context,id){
            this._vm.$http.defaults.headers.common['Authorization'] = context.state.token
            return this._vm.$http
                .get('post/' + id)
                .then(response => {
                    return response.data
                })
                .catch(({response}) => {
                    return response
                })
        }
    },
})
