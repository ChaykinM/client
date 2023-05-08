<template>
    <v-container>
        <v-card>
            <v-card-title class="pa-0">
                <v-toolbar color="primary">
                    <v-toolbar-title>Описание решения </v-toolbar-title>
                </v-toolbar>
            </v-card-title>
            <v-card-text>
                <p class="text-h6 text-center">
                    Общая архитектура
                </p>
                <p>
                    Клиентское приложение сделано на фреймворке Vue JS с использованием Vuex для организации управления
                    состоянием приложения, Vuetify в качестве библиотеки UI элементов, Axios для создания API запросов.
                    Бекэнд был написан на Golang с использованием фреймоврка Gin. База данных: PostgreSQL.
                    Схема базы представлена ниже. 
                </p>
                <v-img src="/erd.png" width="600px"></v-img>
                <p class="text-h6 text-center">
                    Разграничение ролей
                </p>
                <p>
                    <span class="font-weight-bold">employee</span> - работник компании, может проходить задачи; <br/>
                    <span class="font-weight-bold">editor</span> - сотрудник команды преокта, может добавлять задачи;<br/>
                    <span class="font-weight-bold">admin</span> - глава команды проекта, может добавлять задачи, а также взаимодействовать с пользователями:
                    устанавливать статусы, удалять аккаунты.<br/>
                </p>
                <p class="text-h6 text-center">
                    Аккаунты
                </p>
                <p>
                    Доступ ко всем аккаунтам: логин:пароль. <br/>
                    <span class="font-weight-bold">admin:admin</span> <br/>
                    <span class="font-weight-bold">admin:admin</span> <br/>
                    <span class="font-weight-bold">test:test</span> <br/>
                </p> 
                <p class="text-h6 text-center">Принятые допущения</p>
                <p>
                    Задача состоит из заголовка и описания. Чтобы решить задачу нужно нажать на кнопку "решить задачу" на странице <router-link :to="'/account/tasks'">Задачи</router-link> <br/>
                    Страница <router-link :to="'account/scoreboard'">scoreboard</router-link> доступна только после авторизации пользователя.  <br />
                    Авторизация производится посредством JWT токенов. В полезной нагрузке JWT токена: id пользователя, фамилия, имя, статус, время выпуска токена, время его "протухания". <br />
                    Для каждого запроса на сервер предусмотрена проверка JWT токена, прилагаемого в заголовке Authorization. <br/> 
                    Для формирования рейтинга вызывается три запроса:  <span class="font-weight-bold">/scoreboard/tasks_count </span> - получить общее число задач по уровням,  <span class="font-weight-bold">scoreboard/personal_rating/{user_id}</span> - 
                    получить персональный рейтинг,  <span class="font-weight-bold">/scoreboard/ratings</span> - получить данные для рейтинговой таблицы. <br/>
                </p>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "DocView",
    data() {
        return {

        };
    }
}
</script>