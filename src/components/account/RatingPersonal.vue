<template>
    <v-card class="mb-8">
        <v-card-title class="pa-0">
            <v-toolbar color="primary">
                <v-toolbar-title>Персональный рейтинг</v-toolbar-title>
            </v-toolbar>
        </v-card-title>
        <v-card-text>
            <v-list>
                <v-list-item :prepend-icon="'mdi-fire'">решено <v-chip color="teal-darken-2">{{ userRating.first_level
                }}</v-chip> из <v-chip color="light-blue-darken-2">{{ tasksCount.first_level }}</v-chip> задач
                    первого
                    уровня</v-list-item>
                <v-list-item :prepend-icon="'mdi-medal'">решено <v-chip color="teal-darken-2">{{ userRating.second_level
                }}</v-chip> из <v-chip color="light-blue-darken-2">{{ tasksCount.second_level }}</v-chip> задач
                    второго
                    уровня</v-list-item>
                <v-list-item :prepend-icon="'mdi-emoticon-devil'">решено <v-chip color="teal-darken-2">{{
                    userRating.third_level }}</v-chip> из <v-chip color="light-blue-darken-2">{{
        tasksCount.third_level }}</v-chip> задач третьего
                    уровня</v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "RatingPersonal",
    props: {
        tasksCount: {
            type: Object,
            required: true,
        },
        userRating: {
            type: Object,
            required: true,
        },
    }
}
</script>