<template>
  <q-page padding class="column">
    <!-- ToolBar  -->
    <tool-bar :moduleName="moduleName" />
    <q-card class="settings-tabs col" v-if="cameras.length">
      <!-- TABS -->
      <!-- <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="report" icon="fas fa-users-cog" :label="$t('Report')" />

        <q-tab name="record" icon="device_hub" :label="$t('Record')" />
      </q-tabs>

      <q-separator /> -->

      <q-tab-panels v-model="tab" animated>
        <!-- Report Tab Container -->
        <q-tab-panel name="report">
          <facial-report />
        </q-tab-panel>

        <!-- Record Tab Container -->
        <q-tab-panel name="record" class="column">
          <facial-record class="col" style="border-color:red " />
        </q-tab-panel>
      </q-tab-panels>
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
      moduleName: 'facial-module',
      tab: 'record'
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
    'facial-report': require('components/Facial/FacialReport').default,
    'facial-record': require('components/Facial/FacialRecord').default,
    'empty-state': require('layouts/EmptyState.vue').default
  }
};
</script>
