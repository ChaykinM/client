<template>
    <v-container>
            <LoginForm />
    </v-container>
</template>
  
<script>
import LoginForm from "@/components/auth/LoginForm.vue";
export default {
    name: 'LoginView',
    components: { LoginForm }
}
</script>