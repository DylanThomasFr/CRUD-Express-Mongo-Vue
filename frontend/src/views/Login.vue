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
                        <v-progress-linear
                                v-if="loading"
                                class="mb-5"
                                color="blue darken-1"
                                indeterminate
                                reverse
                        ></v-progress-linear>
                        <v-alert v-if="Error.activate" type="error">
                            {{Error.message}}
                        </v-alert>
                        <v-alert v-if="success" type="success">
                            Registered successfully.
                        </v-alert>
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
                                <v-btn color="blue darken-1 white--text" class="mr-3 mb-5" @click.prevent="login">Login</v-btn>
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

        data: () => {
            return {
                User: {
                    username: '',
                    password: ''
                },
                Error: {
                    activate: false,
                    message: ''
                },
                loading : false,
                success : false
            }
        },
        methods: {
            login () {

                this.$store
                    .dispatch('login', {
                        username: this.User.username.toLowerCase(),
                        password: this.User.password
                    })
                    .then(() => this.$router.push({name: 'Posts'}))
                    .catch(({response}) => {
                        this.loading = false
                        this.Error.activate = true
                        this.Error.message = response.data.message || response.data
                    })

            }
        },
        mounted () {
            if(localStorage.getItem('success')){
                this.success = true
                localStorage.clear()
            }
        }
    }
</script>

<style scoped>

</style>
