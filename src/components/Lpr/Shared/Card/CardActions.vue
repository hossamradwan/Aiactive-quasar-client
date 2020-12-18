<template>
  <div class="">
    
    <q-card-actions class="no-wrap">
      <!-- Confirm Button -->
      <q-btn
        flat
        color="primary"
        :label="lprData.confirmed ? 'Unconfirm' : 'Confirm'"
        @click="confirmLprTransit" />

      <!-- Edit Button  -->
      <q-btn
        flat
        color="dark"
        label="Edit"
        v-if="showModuleName"
        @click="showEditPlateNumber" />

       <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      /> 
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          <div class="q-pa-sm">
            <q-chip square size="md">
              {{ lprData.brand }}
              <q-separator vertical class="q-ml-sm q-mr-sm" />
              {{ lprData.model }}
              <q-separator vertical class="q-ml-sm q-mr-sm" />
              {{ lprData.color }}
              <q-separator vertical class="q-ml-sm q-mr-sm" />
              {{ lprData.car_class }}
              
            </q-chip>
          </div>

          <div class="q-pa-sm">
            <q-chip square size="md">
              Confirmation Data - {{ lprData.confirmed }}
            </q-chip>
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>

    <div class="q-pa-md">
      <q-dialog v-model="showEditPlateNumberDialog">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6"> Edit Plate Number </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h7">
              Corrected Plate Number - 
              <span class=" text-bold text-green edit-plate">{{correctedPlateNumber}}</span> </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-select-all
              v-model="editPlateNumber"
              @keyup.enter="confirmEditPlateNumber" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Confirm" @click="confirmEditPlateNumber"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { SearchLpr } from "src/functions/class-lpr-search";
import { selectAll } from "src/directives/directive-select-all";
import { mapActions } from 'vuex';
export default {
  props: ["moduleName", "lprData"],
  data() {
    return {
      lprModules: [
        'generic-lpr-module',
        'match-module',
        'toll-gates-module'
      ],
      expanded: false,
      showEditPlateNumberDialog: false,
      editPlateNumber: '',
      correctedPlateNumber: ''
    };
  },
  watch: {
    'editPlateNumber': function(newVal, oldVal) {
      if(newVal) {
        this.handleEditPlateNumber();
      }
    }
  },
  methods: {
    ...mapActions('lpr', ['confirmLprPlate', 'editLprPlateNumber']),
    ...mapActions('averageSpeedResult', {
      confirmAverageSpeedLprPlate: 'confirmLprPlate'
    }),

    confirmLprTransit() {
      const payload = {
        id: this.lprData.id,
        confirmed: !this.lprData.confirmed
      }
      if(this.moduleName == 'average-speed-module')
        this.confirmAverageSpeedLprPlate(payload);

      if(this.lprModules.includes(this.moduleName))
        this.confirmLprPlate(payload);
    },
    showEditPlateNumber() {
      this.editPlateNumber = this.lprData.plate_number;
      this.showEditPlateNumberDialog = true;
    },
    confirmEditPlateNumber() {
      const payload = {
        id: this.lprData.id,
        plate_number: this.correctedPlateNumber
      }
      if(this.lprModules.includes(this.moduleName))
        this.editLprPlateNumber(payload);
      
      this.showEditPlateNumberDialog = false;
    },
    
    handleEditPlateNumber() {
      if (this.editPlateNumber.length == 0) return;

      let Search = new SearchLpr(this.editPlateNumber);

      this.correctedPlateNumber = Search.search();
    },
  },
  mounted() {
  },
  computed: {
    showModuleName() {
      if(this.lprModules.includes(this.moduleName))
        return true;

      return false;
    }
  },
  directives: {
    selectAll
  }
};
</script>

<style lang="scss" scoped>
.edit-plate {
  letter-spacing: 5px;
}
</style>
