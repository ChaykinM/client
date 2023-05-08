import { createStore } from 'vuex';
import { AuthModule } from './modules/AuthModule';
import { TasksModule } from './modules/TasksModule';
import { UsersModule } from './modules/UsersModule';

export default createStore({
  state() {
    return {
      themeSettings: JSON.parse(localStorage.getItem('themeSettings')) || {themeName: 'westeros'}, 
    };
  },
  mutations: {
    SET_THEME_SETTINGS: (state, themeSettings) => {
      localStorage.setItem('themeSettings', JSON.stringify(themeSettings)); 
      state.themeSettings = themeSettings; 
    }, 
  },
  getters: {
    GET_THEME_SETTINGS: (state) => {
      return state.themeSettings;
    }, 
  },
  actions: {
    onChangeThemeSettings( { commit }, themeSettings) {
      commit('SET_THEME_SETTINGS', themeSettings); 
    }, 
  },
  modules: {
    AuthModule,
    TasksModule,  
    UsersModule
  }
})
