<template>
  <div
    class="fund-block"
    :style="fundBlockContainer"
    @mouseenter="highlight = true"
    @mouseleave="highlight = false"
  >
    <div
      :style="fundNameTagContainer"
      class="fund-tag"
      :class="{ 'fund-tag-hover': highlight }"
    >
      {{ fundBlockData[0].fund.toUpperCase() }}
    </div>

    <div v-for="(tickerBlock, i) in fundBlockData" :key="i">
      <ticker-block
        :tickerBlockData="tickerBlock"
        :highlight="highlight"
        :colorsList="colorsList"
        @highlightFund="highlight = true"
      ></ticker-block>
    </div>
  </div>
</template>

<script>
import TickerBlock from "./TreemapTicker";

export default {
  data() {
    return {
      spacer: 10,
      container: { x0: 0, y0: 0, x1: 0, y1: 0 },
      highlight: false,
    };
  },
  props: {
    fundBlockData: Array,
    colorsList: Object,
  },
  computed: {
    fundBlockContainer() {
      return {
        top: this.container.y0 + "px",
        left: this.container.x0 + "px",
        width: this.container.x1 - this.container.x0 + "px",
        height: this.container.y1 - this.container.y0 + "px",
      };
    },
    fundNameTagContainer() {
      return {
        width: this.container.x1 - this.container.x0 + "px",
      };
    },
  },
  created() {
    let edgeBlocksX = [];
    let edgeBlocksY = [];
    let maxX1 = 0;
    let maxY1 = 0;
    let shiftX = this.fundBlockData[0].x0;
    let shiftY = this.fundBlockData[0].y0;

    this.container.x0 = this.fundBlockData[0].x0;
    this.container.y0 = this.fundBlockData[0].y0;

    for (let i in this.fundBlockData) {
      if (Math.round(this.fundBlockData[i].x1) >= maxX1) {
        if (Math.round(this.fundBlockData[i].x1) > maxX1) {
          edgeBlocksX = [];
          maxX1 = Math.round(this.fundBlockData[i].x1);
        }
        edgeBlocksX.push(Number(i));
      }
      if (Math.round(this.fundBlockData[i].y1) >= maxY1) {
        if (Math.round(this.fundBlockData[i].y1) > maxY1) {
          edgeBlocksY = [];
          maxY1 = Math.round(this.fundBlockData[i].y1);
        }
        edgeBlocksY.push(Number(i));
      }

      this.fundBlockData[i].x0 -= shiftX;
      this.fundBlockData[i].x1 -= shiftX;
      this.fundBlockData[i].y0 -= shiftY;
      this.fundBlockData[i].y1 -= shiftY;
    }

    this.container.x1 = maxX1 - this.spacer;
    this.container.y1 = maxY1 - this.spacer;

    for (let i in edgeBlocksX) {
      let index = edgeBlocksX[i];
      this.fundBlockData[index].x1 -= this.spacer;
    }
    for (let i in edgeBlocksY) {
      let index = edgeBlocksY[i];
      this.fundBlockData[index].y1 -= this.spacer;
    }
  },
  components: {
    tickerBlock: TickerBlock,
  },
};
</script>

<style scoped>
/* .ticker-block {
  position: static;
  border-style: solid;
  border-color: white;
  border-width: 1px;
} */
.fund-tag {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 30px;
  z-index: 1;
  border-radius: 0px, 0px, 30px, 0px !important;
  padding: 5px 0px 0px 10px;
  background-color: rgba(24, 24, 24, 0.5);
}

.fund-tag-hover {
  background-color: yellow;
  color: black;
}

.fund-block {
  position: absolute;
}
</style>
