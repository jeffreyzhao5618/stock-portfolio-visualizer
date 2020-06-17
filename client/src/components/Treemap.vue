<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <div
          class="portfolio-wrapper d-block"
          ref="portfolioMap"
          :style="{ height: mapHeight + 'px' }"
        >
          <fund-block
            v-for="(fundBlock, i) in treemap"
            :key="i"
            :fundBlockData="fundBlock"
            :colorsList="colorsList"
          ></fund-block>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="mx-auto" style="width: 80%;">
          <div
            class="legend-card"
            v-for="(entry, i) in getLegend"
            :key="i"
            :style="{ backgroundColor: '#' + entry.color }"
          >
            {{ entry.number }}
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FundBlock from "./TreeMapFund";
import squarify from "squarify";
import squarifyObjectPromise from "../data/getSquarifyObject";
import { globalBus } from "../main";

export default {
  data: function() {
    return {
      treemap: [],
      colorsList: {
        redColors: [
          "1E1E1E",
          "251C1C",
          "2D1B1B",
          "351A1A",
          "3D1919",
          "441818",
          "4C1717",
          "541616",
          "5C1515",
          "631414",
          "6B1313",
          "731212",
          "7B1111",
          "821010",
          "8A0F0F",
          "920E0E",
          "9A0D0D",
          "A10C0C",
          "A90B0B",
          "B10A0A",
          "B90909",
          "C00808",
          "C80707",
          "D00606",
          "D80505",
          "DF0404",
          "E70303",
          "EF0202",
          "F70101",
          "FF0000",
        ],
        greenColors: [
          "1E1E1E",
          "1C251C",
          "1B2D1B",
          "1A351A",
          "193D19",
          "184418",
          "174C17",
          "165416",
          "155C15",
          "146314",
          "136B13",
          "127312",
          "117B11",
          "108210",
          "0F8A0F",
          "0E920E",
          "0D9A0D",
          "0CA10C",
          "0BA90B",
          "0AB10A",
          "09B909",
          "08C008",
          "07C807",
          "06D006",
          "05D805",
          "04DF04",
          "03E703",
          "02EF02",
          "01F701",
          "00FF00",
        ],
      },
      mapWidth: 0,
      mapHeight: 0,

      testObj: JSON.parse(
        '[{"name":"Bitcoin","value":2013.687328,"children":[{"name":"USD","value":1550,"quantity":1550,"purchasePrice":1550,"fund":"Bitcoin","percentChange":0},{"name":"BTC-USD","value":463.687328,"quantity":0.0479,"purchasePrice":450,"fund":"Bitcoin","marketPrice":9680.32,"percentChange":-0.17047054}]},{"name":"Energy","value":0,"children":[{"name":"USO","value":0,"quantity":0,"purchasePrice":-1117,"fund":"Energy","marketPrice":25.88,"percentChange":3.3959186}]},{"name":"Gold","value":2745.6,"children":[{"name":"GDX","value":2745.6,"quantity":80,"purchasePrice":2820.9,"fund":"Gold","marketPrice":34.32,"percentChange":0.9411756}]},{"name":"Finance","value":4424.82,"children":[{"name":"CINF","value":1179,"quantity":20,"purchasePrice":1084.85,"fund":"Finance","marketPrice":58.95,"percentChange":-2.6745896},{"name":"BRKB","value":742.32,"quantity":4,"purchasePrice":696.44,"fund":"Finance","marketPrice":185.58,"percentChange":0.25931698},{"name":"USD","value":2503.5,"quantity":2503.5,"purchasePrice":2503.5,"fund":"Finance","percentChange":0}]}]'
      ),
    };
  },
  components: {
    fundBlock: FundBlock,
  },
  watch: {
    mapWidth: function() {
      let container = { x0: 0, y0: 0, x1: this.mapWidth, y1: this.mapHeight };
      console.log(globalBus.portfolio);
      squarifyObjectPromise(globalBus.portfolio).then((data) => {
        let squarifyObject = squarify(data, container);
        let fund = [];
        let currFund = squarifyObject[0].fund;
        for (let x in squarifyObject) {
          if (Math.round(squarifyObject[x].value) == 0) {
            continue;
          }
          if (x == squarifyObject.length - 1) {
            fund.push(squarifyObject[x]);
            this.treemap.push(fund);
          } else if (squarifyObject[x].fund == currFund) {
            fund.push(squarifyObject[x]);
          } else {
            this.treemap.push(fund);
            fund = [];
            fund.push(squarifyObject[x]);
            currFund = squarifyObject[x].fund;
          }
        }
        console.log(JSON.stringify(data));
      });
      //this.treemap = squarify(this.testObj, container);
      // let squarifyObject = squarify(this.treemap, container);
      // let fund = [];
      // let currFund = squarifyObject[0].fund;
      // for(let x in squarifyObject) {
      //     if(Math.round(squarifyObject[x].value) == 0) { continue; }
      //     if(x == squarifyObject.length - 1) {
      //         fund.push(squarifyObject[x]);
      //         this.treemap.push(fund);
      //     } else if(squarifyObject[x].fund == currFund) {
      //         fund.push(squarifyObject[x]);
      //     } else {
      //         this.treemap.push(fund);
      //         fund = [];
      //         fund.push(squarifyObject[x]);
      //         currFund = squarifyObject[x].fund;
      //     }
      // }
    },
  },
  computed: {
    getLegend() {
      return [
        { color: this.colorsList.redColors[29], number: "-3%" },
        { color: this.colorsList.redColors[24], number: "-2.5%" },
        { color: this.colorsList.redColors[19], number: "-2%" },
        { color: this.colorsList.redColors[14], number: "-1.5%" },
        { color: this.colorsList.redColors[9], number: "-1%" },
        { color: this.colorsList.redColors[4], number: "-.5%" },
        { color: this.colorsList.redColors[0], number: "0%" },
        { color: this.colorsList.greenColors[4], number: ".5%" },
        { color: this.colorsList.greenColors[9], number: "1%" },
        { color: this.colorsList.greenColors[14], number: "1.5%" },
        { color: this.colorsList.greenColors[19], number: "2%" },
        { color: this.colorsList.greenColors[24], number: "2.5%" },
        { color: this.colorsList.greenColors[29], number: "3%" },
      ];
    },
  },
  mounted() {
    this.mapWidth = this.$refs.portfolioMap.offsetWidth;
    this.mapHeight = this.mapWidth * 0.8;
  },
};
</script>

<style scoped>
.main-box {
  position: absolute;
  border-style: solid;
  border-color: white;
  border-width: 1px;
  top: 0px;
  left: 0px;
}

.portfolio-wrapper {
  position: relative;
  /* border-style: solid;
  border-color: white; */
}

.legend-card {
  width: 7%;
  height: 30px;
  display: inline-block;
  margin-right: 1px;
  border: 1px solid black;
  text-align: center;
  padding-top: 3px;
}
</style>
