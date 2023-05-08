<template>
    <v-container>
        <div class="d-flex justify-center ma-2" v-if="loadingTasks.status == true" style="width: 100%;">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        </div>
        <div v-else-if="loadingTasks.error != ''"><v-alert type="error">{{ loadingTasks.error }}</v-alert></div>
        <div v-else>
            <TasksList v-if="tasks.length != 0" :user_id="user_id" :tasks="tasks" :solved_tasks="solved_tasks" />
            <v-alert v-else type="warning">Нет добавленных задач для решения</v-alert>
        </div>
    </v-container>
</template>

<script>
import TasksList from '@/components/account/TasksList.vue';

export default {
    name: "TasksView",
    data() {
        return {
            user_id: -1,
            tasks: [],
            solved_tasks: [],
            loadingTasks: {
                status: false,
                error: '',
            }
        };
    },
    components: { TasksList },
    mounted() {
        const token = localStorage.getItem("token")
        this.isAuthenticated = token !== null ? true : false;
        if (this.isAuthenticated) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const jsonPayload = JSON.parse(payload);
            this.user_id = jsonPayload.id
        }
        this.loadingTasks.status = true;
        this.$store.dispatch("TasksModule/onGetTasks", this.user_id).then(
            () => {
                this.tasks = this.$store.getters["TasksModule/GET_TASKS"];
                this.solved_tasks = this.$store.getters["TasksModule/GET_SOLVED_TASKS"];
                this.loadingTasks.error = '';
                this.loadingTasks.status = false;
            },
            (error) => {
                this.loadingTasks.error = error;
                this.loadingTasks.status = false;
            }
        )
    },
}
</script>