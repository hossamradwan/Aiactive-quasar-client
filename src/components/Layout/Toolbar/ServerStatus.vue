<template>
  <div @click="serverStatusModal = true" class="cursor-pointer">
    <!-- <span class="q-mr-md">
      Server &nbsp; : &nbsp; 
      <span :class="classColor ? 'bg-blue' : 'bg-red'">
        {{serverStatus}} 
      </span>
    </span> -->
    <q-btn flat :label="$t(serverStatus)" :color="iconColor">
      <div class="q-ml-md">
        <q-spinner-radio size="1.2rem" />
      </div>
    </q-btn>
    <!-- 
    <q-spinner-radio
      :color="iconColor" /> -->

    <!-- Server Status Modal -->
    <q-dialog v-model="serverStatusModal">
      <edit-server-info
        :serverIp="serverIp"
        :serverPortNumber="serverPortNumber"
        @close="serverStatusModal = false"
      />
    </q-dialog>
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import { mapActions, mapState } from "vuex";
import { clearInterval } from "timers";
import { log } from "util";

export default {
  data() {
    return {
      updateInterval: "",
      serverStatusModal: false,
      serverIp: LocalStorage.getItem("serverUrl") || "http://196.219.234.3",
      serverPortNumber: LocalStorage.getItem("serverPort") || "3000"
    };
  },
  methods: {
    ...mapActions("server", ["getServerStatus"])
  },
  mounted() {
    this.getServerStatus();
    this.updateInterval = setInterval(() => {
      this.getServerStatus();
    }, 15000);
  },
  beforeDestroy() {
    console.log("stop server updating");
    clearInterval(this.updateInterval);
  },
  computed: {
    ...mapState("server", ["serverStatus"]),
    classColor() {
      if (this.serverStatus == "online") return true;
      else return false;
    },
    iconColor() {
      if (this.serverStatus == "online") return "blue";
      else return "accent";
    }
  },
  components: {
    "edit-server-info": require("components/Layout/Toolbar/Modal/EditServerInfo.vue")
      .default
  }
};
</script>
