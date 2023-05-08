<template>
    <v-card>
        <v-card-title class="pa-0">
            <v-toolbar color="primary">
                <v-toolbar-title>Рейтинг пользователей</v-toolbar-title>
            </v-toolbar>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="4">
                    <div class="text-h6 text-center">
                        Задачи первого уровня
                    </div>
                    <v-table>
                        <thead>
                            <tr>
                                <th>Пользователь</th>
                                <th>Результат</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in ratings.first_level" :key="row.user_id">
                                <td>{{ row.login }}</td>
                                <td>{{ row.count }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
                <v-col cols="4">
                    <div class="text-h6 text-center">
                        Задачи второго уровня
                    </div>
                    <v-table>
                        <thead>
                            <tr>
                                <th>Пользователь</th>
                                <th>Результат</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in ratings.second_level" :key="row.user_id">
                                <td>{{ row.login }}</td>
                                <td>{{ row.count }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
                <v-col cols="4">
                    <div class="text-h6 text-center">
                        Задачи третьего уровня
                    </div>
                    <v-table>
                        <thead>
                            <tr>
                                <th>Пользователь</th>
                                <th>Результат</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in ratings.third_level" :key="row.user_id">
                                <td>{{ row.login }}</td>
                                <td>{{ row.count }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>

            </v-row>
        </v-card-text>


    </v-card>
</template>

<script>
export default {
    name: "RatingTables",
    props: {
        ratings: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {

        }
    },
}
</script>