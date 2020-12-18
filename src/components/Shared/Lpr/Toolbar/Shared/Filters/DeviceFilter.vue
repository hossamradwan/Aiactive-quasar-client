<template>
  <div class="column items-center filter">
    <div class="text-h6 text-center q-mb-md">Devices</div>

    <q-tree
      :nodes="devicesTree"
      node-key="label"
      tick-strategy="leaf"
      :ticked.sync="ticked"
      default-expand-all
      no-connectors
    />

  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  props: ['moduleName'],
  data() {
    return {
      simple: [
        {
          label: 'Devices Zone',
          //avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          icon: 'gps_fixed',
          children: [
            {
              label: 'Device_one',
              icon: 'videocam'
            },
            {
              label: 'Device_two',
              icon: 'videocam',
              disabled: false
            }
          ]
        }
      ],
      ticked: []
    };
  },
  components: {
  },
  watch: {
    'ticked': function(newVal, oldVal) {
      if(newVal) {
        if(this.moduleName == 'average-speed-module'){
          this.setAverageSpeedDeviceFilter(newVal);
          return
        }

        this.setDeviceFilter(newVal);
      }
    }
  },
  methods: {
    ...mapActions('lpr', ['setDeviceFilter']),
    ...mapActions('averageSpeedResult', {
        setAverageSpeedDeviceFilter: 'setDeviceFilter'
    })
  },
  mounted() {
    setTimeout(() => {
      if(this.moduleName == 'average-speed-module') {
        this.ticked = Array.from(this.activeTraps);
        return;
      }

      this.ticked = Array.from(this.activeDevices);
    }, 200);
  },
  computed: {
    ...mapState('lpr', ['activeDevices']),
    ...mapState('averageSpeedResult', ['activeTraps']),
    ...mapGetters('devices', ['getDevicesTree', 'getAverageSpeedDevicesTree']),

    devicesTree() {
      if(this.moduleName == 'average-speed-module')
        return this.getAverageSpeedDevicesTree;

      return this.getDevicesTree(this.moduleName);
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  justify-content: center;
  //width: 230 px;
}

</style>
