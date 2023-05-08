<template>
    <v-container>
        <v-alert v-if="loadError != ''" type="error" color="red-darken-4" variant="flat"> {{loadError}} </v-alert>
        <UsersTable v-else :users="users" />
    </v-container>
</template>

<script>
import UsersTable from '@/components/account/UsersTable.vue';

export default {
    name: "UsersManagerView",
    data() {
        return {
            users: [],
            loadError: "",
        };
    },
    components: { UsersTable },
    mounted() {
        this.$store.dispatch("UsersModule/onGetUsers").then(() => {
            this.users = this.$store.getters["UsersModule/GET_USERS"];
        }, (error) => {
            // alert(error)
            console.log(error);
            this.loadError = `Ошибка ${error.code}. Невозможно загрузить данные.`;
        });
    },
    methods: {},
}
</script>