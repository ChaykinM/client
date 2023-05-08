<template>
    <v-container>
        <RegisterForm />
    </v-container>
</template>

<script>
import RegisterForm from "@/components/auth/RegisterForm.vue";

export default {
    name: "RegisterView",
    data() {
        return {};
    },
    components: { RegisterForm },
}

</script>