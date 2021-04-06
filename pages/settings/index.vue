<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="clickHandle">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="user.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.username"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
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
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getCurrentUser, updateCenter } from "@/api/center";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "settings",
  middleware: "authenticated",
  async mounted() {
    const { data } = await getCurrentUser();
    this.user = data.user;
  },
  data() {
    return {
      user: {
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async clickHandle() {
      const { data } = await updateCenter({
        user: this.user,
      });
      this.setUser = data.user;
      Cookie.set("user", data.user);
      this.$router.push({
        name: "profile",
        params: {
          username: this.user.username,
        },
      });
    },
    ...mapMutations(["setUser"]),
    logout() {
      Cookie.remove("user");
      this.setUser(null);
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>