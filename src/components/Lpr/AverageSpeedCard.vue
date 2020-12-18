<template>
  <transition-group
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    class="row"
  >
    <q-card
      v-for="lpr in lprData"
      :key="lpr.id"
      class="lpr-card q-mt-md q-mb-md"
    >
      <card-plateNumber :lprPlateNumber="lpr.plate_number" />

      <!-- First Device -->
      <div class="row lprImages">
        <card-image
          :lprImages="lpr"
          :moduleName="moduleName"
          :deviceNumber="'device_one'"
        />

        <!-- vertical separator -->
        <q-separator vertical inset class="q-mx-xs" />

        <!-- Second Device -->
        <card-image
          :lprImages="lpr"
          :moduleName="moduleName"
          :deviceNumber="'device_two'"
        />
      </div>

      <div class="row lpr-data">
        <card-data
          :moduleName="moduleName"
          :deviceNumber="'device_one'"
          :lprData="lpr" />
        <card-data
          :moduleName="moduleName"
          :deviceNumber="'device_average'"
          :lprData="lpr" />
        <card-data
          :moduleName="moduleName"
          :deviceNumber="'device_two'"
          :lprData="lpr" />
      </div>

      <card-actions
        :moduleName="moduleName"
        :lprData="lpr" />
    </q-card>
  </transition-group>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["lprData", "moduleName"],
  data() {
    return {};
  },
  components: {
    "card-plateNumber": require("./Shared/Card/CardPlateNumber").default,
    "card-image": require("./Shared/Card/CardImages").default,
    "card-data": require("./Shared/Card/CardData").default,
    "card-actions": require("./Shared/Card/CardActions").default
  },
  methods: {
  },
  mounted() {},
  computed: {}
};
</script>
<style lang="scss">
.lpr-card {
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //margin: 3px;
  // width: 100%;
  //border: 3px solid white;
  // min-width: 25%;
  // max-width: 50%;
}
.lpr-data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  //align-items: center;
}

.lprImages {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
