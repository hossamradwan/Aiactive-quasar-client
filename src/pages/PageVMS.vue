<template>
  <q-page padding class="column">
    <!-- ToolBar  -->
    <tool-bar :moduleName="moduleName" />
    <q-card class="settings-tabs col" v-if="cameras.length">
      <VMS-record />
    </q-card>
    <empty-state v-else />
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'PageVMS',

  data() {
    return {
      moduleName: 'VMS-module'
    };
  },

  mounted() {
    this.getDevices();
  },
  computed: {
    ...mapState('VMS', ['cameras'])
  },
  methods: { ...mapActions('devices', ['getDevices']) },
  components: {
    'tool-bar': require('components/Shared/Lpr/Toolbar/Toolbar').default,
    'VMS-record': require('components/facial/VMSRecord').default,
    'empty-state': require('layouts/EmptyState.vue').default
  }
};
</script>
