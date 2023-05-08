<template>
    <v-card class="mx-auto pa-8 " elevation="8" width="448" rounded="lg">
        <v-form ref="form" lazy-validation>
            <div class="text-subtitle-1 text-medium-emphasis">Логин</div>
            <v-text-field @keydown.enter.prevent="onRegister()" v-model.trim="login" density="compact"
                placeholder="Логин" prepend-inner-icon="mdi-account-outline" variant="outlined"
                :rules="[v => !!v || 'Поле является обязательным для заполнения']"></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis">Имя</div>
            <v-text-field @keydown.enter.prevent="onRegister()" v-model.trim="firstName" density="compact"
                placeholder="Имя" prepend-inner-icon="mdi-account-outline" variant="outlined"
                :rules="[v => !!v || 'Поле является обязательным для заполнения']"></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis">Фамилия</div>
            <v-text-field @keydown.enter.prevent="onRegister()" v-model.trim="secondName" density="compact"
                placeholder="Фамилия" prepend-inner-icon="mdi-account-outline" variant="outlined"
                :rules="[v => !!v || 'Поле является обязательным для заполнения']"></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Электронная почта</div>
            <v-text-field @keydown.enter.prevent="onRegister()" v-model.trim="email" :append-inner-icon="'mdi-mail-outline'"
                :type="'email'" density="compact" placeholder="Электронная почта"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" :rules="[v => !!v || 'Поле является обязательным для заполнения',
                v => isEmailValid(v) || 'Адрес электронной почты невалидный']"></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Пароль</div>
            <v-text-field @keydown.enter.prevent="onRegister()" v-model.trim="password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="Введите ваш пароль" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible"
                :rules="[v => !!v || 'Поле является обязательным для заполнения']"></v-text-field>
        </v-form>

        <v-card v-if="registrationError != ''" class="mb-6" color="red-darken-4" variant="flat">
            <v-card-text class="text-medium-emphasis text-caption">
                {{ registrationError }}
            </v-card-text>
        </v-card>

        <v-btn block color="light-blue-darken-4" size="large" variant="flat" @click="onRegister">
            Зарегистрироваться
        </v-btn>
    </v-card>
</template>
  
<script>

export default {
    name: "RegisterForm",

    data() {
        return {
            login: '',
            firstName: '',
            secondName: '',
            email: '',
            password: '',
            registrationError: '',
            visible: false,
        };
    },

    methods: {
        isEmailValid(v) {
            return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        async onRegister() {
            const { valid } = await this.$refs.form.validate()

            if (valid) {
                const registerRequest = { login: this.login, first_name: this.firstName, second_name: this.secondName, email: this.email, password: this.password }

                this.$store.dispatch('AuthModule/onRegister', registerRequest).then(
                    () => {
                        this.$router.push({ path: '/account/tasks' });
                    },
                    (error) => {
                        this.registrationError = error;
                    }
                );
            }
        },
    },
}
</script>