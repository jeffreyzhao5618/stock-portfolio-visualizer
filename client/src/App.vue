<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <app-header></app-header>
    <v-main>
      <router-view> </router-view>
    </v-main>
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
