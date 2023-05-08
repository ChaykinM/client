<template>
    <v-card :loading="users.length == 0 ? true : false">
        <v-card-title class="pa-0">
            <v-toolbar color="primary">
                <v-toolbar-title>Все пользователи</v-toolbar-title>
            </v-toolbar>
        </v-card-title>
        <v-card-text>
            <v-table>
                <thead>
                    <tr>
                        <th>Время регистрации</th>
                        <th>Логин</th>
                        <th>Почта</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user">
                        <td width="15%">{{ user.reg_time }}</td>
                        <td width="25%">{{ user.login }}</td>
                        <td width="25%">{{ user.email }}</td>
                        <td width="15%">{{ user.status }}</td>
                        <td width="20%">
                            <div class="d-flex justify-end">
                                <v-tooltip location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-btn color="indigo-darken-4" v-bind="props" class="mx-2">
                                            <v-icon size="32">mdi-pencil</v-icon>
                                            <UserEdit :user="user" @edit-user="onUserEdit"/>
                                        </v-btn>
                                    </template>
                                    <span>Редактировать пользователя</span>
                                </v-tooltip>
                                <v-tooltip location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-btn color="red-darken-4" v-bind="props" class="mx-2">
                                            <v-icon size="32">mdi-delete-sweep</v-icon>
                                            <UserDelete :user-id="user.id" @delete-user="onUserDelete"/>
                                        </v-btn>
                                    </template>
                                    <span>Удалить пользователя</span>
                                </v-tooltip>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-text>
    </v-card>

    <NoticeDialog :show="noticeDialog.show" :type="noticeDialog.type" :message="noticeDialog.msg" @notice-dlg-close="onNoticeDlgClose" />
</template>

<script>
import UserEdit from '@/components/account/UserEdit.vue';
import UserDelete from '@/components/account/UserDelete.vue';
import NoticeDialog from '@/components/NoticeDialog.vue';

export default {
    name: "UsersTable",
    props: {
        users: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            noticeDialog: {
                show: false, 
                type: 'notice',
                msg: '', 
            }
        };
    },
    components: {UserEdit, UserDelete, NoticeDialog},
    methods: {
        onUserEdit(request) {
            this.$store.dispatch("UsersModule/onUserEdit", { userUpdate: request }).then(
                    () => { 
                        this.noticeDialog.show = true;
                        this.noticeDialog.type = 'notice';
                        this.noticeDialog.msg = 'Пользователь был успешно отредактирован';
                    },
                    (error) => {
                        this.noticeDialog.show = true;
                        this.noticeDialog.type = 'error';
                        this.noticeDialog.msg = `При редактировании пользователя возникла ошибка: ${error}`;
                    }
                );
        }, 
       
        onUserDelete(userId) {
            this.$store.dispatch("UsersModule/onUserDelete", { id: userId }).then(
                () => { 
                    this.noticeDialog.show = true;
                    this.noticeDialog.type = 'notice';
                    this.noticeDialog.msg = 'Пользователь был успешно удалён';
                },
                (error) => {
                    this.noticeDialog.show = true;
                    this.noticeDialog.type = 'error';
                    this.noticeDialog.msg = `При удалении пользователя возникла ошибка: ${error}`;
                }
            );
        },
        onNoticeDlgClose() {
            this.noticeDialog.show = false; 
            this.noticeDialog.type = 'notice';
            this.noticeDialog.msg = ''; 
        }
    }

}
</script>