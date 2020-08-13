<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{modalTitle}}</span>
            </v-card-title>
            <v-form @submit.prevent="submitDialog">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Title *" v-model="Modal.title" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                        autocomplete="Content"
                                        label="Content *"
                                        v-model="Modal.content"
                                        required
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="closeDialog">Close</v-btn>
                    <v-btn
                            color="blue darken-1 white--text"
                            type="submit"
                            :disabled="!disabled">Save
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "PostModal",
        props: {
            dialog: Boolean,
            modalTitle: String,
            title: String,
            content: String,
        },
        data: () => {
            return {
                Modal: {
                    title: '',
                    content: ''
                }
            }
        },
        methods: {
            submitDialog() {
                this.$emit('submitDialog', this.Modal)
            },
            closeDialog(){
                this.$emit('closeDialog', this.Modal)
            }
        },
        computed: {
            disabled: function () {
                return this.Modal.title !== '' && this.Modal.content !== ''
            }
        },
        created() {
            this.Modal.title = this.title,
            this.Modal.content = this.content
        },
        watch:{
            deleteDialog(val){
                this.deleteDialog=!val
            }
        }
    }
</script>

<style scoped>

</style>
