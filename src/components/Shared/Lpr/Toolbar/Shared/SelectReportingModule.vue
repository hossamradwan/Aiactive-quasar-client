<template>
  <div class="q-pa-sm" style="max-width: 300px">
      <q-select
        outlined
        dense   
        v-model="model"
        :options="options"
        class="col" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';


export default {
  props: ['moduleName'],
  data () {
    return {
     //model: null,
      // options: [
      //   {
      //     label: 'Generic Lpr Module',
      //     value: 'generic-lpr-module' 
      //   },
      //   {
      //     label: 'Average Speed Module',
      //     value: 'average-speed-module'
      //   }
      // ]
    }
  },
  methods: {
    ...mapActions('reporting', ['setActiveModule']),

  },
  mounted() {
    this.model = this.options[0];
  },
  computed: {
    ...mapState('devices', ['systemModules']),
    ...mapState('reporting', ['activeModule']),

    options() {
      return this.systemModules;
    },
    model: {
      get() {
        return this.activeModule.label
      },
      set(value) {
        this.setActiveModule(value)
      }
    }
  }
}
</script>