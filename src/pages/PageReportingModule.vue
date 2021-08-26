<template>
  <q-page class="q-pa-md">
    <!-- ToolBar  -->
    <tool-bar :moduleName="moduleName" />

    <reporting-item v-if="reportingData.length" />
    <empty-state v-else />
  </q-page>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      moduleName: 'reporting-module'
    };
  },
  components: {
        "tool-bar": require("components/Shared/Lpr/Toolbar/Toolbar").default,
        "reporting-item": require("components/Reporting/ReportingItem").default,
    'empty-state': require('layouts/EmptyState.vue').default
  },
  computed: {
    ...mapState('reporting', ['reportingData'])
  },
  methods: {
    ...mapActions('reporting', ['getReportingData', 'getDistinctDates'])
  },
  mounted() {
    // module first get data from active module component tool bar
    // Get distinct dates on mounted
    setTimeout(() => {
      this.getReportingData();
      this.getDistinctDates();
    }, 1500);
  }
}
</script>
