<template>
  <div class="column items-center filter">
    <div class="text-h6 text-center q-mb-md">{{ $t("Devices") }}</div>

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
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  props: ["moduleName"],
  data() {
    return {
      simple: [
        {
          label: "Devices Zone",
          //avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          icon: "gps_fixed",
          children: [
            {
              label: "Device_one",
              icon: "videocam"
            },
            {
              label: "Device_two",
              icon: "videocam",
              disabled: false
            }
          ]
        }
      ],
      ticked: []
    };
  },

  methods: {
    ...mapActions("lpr", ["setDeviceFilter"]),
    ...mapActions("averageSpeedResult", {
      setAverageSpeedDeviceFilter: "setDeviceFilter"
    }),
    ...mapActions("facial", ["addDevice", "removeDevice"]),
    ...mapActions("shinobi", ["getMonitors", "watchMonitor", "unwatchMonitor"])
  },

  computed: {
    ...mapState("lpr", { lprActiveDevices: "activeDevices" }),
    ...mapState("facial", { cameras: "cameras" }),
    ...mapState("shinobi", ["monitors", "watchMonitors"]),
    ...mapState("devices", ["devicesList"]),
    ...mapState("averageSpeedResult", ["activeTraps"]),
    ...mapGetters("devices", ["getDevicesTree", "getAverageSpeedDevicesTree"]),
    ...mapGetters("facial", { activeFacialDevices: "activeDevices" }),

    devicesTree() {
      if (this.moduleName == "average-speed-module")
        return this.getAverageSpeedDevicesTree;

      // Todo : remove the condition
      if (this.moduleName == "facial-module" || this.moduleName == "Vms-module")
        return this.getDevicesTree("VMS-module");
      return this.getDevicesTree(this.moduleName);
    }
  },

  mounted() {
    setTimeout(() => {
      if (this.moduleName == "average-speed-module") {
        this.ticked = Array.from(this.activeTraps);
        return;
      }

      if (this.moduleName == "facial-module") {
        // Get Previously Ticked devices
        this.ticked = Array.from(this.activeFacialDevices);
        return;
      } else if (this.moduleName == "Vms-module") {
        // Get Previously Ticked devices
        this.ticked = Array.from(this.activeFacialDevices);
        return;
      }

      this.ticked = Array.from(this.lprActiveDevices);
    }, 200);
  },

  watch: {
    ticked: function(newVal, oldVal) {
      if (newVal) {
        if (this.moduleName == "average-speed-module") {
          this.setAverageSpeedDeviceFilter(newVal);
          return;
        }
        this.setDeviceFilter(newVal);

        if (
          this.moduleName == "facial-module" ||
          this.moduleName == "Vms-module"
        ) {
          // Function To Get Difference Between Two Arrays
          function arr_diff(a1, a2) {
            var a = [],
              diff = [];

            for (var i = 0; i < a1.length; i++) {
              a[a1[i]] = true;
            }

            for (var i = 0; i < a2.length; i++) {
              if (a[a2[i]]) {
                delete a[a2[i]];
              } else {
                a[a2[i]] = true;
              }
            }

            for (var k in a) {
              diff.push(k);
            }

            return diff;
          }
          let changed = arr_diff(newVal, oldVal);

          //  IF Checked or Unchecked
          changed.map(difference => {
            let inNewVal = newVal.indexOf(difference);
            let deviceIndex = this.devicesList.findIndex(function(device) {
              return device.deviceName === difference;
            });
            let facialDeviceIndex = this.cameras.findIndex(function(device) {
              return device.deviceName === difference;
            });

            let deviceUrl = this.devicesList[deviceIndex].device_streamUrl;
            let deviceId = this.devicesList[deviceIndex].id;

            // If Checked
            if (inNewVal != -1) {
              if (facialDeviceIndex == -1) {
                this.addDevice({
                  height: 320,
                  width: 480,
                  url: deviceUrl,
                  deviceName: difference,
                  deviceId
                });
                this.watchMonitor(deviceId);
              }
            }

            // If Unchecked
            let inOldVal = oldVal.indexOf(difference);
            if (inOldVal != -1) {
              let index = this.cameras.findIndex(x => x.url === deviceUrl);
              let cameraId = this.cameras[index].cameraId;
              this.unwatchMonitor(deviceId);
              this.removeDevice(cameraId);
            }
          });

          return;
        }
      }
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
