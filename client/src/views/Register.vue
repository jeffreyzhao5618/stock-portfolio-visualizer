<template>
  <v-card class="log-card mt-5">
    <v-form ref="form" lazy-validation='true'>
      <v-text-field
        v-model="email"
        :rules="[rules.required, rules.emailRules]"
        label="E-mail"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.required]"
        label="Password"
        type="password"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="secondPassword"
        :rules="[rules.required, passwordConfirmationRule]"
        label="Confirm Password"
        type="password"
        required
      >
      </v-text-field>
      <v-btn class="mt-3" color="secondary" @click="logIn">
        Register
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
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
    };
  },
  methods: {
    logIn() {
      this.$refs.form.validate();
    },
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
