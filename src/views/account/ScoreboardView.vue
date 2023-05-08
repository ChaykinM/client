<template>
    <v-container>
        <div class="d-flex justify-center ma-2" v-if="loadingPersonalRating.tasksCountStatus == true || loadingPersonalRating.userRatingStatus" style="width: 100%;">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
            Загрузка персонального рейтинга ... 
        </div>
        <div v-else-if="loadingPersonalRating.tasksCountError != '' || loadingPersonalRating.userRatingError != ''">
            <v-alert v-if="loadingPersonalRating.userRatingError != ''" type="error" class="mb-2">{{ loadingPersonalRating.userRatingError }}</v-alert>
            <v-alert v-if="loadingPersonalRating.tasksCountError != ''" type="error" class="mb-2">{{ loadingPersonalRating.tasksCountError }}</v-alert>
        </div>
        <div v-else>
            <RatingPersonal :tasks-count="tasksCount" :user-rating="userRating"/>
        </div>
        <div class="d-flex justify-center ma-2" v-if="loadingRatings.status == true" style="width: 100%;">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
            Загрузка рейтинга пользователей... 
        </div>
        <div v-else-if="loadingRatings.error != ''"><v-alert type="error">{{ loadingRatings.error }}</v-alert></div>
        <div v-else>
            <RatingTables v-if="ratings.length != 0" :ratings="ratings" />
        </div>
    </v-container>
</template>

<script>
import { ScoreboardAPI } from '@/api/ScoreboardAPI';
import RatingPersonal from '@/components/account/RatingPersonal.vue';
import RatingTables from '@/components/account/RatingTables.vue';

export default {
    name: "ScoreboardView",
    data() {
        return {
            user_id: -1,
            userRating: {},
            tasksCount: {},
            ratings: [],
            loadingRatings: {
                status: false,
                error: '',
            }, 
            loadingPersonalRating: {
                tasksCountStatus: false,
                tasksCountError: '',
                userRatingStatus: false,
                userRatingError: '',
            }
        };
    },
    mounted() {
        const token = localStorage.getItem("token");
        this.isAuthenticated = token !== null ? true : false;
        if (this.isAuthenticated) {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const payload = decodeURIComponent(window.atob(base64).split("").map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            const jsonPayload = JSON.parse(payload);
            this.user_id = jsonPayload.id;
        }
        this.loadingPersonalRating.tasksCountStatus = true; 
        this.loadingPersonalRating.userRatingStatus = true; 
        ScoreboardAPI.getUserRating(this.user_id).then((res) => {
            this.userRating = res.data.user_rating;
            this.loadingPersonalRating.userRatingStatus = false; 
            this.loadingPersonalRating.userRatingError = ''; 
        }, (error) => {
            this.loadingPersonalRating.userRatingStatus = false; 
            this.loadingPersonalRating.userRatingError = error; 
        });
        ScoreboardAPI.getTasksCount().then((res) => {
            this.tasksCount = res.data.tasks_stats;
            this.loadingPersonalRating.tasksCountStatus = false; 
            this.loadingPersonalRating.tasksCountError = ''; 
        }, (error) => {
            this.loadingPersonalRating.tasksCountStatus = false; 
            this.loadingPersonalRating.tasksCountError = error; 
        });
        this.loadingRatings.status = true;
        ScoreboardAPI.getRating().then((res) => {
            this.ratings = res.data.ratings;
            this.loadingRatings.status = false; 
            this.loadingRatings.error = ''; 
        }, (error) => {
            this.loadingRatings.status = false; 
            this.loadingRatings.error = error; 
        });
    },
    components: { RatingTables, RatingPersonal }
}
</script>