<template>
  <q-card>

    <modal-header>Server Info</modal-header>

    <q-card-section>

        <modal-server-ip
          :serverIpToSubmit.sync="serverIpToSubmit"
          ref="modalServerIp" />

        <modal-server-port
          :serverPortNumberToSubmit.sync="serverPortNumberToSubmit"
          ref="modalServerPortNumber" />

    </q-card-section>

    <modal-buttons @save='saveServerInfo' />

  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['serverIp', 'serverPortNumber'],
    data() {
        return {
          serverIpToSubmit: '',
          serverPortNumberToSubmit: ''
        }
    },
    methods: {
      ...mapActions('server', ['updateServerInfo']),
      saveServerInfo() {
        let payload = {
          serverIp: this.serverIpToSubmit,
          serverPortNumber: this.serverPortNumberToSubmit
        }
        this.updateServerInfo( payload )
      }
    },
    mounted() {
      this.serverIpToSubmit = this.serverIp
      this.serverPortNumberToSubmit = this.serverPortNumber
    },
    components: {
        'modal-header': require('components/Layout/Toolbar/Modal/Shared/ModalHeader.vue').default,
        'modal-server-ip': require('components/Layout/Toolbar/Modal/Shared/ModalServerIp.vue').default,
        'modal-server-port': require('components/Layout/Toolbar/Modal/Shared/ModalServerPort.vue').default,
        'modal-buttons': require('components/Layout/Toolbar/Modal/Shared/ModalButtons.vue').default
    }
}
</script>

<style scoped>
	.edit-server-modal {
		min-width: 400px;
	}
</style>

