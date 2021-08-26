<template>
  <q-page padding class="column">
    <!-- ToolBar  -->
    <tool-bar :moduleName="moduleName" />
    <q-card class="settings-tabs col">
      <vms-record />
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PageVms",
  data() {
    return {
      moduleName: "Vms-module"
    };
  },
  created() {
    this.getDevices();
    this.getMonitors();
  },

  computed: {
    ...mapState("shinobi", ["monitors"])
  },
  methods: {
    ...mapActions("devices", ["getDevices"]),
    ...mapActions("shinobi", ["getMonitors", "addMonitor"])
  },
  components: {
    "tool-bar": require("components/Shared/Lpr/Toolbar/Toolbar").default,
    "vms-record": require("components/Vms/VmsRecord").default
  }
};
</script>
