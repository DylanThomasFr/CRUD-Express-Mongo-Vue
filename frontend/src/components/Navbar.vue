<template>
    <v-app-bar
            app
            color="blue darken-1"
            dark
    >
        <v-toolbar-title>FDVhudset</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-5" @click="logout" icon>
            <v-icon>mdi-logout</v-icon> &nbsp;
            Logout
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        name: "Navbar",
        methods:{
            logout(){
                this.$store.commit('logout')
                this.$router.push({name:'Login'})
            }
        }
    }
</script>

<style scoped>

</style>
