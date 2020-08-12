<template>
    <v-app id="inspire">
        <v-app-bar
                app
                color="blue darken-1"
                dark
        >
            <v-toolbar-title>FDVhudset</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="mr-5" icon>
                <v-icon>mdi-logout</v-icon> &nbsp;
                Logout
            </v-btn>
        </v-app-bar>
        <v-main class="px-5 my-5">
            <v-alert v-if="Success.activate" type="success">
                {{Success.message}}
            </v-alert>
            <Modal
                    :key="Modal.title"
                    :dialog="dialog"
                    @submitDialog="dialogSubmit"
                    @closeDialog="dialog=!dialog"
                    :modalTitle="modalTitle"
                    :title="Modal.title"
                    :content="Modal.content"
            />
            <div class="my-2">
                <v-btn color="blue darken-1" dark large @click="openDialog('Add new post', 'ADD')"> + Add new post
                </v-btn>
            </div>

            <v-data-table
                    :key="change"
                    :headers="headers"
                    :items="posts"
                    :items-per-page="nbItems"
                    class="elevation-1"
            >
                <template v-slot:item.action="{item}">
                    <td>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        color="primary"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    Actions
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item>
                                    <v-list-item-title class="pointer"
                                                       @click="openDialog('Update post', 'UPDATE', item.id)">Update
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title class="pointer" @click="deletePost(item.id)">Delete
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </template>
            </v-data-table>
        </v-main>

        <v-footer
                color="blue darken-1"
                app
        >
            <span class="white--text">&copy; Dylan THOMAS</span>
        </v-footer>
    </v-app>
</template>

<script>
    import Modal from "../components/Modal";

    export default {
        name: "Posts",
        components: {
            Modal
        },
        data: () => {
            return {
                dialog: false,
                modalTitle: '',
                action: '',
                change:false,
                headers: [
                    {text: 'Title', align: 'start', sortable: true, value: 'title'},
                    {text: 'Date', value: 'date'},
                    {text: '', value: 'action'}
                ],
                actions: [
                    {title: 'Update post'},
                    {title: 'Delete post'},
                ],
                Success: {
                    activate: false,
                    message: ''
                },
                Modal:{
                    title:'',
                    content:''
                },
                posts: [],
                nbItems: 0,
                postId: ''

            }
        },
        methods: {
            openDialog(title, action, id) {

                this.postId = id ? id : 0
                if(this.postId!==0){
                    this.$store.dispatch('getPost', id)
                        .then(response => {
                            this.Modal.title = response.title
                            this.Modal.content = response.content
                        })
                        .catch(({response}) => console.log(response))
                }

                this.dialog = true
                this.modalTitle = title
                this.action = action


            },
            dialogSubmit(modal) {
                this.dialog = false
                if (this.action === 'ADD') this.addPost(modal)
            },
            addPost(modal) {
                this.$store.dispatch('addPosts', modal)
                    .then(response => {
                        const date = new Date(response.created_at)
                        const resultDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
                        this.posts.push({
                            id: response._id,
                            title: response.title,
                            date: resultDate
                        })
                        this.nbItems = this.posts.length >= 10 ? 10 : this.posts.length
                        this.change = !this.change
                        this.Success = {
                            activate: true,
                            message: 'Post added successfully'
                        }
                    })
                    .catch(({response}) => console.log(response))
            },
            getPosts() {
                this.$store.dispatch('posts')
                    .then(response => {
                        this.posts = response.map(item => {
                            const date = new Date(item.created_at)
                            const resultDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
                            return {
                                id: item._id,
                                title: item.title,
                                date: resultDate
                            }
                        })
                        this.nbItems = this.posts.length >= 10 ? 10 : this.posts.length
                    })
            }
        },
        created() {
            this.getPosts()
        }
    }
</script>

<style scoped>
    .pointer:hover {
        cursor: pointer;
    }
</style>
