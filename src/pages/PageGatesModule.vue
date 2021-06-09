<template>
  <q-page class="q-pa-md">
    <tool-bar :moduleName="moduleName" />

    <q-scroll-area
      class="q-scroll-area-matching"
      :style="lprData.length > 0 ? 'background-color:#e5e5e5' : ''"
    >
      <lpr-table v-if="lprData.length" />
      <empty-state v-else />
    </q-scroll-area>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      moduleName: 'gates-module'
    };
  },
  components: {
    'tool-bar': require('components/Shared/Lpr/Toolbar/Toolbar').default,
    'lpr-table': require('components/TollGates/Shared/LprTable').default,
    'no-data': require('components/Lpr/NoData').default,
    loading: require('components/Lpr/Loading').default,
    pagination: require('components/Lpr/Pagination').default,
    'empty-state': require('layouts/EmptyState.vue').default
  },
  watch: {
    autoUpdateTransits: function(newVal, oldVal) {
      if (newVal) {
        // send join message to the server
        this.$socket.emit('join', 'generic-lpr-module');
        this.sendMetaData(true);
        this.listenToLprHub();
      }
      if (!newVal) {
        // send Leave message to the server
        this.$socket.emit('leave', 'generic-lpr-module');
        this.stopListenToLprHub();
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

    confidenceLimit: function(newVal, oldVal) {
      if (newVal && this.updateTransits) {
        console.log('confidence limit changed', this.filters);
        this.sendMetaData();
      }
    },

    speedLimit: function(newVal, oldVal) {
      console.log('speed limit changed', newVal, oldVal);
      if (newVal && this.updateTransits) {
        console.log('speed limit changed', newVal);
        this.sendMetaData();
      }
    },

    confirmed: function(newVal, oldVal) {
      if (newVal && this.updateTransits) {
        console.log('confirmed filter changed', this.filters);
        this.sendMetaData();
      }
    }
  },
  methods: {
    ...mapActions('devices', ['getDevices']),
    ...mapActions('lpr', [
      'getLprData',
      'setModuleName',
      'setPagination',
      'updateLprData',
      'setDeviceFilter',
      'getDistinctDates'
    ]),

    sendMetaData(autoUpdate) {
      let metaPagination = { ...this.pagination };

      if (autoUpdate) metaPagination.page = 1;

      this.$socket.emit('meta_update', {
        pagination: metaPagination,
        filters: {
          confidenceFilter: parseInt(this.confidenceLimit),
          speedFilter: parseInt(this.speedLimit),
          confirmedFilter: this.confirmed
        }
      });
    },

    listenToLprHub() {
      this.sockets.subscribe('lpr_transits', data => {
        //console.log("listning to lpr_transits channel..");
        this.updateLprData(data);
      });
    },

    stopListenToLprHub() {
      this.sockets.unsubscribe('lpr_transits');
      console.log('Stop listning to lpr_transits channel');
    }
  },
  mounted() {
    // Set Module Name
    this.setModuleName(this.moduleName);

    // get distinct data
    this.getDistinctDates();

    // get devices list
    this.getDevices();

    setTimeout(() => {
      //this.getLprData();
      this.setDeviceFilter(this.moduleActiveDevices);
    }, 1500);
  },
  destroyed() {
    // Clear Module Name
    this.setModuleName(' ');

    this.$socket.emit('leave', 'generic-lpr-module');
  },
  computed: {
    ...mapState('lpr', [
      'pagination',
      'filters',
      'updateTransits',
      'lprDataDownloaded'
    ]),
    ...mapGetters('lpr', ['sortedTransits', 'paginationData']),
    ...mapGetters('devices', ['getModuleActiveDevices']),

    autoUpdateTransits: {
      get() {
        return this.updateTransits;
        //console.log('auto update')
      },
      set(value) {
        this.setUpdateTransits(value);
      }
    },

    lprData() {
      return this.sortedTransits;
    },

    moduleActiveDevices() {
      return this.getModuleActiveDevices(this.moduleName);
    },

    paginationLimit() {
      return this.pagination.limit;
    },

    paginationPage() {
      return this.pagination.page;
    },

    confidenceLimit() {
      if (this.filters.confidence_number.isActive)
        return this.filters.confidence_number.data;

      return '0';
    },

    speedLimit() {
      if (this.filters.speed.isActive) return this.filters.speed.data;

      return '0';
    },

    confirmed() {
      if (this.filters.confirmed.isActive) return 'true';

      return 'false';
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
