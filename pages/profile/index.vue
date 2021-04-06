<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="clickHandle"
            >
              <i class="ion-gear-a"></i>
              Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my',
                    },
                  }"
                  :class="{
                    active: tab === 'my',
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'fav',
                    },
                  }"
                  :class="{
                    active: tab === 'fav',
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'article',
                  params: {
                    slug: article.slug,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'article',
                    params: {
                      slug: article.slug,
                    },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                @click="clickFHandle(article)"
                :disabled="!article.favoriteDisabled"
                :class="{ active: article.favorited }"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getArticles, addFavorite, deleteFavorite } from "@/api/article";
import { getProfile } from "@/api/center";
export default {
  name: "profile",
  middleware: "authenticated",
  async asyncData({ query, params }) {
    const par = {};
    const name = params.username;

    const tab = query.tab || "my";
    if (tab === "fav") par.favorited = name;
    else par.author = name;

    const [profileRes, articleRes] = await Promise.all([
      getProfile({ username: params.username }),
      getArticles(par),
    ]);
    const { articles } = articleRes.data;
    const { profile } = profileRes.data;
    articles.forEach((item) => (item.favoriteDisabled = true));
    return {
      articles,
      tab,
      profile,
    };
  },
  methods: {
    clickHandle() {
      this.$router.push("/settings");
    },
    async clickFHandle(article) {
      article.favoriteDisabled = false;
      if (!article.favorited) {
        await addFavorite(article.slug);
        article.favoritesCount++;
        article.favorited = true;
      } else {
        await deleteFavorite(article.slug);
        article.favoritesCount--;
        article.favorited = false;
      }
      article.favoriteDisabled = true;
    },
  },
  watchQuery: ["tab"],
};
</script>

<style>
</style>