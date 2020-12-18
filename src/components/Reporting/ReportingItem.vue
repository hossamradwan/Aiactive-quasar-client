<template>
    <div :key="renderComponent" class="q-mt-lg">
        <q-list
          bordered
          v-for="lpr in reportingData"
          :key="lpr.id"
          class="q-ma-md card-style">
            <q-item class="card-style">
                <q-item-section avatar>
                    <q-icon name="speed" color="teal" size="34px" />
                </q-item-section>

                <q-item-section>
                    <q-item-label lines="1" class="text-weight-bold">
                        <span class="q-pa-lg">{{ lpr.id }}</span>
                        <span class="q-pa-lg">{{ lpr.plate_number }}</span>
                        <span class="q-pa-lg">{{ lpr.country }}</span>
                        <span class="q-pa-lg">{{ lpr.date_time }}</span>
                        <span class="q-pa-lg"> {{ lpr.speed /100 }} KM/h </span>
                    </q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-item-label lines="1" class="text-weight-bold text-teal">
                        <span class="q-pa-lg">Speed Violation</span>                      
                    </q-item-label>
                </q-item-section>

                <!-- Action Buttons -->
                <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                      <!-- Print Button -->
                        <q-btn
                          class=""
                          size="12px"
                          flat
                          dense
                          round
                          icon="print"
                          @click="printViolation(lpr.id)" />

                      <!-- Select Button -->
                        <q-btn
                          class=""
                          size="12px"
                          flat
                          dense
                          round
                          :color="selectedData_id.includes(lpr.id) ? 'teal' : ''"
                          icon="done"
                          @click="select(lpr.id)" />

                      <!-- Unconfirm Button -->
                        <q-btn
                          class=""
                          size="12px"
                          flat
                          dense
                          round
                          icon="undo" />
                    </div>
                </q-item-section>
            </q-item>
        </q-list>

        <PrintPortal
          v-model="printViolationDialog"
          @close="closePortal">

          <print-violation />

        </PrintPortal>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      //selected: [],
      //showPrintViolationDialog: false,
      renderComponent: 0,
      lprData: [
                  {
                    id: 249,
                    device_name: "10417",
                    plate_number: "‭١٤٩‬‭ص‌ر‌م‬",
                    country: "EGY",
                    date_time: "2019-07-30, 13:56:31",
                    speed: "1192"
                  }
                ]
    };
  },

  components: {
    'print-violation': require("components/Reporting/Modals/PrintViolation").default,
    'PrintPortal': require("components/Reporting/PrintPortal/WindowPortal").default
  },

  methods: {
    ...mapActions('reporting', ['setSelectedData', 'setViolationToPrint', 'setPrintViolationDialog']),

    closePortal() {
      // re render component to fix issue of remove q-list element
      /**
       * The horrible way: reloading the entire page
        The terrible way: using the v-if hack
        The better way: using Vue’s built-in forceUpdate method
        The best way: key-changing on your component
       */

      this.printViolationDialog = false;
      this.renderComponent += 1;

      // Clear All Selected Data
      this.setSelectedData({
        action: 'removeAll',
      });
    }, 

    select(reportId) {
      let action = this.selectedData_id.includes(reportId) ? 'remove' : 'add';

      this.setSelectedData({
        action,
        id: reportId
      });
    },

    printViolation(reportId) {
      //this.printViolationDialog = true;
      this.setViolationToPrint(reportId);
    }
  },
  computed: {
    ...mapState('reporting', ['reportingData', 'selectedData', 'showPrintViolationDialog', 'violationToPrint']),
    ...mapGetters('reporting', ['selectedData_id']),

    printViolationDialog: {
      get() {
        return this.showPrintViolationDialog;
      },
      set(value) {
        return this.setPrintViolationDialog(value);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card-style {
  background-color: #adadad2b !important;
}
</style>
