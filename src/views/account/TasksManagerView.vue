<template>
    <v-container>
        <TaskAdd/>
    </v-container>

    
</template>

<script>
import TaskAdd from '@/components/account/TaskAdd.vue';

export default {
    name: "TasksManagerView",
    data() {
        return {};
    },
    components: { TaskAdd }, 
 
}
</script>