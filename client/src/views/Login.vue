<template>
  <v-card class="log-card mt-5">
    <v-form ref="form">
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" @input="clearErrors">
      </v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
        @input="clearErrors"
      >
      </v-text-field>
      <p v-if="loginFailed" class="small red--text">
        Email or password is incorrect
      </p>
      <v-btn class="mb-5 mt-3" color="secondary" @click="logIn" >
        Log In
      </v-btn>
    </v-form>
    <router-link class="small" :to="{ name: 'Register' }"
      >Don't have an account? Sign up here</router-link
    >
  </v-card>
</template>

<script>
import { globalBus } from "../main";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      loginFailed: false,
    };
  },
  methods: {
    logIn() {
      if (this.$refs.form.validate()) {
        axios({
          method: "post",
          url: process.env.VUE_APP_URL_USER + "login",
          data: {
            email: this.email,
            password: this.password,
          },
        }).then((res) => {
          console.log(res);
          if (res.data.success) {
            globalBus.loggedIn = true;
            globalBus.portfolio = res.data.portfolio;
            globalBus.userID = res.data.user;
            this.$router.push({ name: "Home" });
          } else {
            this.$refs.form.reset();
            this.loginFailed = true;
          }
        });
      }
    },
    clearErrors() {
      if(this.loginFailed) {
        this.loginFailed = false;
      }
    }
  },
};
</script>

<style>
.log-card {
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px 30px;
}

.small {
  font-size: 0.8em;
  text-decoration: none;
}
</style>
