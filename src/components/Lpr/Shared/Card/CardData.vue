<template>
  <q-card-section class="lpr-info text-center">
    <!-- device name -->
    <q-chip dense icon="bookmark">{{ cardData.device_name }}</q-chip>

    <!-- For Normal LPR -->
    <div v-if="lprType == 'lpr'" class="q-pa-sm">
      <!-- Speed -->
      <q-chip square size="md" class="q-pt-lg q-pb-lg">
        <div class="coulmn">
          <div class="text-bold">
            Speed
          </div>

          <q-separator class="q-mt-xs q-mb-xs" />

          <div class="text-bold">
            {{ cardData.speed | speedFilter }}
          </div>
        </div>
      </q-chip>

      <!-- confidence number -->
      <q-chip square size="md" class="q-pt-lg q-pb-lg">
        <div class="coulmn">
          <div class="text-bold">
            Confidence
          </div>

          <q-separator class="q-mt-xs q-mb-xs" />

          <div class="text-bold">
            {{ cardData.confidence_number | confidenceFilter }}
          </div>
        </div>
      </q-chip>
    </div>


    <!-- For Average Speed -->
    <div v-else class="q-pa-sm">
      <!-- Speed -->
      <q-chip square size="md" class="q-pt-lg q-pb-lg">
        <div class="coulmn">
          <div class="text-bold">
            Average Speed
          </div>

          <q-separator class="q-mt-xs q-mb-xs" />

          <div class="text-bold">
            {{ cardData.speed }}
          </div>
        </div>
      </q-chip>
    </div>   


    <!-- Date Time -->
    <div class="">
      <q-badge align="middle">{{ cardData.date_time }}</q-badge>
    </div>
  </q-card-section>
</template>

<script>
export default {
  props: ["lprData", "moduleName", "deviceNumber"],
  data() {
    return {
      lprType: 'lpr',
      cardData: {
        device_name: "",
        speed: null,
        confidence: null,
        date_time: ""
      }
    };
  },
  mounted() {
    if (
      this.moduleName == "generic-lpr-module" ||
      this.moduleName == "match-module"
    ) {
      this.cardData.device_name = this.lprData.device_name;
      this.cardData.speed = this.lprData.speed;
      this.cardData.confidence_number = this.lprData.confidence_number;
      this.cardData.date_time = this.lprData.date_time;
    } 

    else if (this.moduleName == "average-speed-module") {    
      if (this.deviceNumber == "device_one") {
        this.cardData.device_name = this.lprData.device_one_name;
        this.cardData.speed = this.lprData.device_one_speed;
        this.cardData.confidence_number = this.lprData.device_one_confidence_number;
        this.cardData.date_time = this.lprData.device_one_date_time;
      } else if (this.deviceNumber == "device_two") {
        this.cardData.device_name = this.lprData.device_two_name;
        this.cardData.speed = this.lprData.device_two_speed;
        this.cardData.confidence_number = this.lprData.device_two_confidence_number;
        this.cardData.date_time = this.lprData.device_two_date_time;
      } else if (this.deviceNumber == "device_average") {
        this.lprType = 'average_speed';
        this.cardData.device_name = this.lprData.road_name;
        this.cardData.speed = this.lprData.average_speed;
        //this.cardData.confidence = this.lprData.confidence;
        this.cardData.date_time = this.lprData.time_difference;
      }
    }
  },
  computed: {},
  filters: {
    speedFilter(value) {
      if (value == "") return "NA";
      return value / 100;
    },
    confidenceFilter(value) {
      if (value == "") return "NA";
      return value;
    }
  }
};
</script>

<style lang="scss" scoped>
.speed {
  width: fit-content;
}

.lpr-info {
  padding-bottom: 0px;
  .lpr-data {
    li {
      margin-bottom: 5px;
      margin-right: 10px;
      display: inline-block;
      font-weight: bold;
    }
    .date-time {
      font-size: 15px;
    }
  }
}
</style>
