<template>
    <v-app id="inspire">
        <Navbar/>
        <v-main class="px-5 my-5">
            <v-alert v-if="Success.activate" type="success">{{Success.message}}</v-alert>
            <PostModal
                    v-if="!readonly"
                    :key="Modal.title"
                    :dialog="postDialog"
                    @submitDialog="dialogSubmit"
                    @closeDialog="postDialog=!postDialog"
                    :modalTitle="modalTitle"
                    :title="Modal.title"
                    :content="Modal.content"
            />
            <DeleteModal v-if="!readonly" :active="deleteDialog" @close="deleteDialog=!deleteDialog"
                         @delete="deletePost"/>
            <DetailModal :active="detailDialog" @close="detailDialog=!detailDialog" :title="Modal.title"
                         :content="Modal.content"/>
            <div class="my-5" v-if="!readonly">
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
                <template v-slot:item.title="{item}">
                    <td>
                        <v-btn text small @click="showDetails(item.id)">{{item.title}}</v-btn>
                    </td>
                </template>
                <template v-slot:item.action="{item}" v-if="!readonly">
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
                                    <v-list-item-title class="pointer" @click="checkDelete(item.id)">Delete
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </template>
            </v-data-table>
        </v-main>
        <Footer/>
    </v-app>
</template>

<script>
    import PostModal from "../components/PostModal";
    import DeleteModal from "../components/DeleteModal";
    import Footer from "../components/Footer";
    import Navbar from "../components/Navbar";
    import DetailModal from "../components/DetailModal";

    export default {
        name: "Posts",
        components: {
            DetailModal,
            Navbar,
            PostModal,
            DeleteModal,
            Footer
        },
        data: () => {
            return {
                postDialog: false,
                deleteDialog: false,
                detailDialog: false,
                modalTitle: '',
                action: '',
                change: false,
                headers: [
                    {text: 'Title', align: 'start', sortable: true, value: 'title'},
                    {text: 'Date', value: 'date'},
                    {text: '', value: 'action'}
                ],
                Success: {
                    activate: false,
                    message: ''
                },
                Modal: {
                    title: '',
                    content: ''
                },
                posts: [],
                nbItems: 0,
                postId: '',
                readonly: true
            }
        },
        methods: {
            async openDialog(title, action, id) {
                this.postId = id ? id : 0

                if (this.postId !== 0) {
                    await this.$store.dispatch('getPost', id)
                        .then(response => {
                            this.Modal.title = response.title
                            this.Modal.content = response.content
                        })
                        .catch(({response}) => console.log(response))
                } else {
                    this.Modal = {
                        title: '',
                        content: ''
                    }
                }

                this.postDialog = true
                this.modalTitle = title
                this.action = action
            },
            checkDelete(id) {
                this.deleteDialog = true
                this.postId = id
            },
            dialogSubmit(modal) {
                this.postDialog = false
                if (this.action === 'ADD') this.addPost(modal)
                else if (this.action === 'UPDATE') this.updatePost(modal)
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
            updatePost(modal) {
                this.$store.dispatch('updatePost', {
                    id: this.postId,
                    title: modal.title,
                    content: modal.content
                })
                    .then(({post}) => {
                        const date = new Date(post.created_at)
                        const resultDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()

                        const index = this.posts.findIndex(item => item.id === post._id)
                        this.posts[index] = {
                            id: post._id,
                            title: post.title,
                            content: post.content,
                            date: resultDate
                        }
                        this.change = !this.change
                        this.Success = {
                            activate: true,
                            message: 'Post updated successfully'
                        }
                    })
                    .catch(({response}) => console.log(response))
            },
            deletePost() {
                this.$store.dispatch('deletePost', this.postId)
                    .then(() => {
                        const index = this.posts.findIndex(item => item.id === this.postId)
                        this.posts.splice(index, 1)
                        this.change = !this.change
                        this.Success = {
                            activate: true,
                            message: 'Post removed successfully'
                        }
                        this.deleteDialog = false
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
            },
            showDetails(id) {
                this.$store.dispatch('getDetails', id)
                    .then(response => {
                        this.Modal.title = response.title
                        this.Modal.content = response.content
                        this.detailDialog = true
                    })
            },
            getRole() {
                this.$store.dispatch('getRole')
                    .then(response => {
                        this.readonly = response.data.readonly
                    })
            }
        },
        created() {
            this.getPosts()
            this.getRole()
        }
    }
</script>

<style scoped>
    .pointer:hover {
        cursor: pointer;
    }
</style>
