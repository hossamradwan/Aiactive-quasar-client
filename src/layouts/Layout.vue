<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar>
        <server-status />

        <q-toolbar-title class="absolute-center">
          AIACTIVE &nbsp; Technologies
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          icon-right="account_circle"
          :label="$t('Login')"
          class="absolute-right"
        />

        <q-btn
          v-else
          @click="logoutUser"
          flat
          icon-right="account_circle"
          :label="$t('Logout')"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="$t(nav.label)"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="220"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      content-class="bg-primary"
    >
      <drawer-header-user
        :userData="userData"
        :miniState="miniState"
        v-show="!miniState"
      />
      <div style="height: calc(100% - 150px); margin-top: 150px;">
        <q-scroll-area
          :visible="false"
          :bar-style="barStyle"
          style="height: 100%; "
        >
          <q-list dark padding>
            <q-item
              v-for="nav in navs"
              :key="nav.label"
              :to="nav.to"
              class="text-blue-grey-3"
              exact
              clickable
            >
              <q-item-section avatar>
                <q-icon :name="nav.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ $t(nav.label) }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-if="$q.platform.is.electron"
              @click="quitApp"
              class="text-grey-4 absolute-bottom"
              clickable
            >
              <q-item-section avatar>
                <q-icon name="power_settings_new" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Quit</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { openURL } from 'quasar';
import { colors } from 'quasar';
import navigations from '../router/navs';

export default {
  name: 'MyLayout',
  data() {
    return {
      miniState: true,
      lang: localStorage.getItem('Language'),
      leftDrawerOpen: this.$q.platform.is.desktop,
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      }
    };
  },
  components: {
    'drawer-header-user': require('components/Layout/Drawer/HeaderUser.vue')
      .default,
    'server-status': require('components/layout/Toolbar/ServerStatus.vue')
      .default
  },
  computed: {
    ...mapState('auth', ['navs', 'loggedIn', 'userData'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser', 'setNavs']),
    openURL,
    quitApp() {
      this.$q
        .dialog({
          title: 'Quit',
          message: 'Really quit?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          if (this.$q.platform.is.electron)
            require('electron').ipcRenderer.send('quit-app');
        });
    }
  },
  created() {
    // this.setNavs(navigations);
  },
  mounted() {
    //Get Stored Theme
    let ThemeColor = localStorage.getItem('ThemeColor');
    const { setBrand } = colors;
    if (ThemeColor != null) {
      setBrand('primary', ThemeColor);
    }

    //Change quasar language and RTL direction
    let Language = localStorage.getItem('Language');
    if (Language != null && Language != 'undefined') {
      this.$i18n.locale = Language;
      import(`quasar/lang/${Language}`).then(language => {
        this.$q.lang.set(language.default);
      });
    }
  }
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
    background: #009688;
  }
}
</style>
