<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register"
              >Have an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(item, key) in errors">
              <li v-for="(ite, index) in item" :key="index">
                {{ key + " " + ite }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="submitHandle">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                v-if="!this.isLogin"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "../../api/user";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "login",
  middleware: "notAuthenticated",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "admin123@126.com",
        password: "12345678",
      },
      errors: {},
    };
  },
  methods: {
    async submitHandle() {
      try {
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
        this.$store.commit("setUser", data.user);
        Cookie.set("user", data.user);

        this.$router.push("/");
      } catch (error) {
        // console.dir(error.response.data.errors);
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>