<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
  	<q-banner
  	  class="q-mt-md bg-grey-4">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      <div class="text-gray">Auto Update is turned off!</div>
      <template v-slot:action>
        <q-btn
          @click="autoUpdateTransits=true"
        	flat
        	color="primary"
        	label="Turn On" />
      </template>
    </q-banner>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    methods: {
      ...mapActions('lpr', ['setUpdateTransits'])
    },
    computed: {
      autoUpdateTransits: {
        get() {
          console.log('auto update')
        },
        set(value) {
          this.setUpdateTransits(value)
        }
      }
    }
}
</script>