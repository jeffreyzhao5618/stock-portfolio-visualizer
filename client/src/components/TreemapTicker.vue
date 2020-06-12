<template>
  <v-card 
    class="ticker-block" 
    :class="{highlight: highlight}" 
    :style="tickerBlockContainer" 
    style="position: absolute;"
    tile 
    flat 
    :color="getColor"
    :href="tickerBlockData.name != 'USD' ? 'https://finance.yahoo.com/quote/'+tickerBlockData.name+'?p='+tickerBlockData.name+'&.tsrc=fin-srch' : ''">
    <v-row align="center" justify="center" :style="{height: tickerBlockContainer.height}">
      <div>
        <v-card-title style="text-align:center;" class="d-block">
          {{tickerBlockData.name}}
          <br/>
          {{getPercentChange}}
        </v-card-title>
        <!-- <v-btn 
            v-if="tickerBlockData.name != 'USD'" 
            :href="'https://finance.yahoo.com/quote/'+tickerBlockData.name+'?p='+tickerBlockData.name+'&.tsrc=fin-srch'"
            class="mx-auto d-block"><span class="mt-2">Full Quote</span></v-btn> -->
      </div>
    </v-row>
  </v-card>

  <!-- <div class="map-block"
        :style="tickerBlockContainer">
    {{ tickerBlockData.name }}
    {{ tickerBlockData.percentChange}}
  </div>-->
</template>

<script>
export default {
  props: {
    tickerBlockData: Object,
    colorsList: Object,
    highlight: Boolean
  }, 
//   methods: {
//       gotToQuote() {
//           window.location.href = 'https://finance.yahoo.com/quote/'+this.tickerBlockData.name+'?p='+this.tickerBlockData.name+'&.tsrc=fin-srch';
//       }
//   },
  computed: {
    tickerBlockContainer() {
      return {
        top: this.tickerBlockData.y0 + "px",
        left: this.tickerBlockData.x0 + "px",
        width: this.tickerBlockData.x1 - this.tickerBlockData.x0 + "px",
        height: this.tickerBlockData.y1 - this.tickerBlockData.y0 + "px"
      };
    },
    getColor() {
      console.log(this.tickerBlockData);
      let percentChange = this.tickerBlockData.percentChange;
      let percentThreshold = 3;
      if (percentChange <= 0) {
        let colorIndex =
          percentChange <= -percentThreshold
            ? this.colorsList.redColors.length - 1
            : Math.floor(
                (percentChange / -percentThreshold) *
                  this.colorsList.redColors.length
              );
        return "#" + this.colorsList.redColors[colorIndex];
      } else {
        let colorIndex =
          percentChange >= percentThreshold
            ? this.colorsList.greenColors.length - 1
            : Math.floor(
                (percentChange / percentThreshold) *
                  this.colorsList.greenColors.length
              );
        return "#" + this.colorsList.greenColors[colorIndex];
      }
    },
    getPercentChange() {
      if (this.tickerBlockData.name != "USD") {
        if (this.tickerBlockData.percentChange > 0) {
          return "+" + this.tickerBlockData.percentChange + "%";
        }
        return this.tickerBlockData.percentChange + "%";
      }
      return "";
    }
  }
};
</script>

<style scoped>
/* .map-block {
    position: absolute;
    border-style: solid;
    border-color: blue;
    border-width: 1px;
} */
.ticker-block {
  border: 1px solid black !important;
}
.ticker-block:hover {
  filter: brightness(150%);
}
.highlight {
  border-color: yellow !important;
}
</style>