<template>
  <div>
    <v-row class="ma-2">
      <nav-card @displayChanged="updateDisplay($event)"></nav-card>
      <v-col>
        <empty-portfolio-card v-if="emptyPortfolio"></empty-portfolio-card>
        <treemap v-if="!emptyPortfolio && displayNum == 0"></treemap>
        <div v-if="!emptyPortfolio && displayNum == 1">Graph</div>
        <div v-if="!emptyPortfolio && displayNum == 2">
          <button @click="getPortfolioContentDimensions">Click</button>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NavCard from "../components/PortfolioNav";
import TreeMap from "../components/Treemap";
import EmptyPortfolioCard from '../components/EmptyPortfolioCard'
import {globalBus} from '../main'
import {rerouteMixin} from './reroute'

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
    emptyPortfolioCard: EmptyPortfolioCard
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
  computed: {
    emptyPortfolio() {
      return globalBus.portfolio.length == 0
    }
  },
  mixins: [rerouteMixin]
  // mounted() {
  //     this.getPortfolioContentDimensions();
  // }
};
</script>

<style scoped></style>
