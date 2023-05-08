import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from "vuetify";

export default createVuetify(
  {  
    components,
    directives,
    theme: {
      defaultTheme: "westeros",
      themes: {
        dark_vintage: {
          colors: {
            background: "#333333",
            surface: "#3D3D3D",
            primary: "#262626",
            accent: "#24a39b", 
            secondary: "#7289ab",
            success: "#73a373", 
            info: "#73b9bc", 
            warning: "#eedd78",
            error: "#dd6b66", 
          },
        },
        westeros: {
          colors: {
            background: "#cccccc",
            surface: "#eeeeee",
            primary: "#283593",
            accent: "#24a39b",
            secondary: "#59c4e6",
            success: "#61a0a8",
            info: "#a5e7f0",
            warning: "#d87c7c",
            error: "#724e58",
          },
        },
      },
    },
  }
);
