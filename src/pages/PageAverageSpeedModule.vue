<template>
  <q-page class="q-pa-md">
    <tool-bar :moduleName="moduleName" />

    <!-- <no-data v-if="!updateTransits || averageSpeedData.length==0 " />

    <loading v-if="!lprDataDownloaded && updateTransits" /> -->

    <q-scroll-area
      class="q-scroll-area-matching"
      :style="averageSpeedData.length > 0 ? 'background-color:#e5e5e5' : ''"
    >
      <average-speed-card
        v-if="averageSpeedData.length"
        :moduleName="moduleName"
        :lprData="averageSpeedData"
        class="matching-card  q-mt-md q-gutter-lg"
      />
      <empty-state v-else />
    </q-scroll-area>

    <pagination
      :paginationData="paginationData"
      @updateCurrentPage="setAverageSpeedPagination"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      moduleName: "average-speed-module"
    };
  },
  components: {
    "tool-bar": require("components/Shared/Lpr/Toolbar/Toolbar").default,
    "average-speed-card": require("components/Lpr/AverageSpeedCard").default,
    "no-data": require("components/Lpr/NoData").default,
    loading: require("components/Lpr/Loading").default,
    pagination: require("components/Lpr/Pagination").default,
    "empty-state": require("layouts/EmptyState.vue").default
  },

  watch: {
    autoUpdateTransits: function(newVal, oldVal) {
      if (newVal) {
        // send join message to the server
        this.$socket.emit("join", "average-speed-module");
        this.sendMetaData(true);
        this.listenToAverageSpeedHub();
      }
      if (!newVal) {
        // send Leave message to the server
        this.$socket.emit("leave", "average-speed-module");
        this.stopListenToAverageSpeedHub();
      }
    },

    paginationLimit: function(newVal, oldVal) {
      // check if auto-update turned on
      if (newVal && this.updateTransits) {
        this.sendMetaData();
      }
    },

    paginationPage: function(newVal, oldVal) {
      // check if auto-update turned on
      if (newVal && this.updateTransits) {
        this.sendMetaData();
      }
    },

    speedLimit: function(newVal, oldVal) {
      if (newVal && this.updateTransits) {
        console.log("speed limit changed", this.filters);
        this.sendMetaData();
      }
    },

    confirmed: function(newVal, oldVal) {
      if (newVal && this.updateTransits) {
        console.log("confirmed changed", this.filters);
        this.sendMetaData();
      }
    }
  },

  methods: {
    ...mapActions("devices", ["getDevices"]),
    ...mapActions("averageSpeed", ["getAverageSpeedSettings"]),
    ...mapActions("averageSpeedResult", [
      "getAverageSpeedResults",
      "getAverageSpeedDistinctDates",
      "setAverageSpeedPagination",
      "setUpdateAverageSpeedTransits",
      "updateAverageSpeedResults",
      "setDeviceFilter"
    ]),

    sendMetaData(autoUpdate) {
      let metaPagination = { ...this.pagination };

      if (autoUpdate) metaPagination.page = 1;

      this.$socket.emit("meta_update", {
        pagination: metaPagination,
        filters: {
          speedFilter: this.speedLimit,
          confirmedFilter: this.confirmed
        }
      });
    },

    listenToAverageSpeedHub() {
      console.log("listning to Average Speed Hub ");
      this.sockets.subscribe("average_speed_transits", data => {
        //console.log("listning to average_speed_transits channel:: ", data);
        this.updateAverageSpeedResults(data);
      });
    },

    stopListenToAverageSpeedHub() {
      console.log("Stop listning to Average Speed Hub");
      this.sockets.unsubscribe("average_speed_transits");
    }
  },
  mounted() {
    // get distinct data
    this.getAverageSpeedDistinctDates();
    // get devices list
    this.getAverageSpeedSettings();

    setTimeout(() => {
      //this.getAverageSpeedResults();
      this.setDeviceFilter(this.moduleActiveDevices);
    }, 1500);
  },
  destroyed() {
    this.$socket.emit("leave", "average-speed-module");
  },
  computed: {
    ...mapState("averageSpeedResult", [
      "pagination",
      "filters",
      "updateTransits",
      "lprDataDownloaded"
    ]),
    ...mapGetters("averageSpeedResult", [
      "paginationData",
      "sortedTransits",
      "updateAverageSpeedTransits"
    ]),
    ...mapGetters("devices", ["getAverageSpeedActiveTraps"]),

    autoUpdateTransits: {
      get() {
        return this.updateAverageSpeedTransits;
        //console.log('auto update')
      },
      set(value) {
        this.setUpdateAverageSpeedTransits(value);
      }
    },

    averageSpeedData() {
      return this.sortedTransits;
    },

    moduleActiveDevices() {
      return this.getAverageSpeedActiveTraps;
    },

    paginationLimit() {
      return this.pagination.limit;
    },

    paginationPage() {
      return this.pagination.page;
    },

    speedLimit() {
      if (this.filters.speed.isActive) return this.filters.speed.data;

      return "0";
    },

    confirmed() {
      if (this.filters.confirmed.isActive) return "true";

      return "false";
    }
  }
};
</script>

<style lang="scss">
.q-scroll-area-matching {
  height: 100vh; //full height --- 100vw full width
  display: flex;
  flex-grow: 1;
}

.electron {
  .q-scroll-area-matching {
    .scroll {
      height: auto !important;
    }
  }
}

.matching-card {
  //display: flex;
  //justify-content: space-between;
  //justify-content: space-around;
  justify-content: center;
  //justify-center
}
</style>
