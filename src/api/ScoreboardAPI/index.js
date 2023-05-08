import ApiInstance from '@/api/index'

export const ScoreboardAPI = {
  getTasksCount() { 
     const url = '/scoreboard/tasks_count';
     return ApiInstance.get(url);
  }, 
  getUserRating(user_id) {
    const url = `scoreboard/personal_rating/${user_id}`
    return ApiInstance.get(url);
  }, 
  getRating() {
    const url = '/scoreboard/ratings';
    return ApiInstance.get(url);
  }
}