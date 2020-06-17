<template>
  <v-card class="log-card mt-5">
    <v-form ref="form">
      <v-text-field
        v-model="email"
        :rules="[rules.required, rules.emailRules]"
        label="E-mail"
        @input="clearErrors"
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.required]"
        label="Password"
        type="password"
        @input="clearErrors"
      >
      </v-text-field>
      <v-text-field
        v-model="secondPassword"
        :rules="[rules.required]"
        label="Confirm Password"
        type="password"
        @input="clearErrors"
      >
      </v-text-field>
      <p v-if="registerFailed" class="small red--text">
        {{errorMssg}}
      </p>
      <v-btn class="mt-3" color="secondary" @click="register">
        Register
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: "",
      password: "",
      secondPassword: "",
      //   secondPasswordRules: [
      //       v => !!v || 'Password is required',
      //       v => v == this.password || 'Passwords do not match'],
      rules: {
        required: (v) => !!v || "Entry is required",
        emailRules: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
      registerFailed: false,
      errorMssg: ''
    };
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        if(this.password == this.secondPassword) {
          axios({
            method: "post",
            url: process.env.VUE_APP_URL + "register",
            data: {
              email: this.email,
              password: this.password,
            },
          }).then((res) => {
            console.log(res);
            if (res.data.success) {
              this.$router.push({ name: "Login" });
            } else {
              this.$refs.form.reset();
              this.registerFailed = true;
              this.errorMssg = 'There is already an account registered under this email';
            }
          });
        } else {
          this.$refs.form.reset();
          this.registerFailed = true;
          this.errorMssg = 'Passwords do not match';
        }

      }
    },
    clearErrors() {
      if(this.registerFailed) {
        this.registerFailed = false;
      }
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.secondPassword || "Passwords must match";
    },
    
  },
};
</script>

<style scoped>
/* .log-card {
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px 20px;
} */
/* 
.small {
  font-size: 0.8em;
  text-decoration: none;
} */
</style>
