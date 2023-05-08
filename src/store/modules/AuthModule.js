import { AuthAPI } from "@/api/AuthAPI"

export const AuthModule = {
    namespaced: true,

    state() {
        return {
            jwtToken: localStorage.getItem("token") || '',
        };
    },

    mutations: {
        SET_AUTH_TOKEN: (state, token) => {
            localStorage.setItem("token", token);
            state.jwtToken = token;
        },
        DELETE_TOKEN: (state) => {
            localStorage.removeItem("token");
            state.jwtToken = '';
        }
    },

    actions: {
        onLogin({ commit }, { login, password }) {
            return new Promise((resolve, reject) => {
                AuthAPI.login(login, password).then(
                    (res) => {
                        commit('SET_AUTH_TOKEN', res.data.Token);
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    });
            })
        },

        onRegister({ commit }, registerRequest) {
            return new Promise((resolve, reject) => {
                AuthAPI.register(registerRequest).then(
                    (res) => {
                        commit('SET_AUTH_TOKEN', res.data.Token);
                        resolve();
                    },
                    (error) => {
                        reject(error.response.data.error);
                    }
                )
            })
        },

        onLogout({commit}) {
            commit("DELETE_TOKEN"); 
        }
    }
}