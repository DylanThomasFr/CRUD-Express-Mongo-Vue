<template>
    <v-app id="inspire">
        <v-main>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="blue darken-1"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Login</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="Username"
                                            name="username"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            v-model="User.username"
                                    ></v-text-field>

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            v-model="User.password"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="blue darken-1 white--text" class="ml-3 mb-5" :to="{ name: 'Register'}">
                                    S'incrire
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1 white--text" class="mr-3 mb-5" @click.prevent="handleSubmit">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: "Login",

        data : () => {
            return {
                User : {
                    username : '',
                    password : ''
                }
            }
        },
        methods:{
            handleSubmit(){

            }
        }
    }
</script>

<style scoped>

</style>
