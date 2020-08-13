<template>
    <v-row justify="center" >
        <v-dialog
                v-model="active"
                max-width="600"
                persistent
        >
            <v-card>
                <v-card-title class="headline">{{title}}</v-card-title>

                <v-card-text>
                    {{content}}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="close"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "DetailModal",
        props:{
            active:Boolean,
            title:String,
            content:String
        },
        methods:{
            close(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>
