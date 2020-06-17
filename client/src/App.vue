<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <app-header></app-header>
    <v-content>
      <router-view> </router-view>
    </v-content>
  </v-app>
</template>
<script>
import Header from "./components/Header";

export default {
  components: {
    appHeader: Header,
  },
};
</script>

<style></style>
