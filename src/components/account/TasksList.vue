<template>
    <v-card>
        <v-card-title class="pa-0">
            <v-toolbar color="primary">
                <v-toolbar-title>Задачи</v-toolbar-title>
            </v-toolbar>
        </v-card-title>
        <v-card-text>
            <v-sheet class="d-flex justify-center flex-wrap">
                <v-sheet v-for="task in sortedTasks" :key="task.id" class="ma-2 pa-2 flex-grow-1 align-self-center" elevation="12" max-width="30%">
                    <h4 class="text-h5 font-weight-bold mb-2">{{ task.title }}</h4>
                    <div class="text-subtitle-1 mb-2">
                        Уровень: <v-chip color="teal-darken-2">{{ task.level }} </v-chip>
                    </div>
                    <p class="mb-2">
                        {{ task.description }}
                    </p>
                    <div v-if="solved_tasks.findIndex((st) => st == task.id) > -1">
                        <v-btn prepend-icon="mdi-check-circle" width="100%" variant="flat" color="green-darken-2">
                            Задача решена
                        </v-btn>
                    </div>
                    <v-btn v-else @click="solveTask(task.id)" width="100%" variant="flat" color="light-blue-darken-4">
                        Решить задачу
                    </v-btn>
                </v-sheet>
            </v-sheet>
            <div v-if="pageLength > 1" class="text-center">
                <v-pagination v-model="page" :length="pageLength"></v-pagination>
            </div>
        </v-card-text>
    </v-card>

    <NoticeDialog :show="noticeDialog.show" :type="noticeDialog.type" :message="noticeDialog.msg"
        @notice-dlg-close="onNoticeDlgClose" />
</template>
<script>
import NoticeDialog from '@/components/NoticeDialog.vue';

export default {
    name: "TasksList",
    props: {
        user_id: {
            type: Number,
            required: true,
        },
        tasks: {
            type: Array,
            required: true,
        },
        solved_tasks: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            pageLength: 1, 
            page: 1,
            tasksToPageSize: 6, 
            noticeDialog: {
                show: false,
                type: 'notice',
                msg: '',
            }
        };
    },
    components: { NoticeDialog },
    computed: {
        sortedTasks() {
            return this.tasks
                .filter((row, index, array) => {
                    let pageLength = Math.ceil(
                        array.length / this.tasksToPageSize
                    );
                    this.setPageLength(pageLength); // задали количество страниц исходя из текущего количества элементов

                    let start = (this.page - 1) * this.tasksToPageSize;
                    let end = this.page * this.tasksToPageSize;
                    if (index >= start && index < end) return true;
                });
        }
    }, 
    methods: {
        solveTask(task_id) {
            let solvedTask = {
                task_id: task_id,
                user_id: this.user_id,
            }
            this.$store.dispatch("TasksModule/onSolveTask", solvedTask).then(
                () => {
                    this.noticeDialog.show = true;
                    this.noticeDialog.type = 'notice';
                    this.noticeDialog.msg = 'Задача была успешно решена';
                },
                (error) => {
                    this.noticeDialog.show = true;
                    this.noticeDialog.type = 'error';
                    this.noticeDialog.msg = `При решении задачи возникла ошибка: ${error}`;
                }
            )
        }, 
        setPageLength(pageLength) {
            this.pageLength = pageLength; 
        }, 
        onNoticeDlgClose() {
            this.noticeDialog.show = false; 
            this.noticeDialog.type = 'notice';
            this.noticeDialog.msg = ''; 
        }
    }
}
</script>