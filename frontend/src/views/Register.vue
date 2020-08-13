<template>
    <v-app id="inspire">
        <span class="pa-2">
            <router-link :to="{name:'Login'}">
                <v-icon >mdi-arrow-left</v-icon>
            </router-link>
        </span>
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
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="blue darken-1"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Register</v-toolbar-title>
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
                                            @keyup.enter="register"
                                    ></v-text-field>

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            v-model="User.password"
                                            @keyup.enter="register"
                                    ></v-text-field>
                                    <v-select
                                            :items="items"
                                            prepend-icon="mdi-account-key"
                                            v-model="User.readonly"
                                            label="Privileges"
                                            @keyup.enter="register"
                                    ></v-select>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1 white--text" class="mr-3 mb-5"
                                       @click.prevent="register">S'inscrire
                                </v-btn>
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
        name: "Register",
        data: () => {
            return {
                items: [
                    {text: 'Read only', value: true},
                    {text: 'Full access', value: false},
                ],
                User: {
                    username: '',
                    password: '',
                    readonly: true
                },
                Error: {
                    activate: false,
                    message: ''
                },
                loading: false
            }
        },
        methods: {
            register() {
                this.loading = true
                this.$store
                    .dispatch('register', {
                        username: this.User.username.toLowerCase(),
                        password: this.User.password,
                        readonly: this.User.readonly
                    })
                    .then(() => {
                        localStorage.setItem('success', true)
                        this.$router.push({name: 'Login'})
                    })
                    .catch(({response}) => {
                        this.loading = false
                        this.Error.activate = true
                        this.Error.message = response.data.message || response.data
                    })
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>
