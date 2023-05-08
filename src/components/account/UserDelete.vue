<template>
    <ConfirmationDlg :msg="msg" @confirm="onConfirm"/>
</template>

<script>
import ConfirmationDlg from '../ConfirmationDlg.vue';

export default {
    name: "UserDelete",
    props: {
        userId: {
            type: Number,
            required: true,
        }
    },
    emits: ["deleteUser"],
    data() {
        return {
            msg: "Вы точно хотите безвозвратно удалить пользователя?",
        };
    },
    methods: {
        onConfirm() {
            this.$emit("deleteUser", this.userId);
        }
    },
    components: { ConfirmationDlg }
}
</script>