<template>
  <v-col :cols="small ? 12 : 2" style="min-width: 200px;">
    <v-card>
      <v-list>
        <v-subheader>DISPLAY</v-subheader>
        <v-list-item-group v-model="displayNum">
          <v-list-item
            v-for="(display, index) in displayList"
            :key="index"
            @click="changeDisplay(index)"
          >
            <v-list-item-icon>
              <v-icon>{{ display.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="green--text text--lighten-5">{{
                display.name
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-divider></v-divider>
        <v-subheader>OPTIONS</v-subheader>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      displayList: [
        { name: "Tree-Map", icon: "mdi-chart-tree" },
        { name: "Graph", icon: "mdi-chart-line" },
        { name: "Chart", icon: "mdi-poll" },
      ],
      displayNum: 0,
      small: false,
    };
  },
  methods: {
    changeDisplay(newNum) {
      this.$emit("displayChanged", newNum);
    },
  },
};
</script>

<style>
.lg-position {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 200px;
}
</style>
