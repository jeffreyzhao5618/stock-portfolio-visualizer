import Vue from "vue";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import router from "./router";

export const globalBus = new Vue({
  data: {
    loggedIn: false,
    portfolio: [],
    userID: ''
  },
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
