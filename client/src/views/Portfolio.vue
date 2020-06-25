<template>
  <v-container>
    <v-card class="mt-5 pa-5">
      <v-form>
        <v-text-field v-model="fund" label="Fund"> </v-text-field>
        <v-text-field v-model="ticker" label="Ticker"> </v-text-field>
        <v-text-field v-model="priceShare" label="Price Share"> </v-text-field>
        <v-text-field
          v-model="totalQuantity"
          label="Total Quantity"
        ></v-text-field>
        <v-text-field v-model="totalPrice" label="Total Price"> </v-text-field>
        <v-text-field v-model="account" label="Account"></v-text-field>
        <v-btn @click="addTransaction">Add Transaction</v-btn>
      </v-form>
    </v-card>

    <!-- <v-text-field v-model="fundName" label='Add Fund' placeholder="Fund Name" outlined></v-text-field>
    <v-btn @click="addFund">Add Fund</v-btn> -->
  </v-container>
</template>

<script>
import axios from "axios";
import { globalBus } from "../main";
import { rerouteMixin } from "./reroute";

export default {
  data() {
    return {
      fund: "",
      ticker: "",
      priceShare: "",
      totalQuantity: "",
      totalPrice: "",
      account: "",
    };
  },
  methods: {
    addTransaction() {
        const transactionObject = {
            fund: this.fund,
          ticker: this.ticker,
          priceShare: this.priceShare,
          totalQuantity: this.totalQuantity,
          totalPrice: this.totalPrice,
          account: this.account,
        }
        globalBus.portfolio.push(transactionObject);
      axios({
        method: "post",
        url: process.env.VUE_APP_URL_USER + "portfolio",
        data: {
          userID: globalBus.userID,
          transaction: transactionObject
        },
      }).then(() => {
        alert(`Transaction added to fund ${transactionObject.fund}`)
        //   if (res.data.success) {
        //     globalBus.loggedIn = true;
        //     globalBus.portfolio = res.data.portfolio;
        //   } else {
        //     this.$refs.form.reset();
        //     this.loginFailed = true;
        //   }
      });
    },
  },
  mixins: [rerouteMixin],
};
</script>

<style scoped>
.short {
  max-width: 200px;
}
</style>
