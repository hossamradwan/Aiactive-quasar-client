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
  components: {},
  watch: {
    ticked: function(newVal, oldVal) {
      if (newVal) {
        if (this.moduleName == "average-speed-module") {
          this.setAverageSpeedDeviceFilter(newVal);
          return;
        }
        this.setDeviceFilter(newVal);

        if (this.moduleName == "facial-module") {
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

            // If Checked
            if (inNewVal != -1) {
              console.log("Add", difference);
              console.log("facialDeviceIndex:", facialDeviceIndex);
              if (facialDeviceIndex == -1)
                this.addDevice({
                  height: 320,
                  width: 480,
                  url: deviceUrl,
                  deviceName: difference
                });
            }
            // If Unchecked
            let inOldVal = oldVal.indexOf(difference);
            if (inOldVal != -1) {
              console.log("Delete", difference);
              let index = this.cameras.findIndex(x => x.url === deviceUrl);
              let cameraId = this.cameras[index].cameraId;
              this.removeDevice(cameraId);
            }
          });

          return;
        }
      }
    }
  },
  methods: {
    ...mapActions("lpr", ["setDeviceFilter"]),
    ...mapActions("averageSpeedResult", {
      setAverageSpeedDeviceFilter: "setDeviceFilter"
    }),
    ...mapActions("facialCamera", ["addDevice", "removeDevice"])
  },
  mounted() {
    setTimeout(() => {
      if (this.moduleName == "average-speed-module") {
        this.ticked = Array.from(this.activeTraps);
        return;
      }

      if (this.moduleName == "facial-module") {
        this.ticked = Array.from(this.activeVMS);
        // console.log(this.ticked);
        return;
      }

      this.ticked = Array.from(this.activeDevices);
    }, 200);
  },
  computed: {
    ...mapState("lpr", ["activeDevices"]),
    ...mapState("facialCamera", {
      cameras: "cameras"
    }),
    ...mapState("devices", ["devicesList"]),
    ...mapState("averageSpeedResult", ["activeTraps"]),
    ...mapGetters("devices", ["getDevicesTree", "getAverageSpeedDevicesTree"]),
    ...mapGetters("facialCamera", { activeVMS: "activeDevices" }),
    devicesTree() {
      if (this.moduleName == "average-speed-module")
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
