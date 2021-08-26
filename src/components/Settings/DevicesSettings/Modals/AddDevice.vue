<template>
  <q-card class="add-device-modal">
    <modal-header>Add Device</modal-header>

    <form @submit.prevent="submitForm">
      <div class="text-title text-center text-bold">Device Info..</div>
      <q-card-section class="row q-pb-none">
        <!-- Device Name -->
        <modal-device-name
          :deviceName.sync="deviceData.deviceName"
          ref="modalDeviceName"
        />

        <q-space />

        <!-- Device Type -->
        <modal-device-type :deviceType.sync="deviceData.deviceType" />
      </q-card-section>

      <q-card-section class="row q-pb-none">
        <!-- Device Zone -->
        <modal-device-zone :deviceZone.sync="devicesZones" />

        <q-space />

        <!-- Device Status -->
        <modal-device-status :deviceStatus.sync="deviceData.deviceStatus" />
      </q-card-section>

      <!-- Belongs To -->
      <q-card-section class="row q-pb-none" style="justify-content:center">
        <modal-device-belongTo :deviceBelongTo.sync="belongToModules" />
      </q-card-section>

      <div class="q-mt-lg text-title text-center text-bold">
        Device Connection Info..
      </div>

      <!-- Facial -->
      <q-card-section
        class="row q-pb-none"
        style="justify-content:center"
        v-if="belongsTo('VMS')"
      >
        <modal-device-url
          :streamUrl.sync="deviceData.streamUrl"
          ref="modalDeviceURL"
        />
      </q-card-section>

      <q-card-section class="row q-pb-none">
        <!-- Device Ip -->
        <modal-device-ip
          :deviceIp.sync="deviceData.deviceIp"
          ref="modalDeviceIp"
        />

        <q-space />

        <!-- Device Port -->
        <modal-device-port
          :devicePort.sync="deviceData.devicePort"
          ref="modalDevicePort"
        />
      </q-card-section>

      <q-card-section class="row q-pb-none">
        <!-- Device Username -->
        <modal-device-username
          :userName.sync="deviceData.userName"
          ref="modalUserName"
        />

        <q-space />

        <!-- Device Password -->
        <modal-device-password
          :userPassword.sync="deviceData.userPassword"
          ref="modalUserPassword"
        />
      </q-card-section>

      <div class="q-mt-lg text-title text-center text-bold">
        Device Location Info..
      </div>
      <q-card-section class="row q-pb-none">
        <!-- Device Location Name -->
        <modal-device-location-name
          :locationName.sync="deviceData.locationName"
          ref="modalDeviceLocationName"
        />

        <!-- Device Location Latitude -->
        <modal-device-location-latitude
          :locationLatitude.sync="deviceData.locationLatitude"
          ref="modalDeviceLocationLatitude"
        />

        <!-- Device Location Longtude -->
        <modal-device-location-longtude
          :locationLongtude.sync="deviceData.locationLongtude"
          ref="modalDeviceLocationLongtude"
        />
      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      deviceData: {
        deviceName: '',
        deviceType: '',
        deviceZone: '',
        deviceStatus: '',
        belongTo: '',
        deviceIp: '192.168.1.160',
        devicePort: 554,
        userName: '',
        userPassword: '',
        locationName: '',
        locationLatitude: '27.1974137',
        locationLongtude: '33.8381997',

        streamUrl: ''
      }
    };
  },
  watch: {},
  components: {
    'modal-header': require('components/Settings/DevicesSettings/Modals/Shared/ModalHeader')
      .default,
    'modal-device-name': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceName')
      .default,
    'modal-device-type': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceType')
      .default,
    'modal-device-zone': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceZone')
      .default,
    'modal-device-status': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceStatus')
      .default,
    'modal-device-belongTo': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceBelongTo')
      .default,
    'modal-device-ip': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceIp')
      .default,
    'modal-device-port': require('components/Settings/DevicesSettings/Modals/Shared/ModalDevicePort')
      .default,
    'modal-device-username': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceUserName')
      .default,
    'modal-device-password': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceUserPassword')
      .default,
    'modal-device-location-name': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceLocationName')
      .default,
    'modal-device-location-latitude': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceLocationLatitude')
      .default,
    'modal-device-location-longtude': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceLocationLongtude')
      .default,
    'modal-buttons': require('components/Settings/UsersSettings/Modals/Shared/ModalButtons')
      .default,
    'modal-device-url': require('components/Settings/DevicesSettings/Modals/Shared/ModalDeviceURL')
      .default
  },
  methods: {
    ...mapActions('devices', ['addDevice']),
    ...mapActions('shinobi', ['addMonitor']),

    // Show Section If Belongs to Module name
    belongsTo(moduleName) {
      let status = false;
      if (this.deviceData.belongTo.length > 0) {
        let belongs = JSON.parse(this.deviceData.belongTo);
        belongs.map(module => {
          if (module.label == moduleName) {
            status = true;
          } else {
            status = false;
          }
        });
      }
      return status;
    },
    submitForm() {
      let deviceNameValidation = this.$refs.modalDeviceName.$refs
        .modalDeviceName;
      deviceNameValidation.validate();

      let deviceIpValidation = this.$refs.modalDeviceIp.$refs.modalDeviceIp;
      deviceIpValidation.validate();

      if (!deviceNameValidation.hasError && !deviceIpValidation.hasError) {
        this.addDevice(this.deviceData).then(response => {
          let belongsToVms = this.belongsTo('VMS');
          if (belongsToVms) {
            this.addMonitor({
              id: response.data.id,
              name: response.data.name,
              host: this.deviceData.deviceIp,
              port: this.deviceData.devicePort,
              username: this.deviceData.userName,
              password: this.deviceData.userPassword
            });
          }
        });
      }
    }
  },
  mounted() {},
  computed: {
    ...mapGetters('devices', ['uniqueZones', 'getSystemModules']),
    belongToModules: {
      get() {
        return this.getSystemModules;
      },
      set(value) {
        //console.log('new value', value)
        this.deviceData.belongTo = value;
      }
    },
    devicesZones: {
      get() {
        return this.uniqueZones;
      },
      set(value) {
        this.deviceData.deviceZone = value;
      }
    }
  }
};
</script>
<style scoped>
.add-device-modal {
  min-width: 500px;
}
</style>
