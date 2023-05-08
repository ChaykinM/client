import { TasksAPI } from "@/api/TasksAPI";

export const TasksModule = {
    namespaced: true,

    state() {
        return {
            tasks: [],
            solved_tasks: [],
        };
    },

    mutations: {
        SET_TASKS: (state, tasks) => {
            state.tasks = tasks == null ? [] : tasks;
        },
        SET_SOLVED_TASKS: (state, solved_tasks) => {
            state.solved_tasks = solved_tasks == null ? [] : solved_tasks; 
        }, 
        ADD_TASK: (state, task) => {
            state.tasks.push(task);
        },
        SOLVE_TASK: (state, task_id) => {
            state.solved_tasks.push(task_id);
        }
    },

    getters: {
        GET_TASKS: (state) => {
            return state.tasks;
        }, 
        GET_SOLVED_TASKS: (state) => {
            return state.solved_tasks; 
        }
    },
    actions: {
        async onGetTasks({ commit }, user_id) {
            const tasksResponse = await TasksAPI.getTasks();
            let tasks = tasksResponse.data.tasks;
            commit('SET_TASKS', tasks); 
            const solvedSasksResponse = await TasksAPI.getSolvedTasks(user_id);
            let solved_tasks = solvedSasksResponse.data.solved_tasks;
            commit('SET_SOLVED_TASKS', solved_tasks); 
        },
        onAddTask({commit}, taskAddRequest) {
            return new Promise((resolve, reject) => {
                TasksAPI.addTask(taskAddRequest).then(
                    (res) => {
                        taskAddRequest["id"] = res.data.id; 
                        commit("ADD_TASK", taskAddRequest); 
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                )
            })
        },
        onSolveTask({commit}, solvedTask) {
            return new Promise((resolve, reject) => {
                TasksAPI.solveTask(solvedTask).then(
                    () => {
                        commit("SOLVE_TASK", solvedTask.task_id); 
                        resolve(); 
                    },
                    (error) => {
                        reject(error); 
                    }
                )
            })
        }
    }
}