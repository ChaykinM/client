import ApiInstance from '@/api/index'

export const TasksAPI = {
  getTasks() { 
     const url = '/tasks/';
     return ApiInstance.get(url);
  }, 
  getSolvedTasks(user_id) {
    const url = `tasks/personal_solved/${user_id}`; 
    return ApiInstance.get(url); 
  }, 
  addTask(addRequest) {
    const url = '/tasks/add';
    return ApiInstance.post(url, addRequest); 
  },
  solveTask(solvedTask) {
    const url = `/tasks/${solvedTask["task_id"]}/solve`;
    return ApiInstance.post(url, solvedTask);
  }
}