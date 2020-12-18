<template>
  <q-layout view="hHh lpR fFf">
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
          label="Login" 
          class="absolute-right"/>

        <q-btn
          v-else
          @click="logoutUser"
          flat
          icon-right="account_circle"
          label="Logout" 
          class="absolute-right"/>

      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="220"
      bordered
      content-class="bg-primary"
    >
      <drawer-header-user
        :userData="userData"/>

      <div
        style="height: calc(100% - 150px); margin-top: 150px;">
        <q-list dark padding>  

          <q-item
            v-for="nav in navs"
            :key="nav.label"
            :to="nav.to"
            class="text-blue-grey-3"
            exact
            clickable>
            <q-item-section avatar>
              <q-icon :name="nav.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ nav.label }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="$q.platform.is.electron" 
            @click="quitApp"
            class="text-grey-4 absolute-bottom"
            clickable>
            <q-item-section avatar>
              <q-icon name="power_settings_new" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Quit</q-item-label>
            </q-item-section>
          </q-item>
          
        </q-list>
      </div>

        
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { openURL } from 'quasar'

  export default {
    name: 'MyLayout',
    data () {
      return {
        leftDrawerOpen: this.$q.platform.is.desktop,
        navs: [
          {
            label: 'Dashboard',
            icon: 'list',
            to: '/'
          },
          {
            label: 'Generic LPR',
            icon: 'time_to_leave',
            to: '/genericLprModule'
          },
          {
            label: 'AverageSpeed',
            icon: 'speed',
            to: '/averageSpeedModule'
          },
          {
            label: 'Reporting',
            icon: 'fingerprint',
            to: '/reportingModule'
          },
          {
            label: 'Settings',
            icon: 'settings',
            to: '/settings'
          }
        ]
      }
    },
    components: {
      'drawer-header-user': require('components/Layout/Drawer/HeaderUser.vue').default,
      'server-status': require('components/layout/Toolbar/ServerStatus.vue').default
    },
    computed: {
      ...mapState('auth', ['loggedIn', 'userData'])
    },
    methods: {
      ...mapActions('auth', ['logoutUser']),
      openURL,
      quitApp() {
        this.$q.dialog({
          title: 'Quit',
          message: 'Really quit?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          if(this.$q.platform.is.electron)
            require('electron').ipcRenderer.send('quit-app')
        })       
      }
    }
  }
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
