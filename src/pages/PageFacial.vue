<template>
  <q-page padding class="column">
    <!-- ToolBar  -->
    <tool-bar :moduleName="moduleName" />
    <q-card class="settings-tabs col" v-if="cameras.length">
      <facial-record />
    </q-card>
    <empty-state v-else />
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'PageFacial',

  data() {
    return {
      moduleName: 'facial-module'
    };
  },

  mounted() {
    this.getDevices();
  },
  computed: {
    ...mapState('facialCamera', ['cameras'])
  },
  methods: { ...mapActions('devices', ['getDevices']) },
  components: {
    'tool-bar': require('components/Shared/Lpr/Toolbar/Toolbar').default,
    'facial-record': require('components/Facial/FacialRecord').default,
    'empty-state': require('layouts/EmptyState.vue').default
  }
};
</script>
