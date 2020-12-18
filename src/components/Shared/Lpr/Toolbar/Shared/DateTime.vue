<template>
  <div class="q-pa-sm" style="max-width: 300px">
    <q-input
      outlined
      dense
      v-model="date"
      :bg-color="error ? 'negative' : ''">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date
              v-model="date"
              :events="eventsDates"
              event-color="teal"
              mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { date } from 'quasar';
import { mapActions, mapState } from 'vuex';

export default {
  props: ['moduleName'],
  data () {
    return {
      dateTimeFormat: 'YYYY-MM-DD HH:mm',
      date: '2019-02-01 12:44',
      events: [ '2019/07/01' ],
      error: false
    }
  },
  watch: {
    'date': function(newVal, oldVal) {
      this.validateDateTime(newVal);
    }
  },
  methods: {
    ...mapActions('lpr', ['setActiveDateTime']),
    ...mapActions('averageSpeedResult', {
      setAverageSpeedActiveDateTime: 'setActiveDateTime'
    }),
    ...mapActions('reporting', {
      setReportingDateTime: 'setActiveDateTime'
    }),

    validateDateTime(value) {
      // MM/dd/yyyy hh:mm
      //const dateTimeRegex = /^(([0]?[1-9]|1[0-2])\/([0-2]?[0-9]|3[0-1])\/[1-2]\d{3}) (20|21|22|23|[0-1]?\d{1}):([0-5]?\d{1})$/;

      // yyyy-MM-dd hh:mm
      const dateTimeRegex = /^([1-2]\d{3}-([0]?[1-9]|1[0-2])-([0-2]?[0-9]|3[0-1])) (20|21|22|23|[0-1]?\d{1}):([0-5]?\d{1})$/g;

      const isValid = dateTimeRegex.test(value);

      if(!isValid) {
        this.error = true;
        return
      }
      let startDate = value;
      let endDate = date.addToDate(value, { days: 1, month: 0 });
          endDate = date.formatDate(endDate, this.dateTimeFormat);

      let data = {
        startDate,
        endDate
      };

      this.error = false;

      if(this.moduleName == 'average-speed-module')
        this.setAverageSpeedActiveDateTime(data);

      else if(this.moduleName == 'generic-lpr-module')
        this.setActiveDateTime(data);

      else if(this.moduleName == 'reporting-module')
        this.setReportingDateTime(data);
    }
  },
  mounted() {
    let timeStamp = Date.now();
    let formattedString = date.formatDate(timeStamp, this.dateTimeFormat);

    this.date = formattedString;
  },
  computed: {
    ...mapState('lpr', ['distinctDates']),
    ...mapState('averageSpeedResult', {
      distinctAverageSpeedDates: 'distinctDates'
    }),
    ...mapState('reporting', {
      distinctReportingDates: 'distinctDates'
    }),

    eventsDates() {
      if(this.moduleName == 'average-speed-module')
        return this.distinctAverageSpeedDates;

      else if(this.moduleName == 'generic-lpr-module')
        return this.distinctDates

      else if(this.moduleName == 'reporting-module')
        return this.distinctReportingDates
    }
  }
}
</script>