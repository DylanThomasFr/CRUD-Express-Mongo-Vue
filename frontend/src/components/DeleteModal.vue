<template>
    <v-row justify="center" >
        <v-dialog
                v-model="active"
                max-width="290"
                persistent
        >
            <v-card>
                <v-card-title class="headline">Delete post ?</v-card-title>

                <v-card-text>
                    You won't be able to retrieve your post after this action. Are you sure that you want to continue ?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="close"
                    >
                        Discard
                    </v-btn>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="submit"
                    >
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "DeleteModal",
        props:{
            active : Boolean
        },
        methods:{
            close(){
                this.$emit('close')
            },
            submit(){
                this.$emit('delete')
            }
        }
    }
</script>

<style scoped>

</style>
