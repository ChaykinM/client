<template>
  <v-app>
    <v-navigation-drawer v-if="isAuthenticated && $route.meta.requiresAuth" class="rounded-e-xl" color="primary"
      expand-on-hover floating permanent rail>
      <v-list>
        <v-list-item prepend-icon="mdi-account-circle" :title="`${userInfo.firstName} ${userInfo.secondName}`"
          :subtitle="userInfo.email"></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list class="" density="comfortable" nav>
        <v-list-item v-for="route in routes" :key="route.title" :to="route.path" :prepend-icon="route.icon"
          :title="route.title" link exact></v-list-item>
        <div v-if="userInfo.status == 'editor' || userInfo.status == 'admin'">
          <v-list-item v-for="route in editor_routes" :key="route.title" :to="route.path" :prepend-icon="route.icon"
            :title="route.title" link exact></v-list-item>
        </div>
        <div v-if="userInfo.status == 'admin'">
          <v-list-item v-for="route in admin_routes" :key="route.title" :to="route.path" :prepend-icon="route.icon"
            :title="route.title" link exact></v-list-item>
        </div>
        <v-list-item @click="onLogout" prepend-icon="mdi-export" title="Выход" link exact>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item :prepend-icon="theme.global.name.value === 'westeros' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="changeTheme" title="Переключить тему">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="!$route.meta.requiresAuth" app>
      <v-toolbar color="primary">
        <v-spacer></v-spacer>
        <v-btn-group v-if="!isAuthenticated" class="mx-5" divided>
          <v-btn v-for="route in auth_routes" :key="route" :to="route.path" :prepend-icon="route.icon"
            color="indigo-darken-2" link exact>
            {{ route.title }}
          </v-btn>
        </v-btn-group>
        <v-btn-group v-else class="mx-5">

          <v-btn to="/account/tasks" :prepend-icon="'mdi-home'" variant="flat" color="indigo-darken-2" link exact>
            Кабинет пользователя
          </v-btn>
        </v-btn-group>
      </v-toolbar>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { useTheme } from 'vuetify'

export default {
  name: "ControlApp",
  setup() {
    const theme = useTheme()
    return {
      theme,
    }
  },
  data: () => ({
    isAuthenticated: null,
    userInfo: {
      firstName: '',
      secondName: '',
      email: '',
      status: '',
    },
    themeSettings: {
      themeName: "westeros"
    },
    auth_routes: [
      {
        path: "/auth/login",
        title: "Войти",
        icon: "mdi-login",
      },
      {
        path: "/auth/register",
        title: "Регистрация",
        icon: "mdi-account-plus-outline",
      }
    ],
    routes: [
      {
        path: "/account/tasks",
        title: "Задачи",
        icon: "mdi-hexagon-multiple",
      },
      {
        path: "/account/scoreboard",
        title: "Рейтинг",
        icon: "mdi-finance",
      },
    ],
    editor_routes: [
      {
        path: "/account/tasks_manager",
        title: "Добавить задачу",
        icon: "mdi-plus-box",
      },
    ],
    admin_routes: [
      {
        path: "/account/users_manager",
        title: "Пользователи",
        icon: "mdi-account-group",
      },
    ]
  }),

  mounted() {
    const token = localStorage.getItem("token")
    this.isAuthenticated = token !== null ? true : false;
    if (this.isAuthenticated) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const jsonPayload = JSON.parse(payload);
      this.userInfo.firstName = jsonPayload.first_name;
      this.userInfo.secondName = jsonPayload.second_name;
      this.userInfo.email = jsonPayload.email;
      this.userInfo.status = jsonPayload.status;
    }

    this.themeSettings = this.$store.getters["GET_THEME_SETTINGS"];
    this.theme.global.name.value = this.themeSettings.themeName;
  },

  methods: {
    changeTheme() {
      if (this.theme.global.name.value == 'westeros') {
        this.themeSettings.themeName = 'dark_vintage';
        this.theme.global.name.value = 'dark_vintage';
      } else {
        this.themeSettings.themeName = 'westeros';
        this.theme.global.name.value = 'westeros';
      }

      this.$store.dispatch("onChangeThemeSettings", this.themeSettings);
    },
    onLogout() {
      this.$store.dispatch("AuthModule/onLogout");
      this.$router.go({ path: '/auth/login' });
    }
  }
};
</script>

<style>
*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  background: rgb(179, 177, 177);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  background: rgb(136, 136, 136);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover {
  background: rgb(100, 100, 100);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb:active {
  background: rgb(68, 68, 68);
  border-radius: 10px;
}
</style>
