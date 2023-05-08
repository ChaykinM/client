<template>
    <v-card>
        <v-card-title class="pa-0">
            <v-toolbar color="primary">
                <v-toolbar-title>Добавление новой задачи</v-toolbar-title>
            </v-toolbar>
        </v-card-title>
        <v-card-text>
            <v-form ref="form" lazy-validation>
                <v-radio-group v-model="taskAddRequest.level" inline class="mt-2">
                    <template v-slot:label>
                        <div><strong>Уровень сложности</strong></div>
                    </template>
                    <v-radio label="Уровень 1" :value="1"></v-radio>
                    <v-radio label="Уровень 2" :value="2"></v-radio>
                    <v-radio label="Уровень 3" :value="3"></v-radio>
                </v-radio-group>
                <v-text-field v-model.trim="taskAddRequest.title" placeholder="Название задачи"
                    :rules="[v => !!v || 'Поле является обязательным для заполнения']"></v-text-field>
                <v-textarea v-model.trim="taskAddRequest.description" label="Описание задачи"
                    :rules="[v => !!v || 'Поле является обязательным для заполнения']"></v-textarea>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="add()" variant="flat" color="light-blue-darken-4" >
                Добавить
            </v-btn>
        </v-card-actions>
    </v-card>

    <NoticeDialog :show="noticeDialog.show" :type="noticeDialog.type" :message="noticeDialog.msg"
        @notice-dlg-close="onNoticeDlgClose" />
</template>

<script>
import NoticeDialog from '@/components/NoticeDialog.vue';

export default {
    name: "TaskAdd",
    data() {
        return {
            taskAddRequest: {
                title: '',
                description: '',
                level: 1,
            },
            noticeDialog: {
                show: false,
                type: 'notice',
                msg: '',
            }
        };
    },
    components: { NoticeDialog },
    methods: {
        async add() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                this.$store.dispatch("TasksModule/onAddTask", this.taskAddRequest).then(
                    () => {
                        this.noticeDialog.show = true;
                        this.noticeDialog.type = 'notice';
                        this.noticeDialog.msg = 'Задача была успешно добавлена';
                        this.taskAddRequest = {
                            title: '',
                            description: '',
                            level: 1,
                        }; 
                    },
                    (error) => {
                        this.noticeDialog.show = true;
                        this.noticeDialog.type = 'error';
                        this.noticeDialog.msg = `При добавлении задачи возникла ошибка: ${error}`;
                    }
                )
            }
        }, 
        onNoticeDlgClose() {
            this.noticeDialog.show = false; 
            this.noticeDialog.type = 'notice';
            this.noticeDialog.msg = ''; 
        }
    }
}
</script>