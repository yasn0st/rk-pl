<template>
  <v-app-bar
    app
    dense
    @click="scrollToTop()"
  >
    <v-toolbar-title>
      <router-link
        v-if="!hideSitename"
        class="site-name"
        :to="{ name: 'root' }"
        active-class="home"
      >
        {{ sitename }}
      </router-link>
    </v-toolbar-title>
    <router-link
      class="logo"
      :to="{ name: 'root' }"
      :style="logoBgStyle"
    >
      <div
        class="mask"
        :style="logoMaskStyle"
      />
      <img
        :src="logo"
        :style="logoStyle"
      >
    </router-link>
    <v-spacer />
    <div class="item right actions">
      <search-bar
        v-if="currentUser || !privateMode"
        @toggled="onSearchBarToggled"
        @click.stop.native
      />
      <button
        class="button-unstyled nav-icon"
        @click.stop="openSettingsModal"
      >
        <FAIcon
          fixed-width
          class="fa-scale-110 fa-old-padding"
          icon="cog"
          :title="$t('nav.preferences')"
        />
      </button>
      <a
        v-if="currentUser && currentUser.role === 'admin'"
        href="/pleroma/admin/#/login-pleroma"
        class="nav-icon"
        target="_blank"
      >
        <FAIcon
          fixed-width
          class="fa-scale-110 fa-old-padding"
          icon="tachometer-alt"
          :title="$t('nav.administration')"
        />
      </a>
      <button
        v-if="currentUser"
        class="button-unstyled nav-icon"
        @click.prevent="logout"
      >
        <FAIcon
          fixed-width
          class="fa-scale-110 fa-old-padding"
          icon="sign-out-alt"
          :title="$t('login.logout')"
        />
      </button>
    </div>
  </v-app-bar>
</template>
<script src="./desktop_nav.js"></script>

<style src="./desktop_nav.scss" lang="scss"></style>
