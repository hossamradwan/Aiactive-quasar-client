<template>
  <q-card-section class="lpr-info text-center">
    

    <!-- For Normal LPR -->
    <div v-if="lprType == 'lpr'" class="">

      <!-- device name -->
      <q-chip square size="sm" icon="bookmark">{{ cardData.device_name }}</q-chip>

      <!-- Speed -->
      <q-chip square size="sm" icon="speed" class="">
        <div class="coulmn">
          <div class="text-bold">
            {{ $t("Speed") }} <span> {{cardData.speed | speedFilter}} </span>
          </div>

          <!-- <q-separator class="q-mt-xs q-mb-xs" /> -->

          <!-- <div class="text-bold">
            {{ cardData.speed | speedFilter }}
          </div> -->
        </div>
      </q-chip>

      <!-- confidence number -->
      <q-chip square size="sm" icon="check" class="">
        <div class="coulmn">
          <div class="text-bold">
            {{ $t("Confidence") }} <span>{{ cardData.confidence_number | confidenceFilter }}</span>
          </div>

          <!-- <q-separator class="q-mt-xs q-mb-xs" />

          <div class="text-bold">
            {{ cardData.confidence_number | confidenceFilter }}
          </div> -->
        </div>
      </q-chip>
    </div>

    <!-- For Average Speed -->
    <div v-else class="q-pa-sm">
      <!-- Speed -->
      <q-chip square size="md" class="q-pt-lg q-pb-lg">
        <div class="coulmn">
          <div class="text-bold">
            {{ $t("AverageSpeed") }}
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
      <q-chip square size="sm">
        <div class="coulmn">
          <div class="text-bold">
            {{ cardData.date_time }}
          </div>
        </div>
      </q-chip>
      <!-- <q-badge square color="secondary" align="middle"></q-badge> -->
    </div>
  </q-card-section>
</template>

<script>
export default {
  props: ["lprData", "moduleName", "deviceNumber"],
  data() {
    return {
      lprModules: ["generic-lpr-module", "match-module", "toll-gates-module"],
      lprType: "lpr",
      cardData: {
        device_name: "",
        speed: null,
        confidence: null,
        date_time: ""
      }
    };
  },
  mounted() {
    if (this.lprModules.includes(this.moduleName)) {
      this.cardData.device_name = this.lprData.device_name;
      this.cardData.speed = this.lprData.speed;
      this.cardData.confidence_number = this.lprData.confidence_number;
      this.cardData.date_time = this.lprData.date_time;
    } else if (this.moduleName == "average-speed-module") {
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
        this.lprType = "average_speed";
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
.q-card__section--vert{
  padding-top: 8px;
}
</style>
