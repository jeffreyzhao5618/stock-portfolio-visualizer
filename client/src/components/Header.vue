<template>
  <v-app-bar app dense color="primary">
    <v-toolbar-title class="green--text text--lighten-5"
      >Portfolio Visualizer</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn
      v-if="!loggedIn"
      depressed
      color="green lighten-5"
      class="mr-4"
      :to="{ name: 'Login' }"
      ><span class="green--text text--darken-4">Log In</span></v-btn
    >
    <v-btn
      v-if="!loggedIn"
      depressed
      color="green darken-1"
      :to="{ name: 'Register' }"
      ><span class="green--text text--lighten-5">Register</span></v-btn
    >
    <v-btn
      v-if="loggedIn"
      depressed
      color="green lighten-5"
      class="mr-4"
      @click="logOut"
      :to="{ name: 'Login' }"
      ><span class="green--text text--darken-4">Log Out</span></v-btn
    >

    <template v-slot:extension>
      <v-tabs align-with-title color="green lighten-5">
        <v-tab :to="{ name: 'Home' }">Home</v-tab>
        <v-tab :to="{ name: getPortfolioRedirect }">Portfolio</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import { globalBus } from "../main.js";

export default {
  data() {
    return {
      portfolioRedirect: (to) => {
        return globalBus.loggedIn ? to : "/login";
      },
    };
  },
  computed: {
    loggedIn() {
      return globalBus.loggedIn;
    },
    getPortfolioRedirect() {
      return globalBus.loggedIn ? "Portfolio" : "Login";
    },
  },
  methods: {
    logOut() {
      globalBus.loggedIn = false;
    },
  },
};
</script>

<style></style>
