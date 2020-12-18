<template>
  <div class="add-road-modal">

    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step
        @keyup.enter="validateRoadName"
        :name="1"
        title="Road Name"
        icon="settings"
        :done="step > 1">

        <modal-road-name
          :roadName.sync="roadName"
          ref="modalRoadName" />

        <q-stepper-navigation>
          <q-btn
            @click="validateRoadName"
            color="primary"
            label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Traps Configuration"
        icon="create_new_folder"
        :done="step > 2"
      >
        <modal-traps-configuration
            :trapsConfiguration.sync= "trapsConfiguration"
			      ref="modalTrapsNumber" />

        <div v-show="trapsError" class="q-pa-md text-red">At least one Trap required for Road..</div>

        <q-stepper-navigation>
          <q-btn @click="validateTraps" color="primary" label="Continue" />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Point Devices Configuration" icon="add_comment">
        <modal-points-configuration
            :moduleDevices = "moduleDevices"
            :trapsConfiguration.sync = "trapsConfiguration" />

        <div v-show="pointsError" class="q-pa-md text-red" style="white-space: pre">{{errorMsg}}</div>

        <q-stepper-navigation>
          <q-btn
            @click="submitRoadConfiguration"
            color="primary"
            label="Finish" />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      moduleName: 'average-speed-module',
      step: 1,
      roadName: "",
      trapsConfiguration: [],
      trapsError: false,
      pointsError: false,
      errorMsg: ''
    };
  },
  components: {
    "modal-road-name": require("./Shared/ModalRoadName").default,
    'modal-traps-configuration': require('./Shared/ModalTrapsConfiguration').default,
    'modal-points-configuration': require('./Shared/ModalPointsConfiguration').default
  },
  methods: {
    ...mapActions('averageSpeed', ['addAverageSpeedSettings']),
    ...mapActions('devices', ['getDevices']),
    validateRoadName() {
      let isValid = false;

      let roadNameValidation = this.$refs.modalRoadName.$refs.modalRoadName;
          roadNameValidation.validate();

      if (!roadNameValidation.hasError) {
        this.step = 2;
        isValid = true;
      }

      return isValid;
    },
    validateTraps() {
      let isValid = false;

      if(this.trapsConfiguration.length > 0) {
          this.step = 3
          isValid = true;
      }
      else{
          this.trapsError = true;
          setTimeout(() => {
              this.trapsError = false;
          }, 2500);
      }       

      return isValid;
    },
    validatePoints() {
      let isValid = true;

      this.trapsConfiguration.forEach(trap => {
          if(!trap.point_one.length > 0) {
            // console.log('point one should not be empty');
            this.errorMsg += `Trap ${trap.trap_number} --  Point one should not be empty \n`
            isValid = false;
          }

          if(!trap.point_two.length > 0) {
            // console.log('point two should not be empty');
            this.errorMsg += `Trap ${trap.trap_number} -- Point two should not be empty \n`
            isValid = false;
          }
      });

      //console.log('validate points check', isValid);
      return isValid;
    },
    submitRoadConfiguration() {
      let validateRoad = this.roadName == '' ? false : true;
      let validateTraps = this.validateTraps();
      let validatePoints = this.validatePoints();
      if(validateRoad && validateTraps && validatePoints) {
        // console.log('submitting road', this.trapsConfiguration);
        // Adding road name to each trap before sending to api
        this.trapsConfiguration.forEach(trap => {
          trap.road_name = this.roadName;
        });
        this.addAverageSpeedSettings(this.trapsConfiguration)
      }
      else {
        this.pointsError = true;
        setTimeout(() => {
          this.pointsError = false,
          this.errorMsg = ''
        }, 2500);
      }
    }
  },
  mounted() {
    this.getDevices();
  },
  computed: {
    ...mapGetters('devices', ['getModuleDevices']),
     moduleDevices() {
      let moduleData = this.getModuleDevices(this.moduleName)
      return moduleData[0].devices.map(device => device.value)
    }
  }
};
</script>
<style scoped>
.add-road-modal {
  min-width: 500px;
}
</style>
