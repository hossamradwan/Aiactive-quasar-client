<template>
  <q-page padding class="column">
    <!-- ToolBar  -->
    <tool-bar :moduleName="moduleName" />
    <q-card class="settings-tabs col">
      <VMS-record />
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PageFacial",

  data() {
    return {
      moduleName: "VMS-module"
    };
  },

  mounted() {
    this.getDevices();
    this.getMonitors();
  },
  computed: {
    ...mapState("facial", ["cameras"])
  },
  methods: {
    ...mapActions("devices", ["getDevices"]),
    ...mapActions("shinobi", ["getMonitors", "addMonitor"])
  },
  components: {
    "tool-bar": require("components/Shared/Lpr/Toolbar/Toolbar").default,
    "VMS-record": require("components/facial/VMSRecord").default,
    "empty-state": require("layouts/EmptyState.vue").default
  }
};
</script>
