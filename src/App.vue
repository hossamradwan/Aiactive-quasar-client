<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions('auth', ['handleBootUserAuth'])
    },
    sockets: {
      connect: function () {
        console.log('Connected To Socket Server ..')
      }
    },
    mounted() {
      this.handleBootUserAuth()
    }
  }
</script>
