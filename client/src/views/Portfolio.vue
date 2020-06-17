<template>
  <div>
    <v-row class="ma-2">
      <nav-card @displayChanged="updateDisplay($event)"></nav-card>
      <v-col>
        <treemap v-if="displayNum == 0"></treemap>
        <div v-if="displayNum == 1">Graph</div>
        <div v-if="displayNum == 2">
          <button @click="getPortfolioContentDimensions">Click</button>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NavCard from "../components/PortfolioNav";
import TreeMap from "../components/Treemap";
export default {
  data() {
    return {
      displayNum: 0,
      // contentWidth: 0,
      // contentHeight: 0
    };
  },
  components: {
    navCard: NavCard,
    treemap: TreeMap,
  },
  methods: {
    updateDisplay(newNum) {
      this.displayNum = newNum;
    },
    // getPortfolioContentDimensions() {
    //     this.contentWidth = this.$refs.portfolioContent.offsetWidth;
    //     this.contentHeight = this.contentWidth * .8;
    // }
  },
  // mounted() {
  //     this.getPortfolioContentDimensions();
  // }
};
</script>

<style scoped></style>
