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

      <card-image 
        :lprImages = "lpr" 
        :moduleName = "moduleName" />

      <card-data
        :lprData="lpr"
        :moduleName="moduleName" />

      <card-actions
        :moduleName="moduleName"
        :lprData="lpr" />
    </q-card>
  </transition-group>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ["lprData", "moduleName"],
  data() {
    return {
    };
  },
  components: {
    "card-plateNumber": require("./Shared/Card/CardPlateNumber").default,
    "card-image": require("./Shared/Card/CardImages").default,
    "card-data": require("./Shared/Card/CardData").default,
    "card-actions": require("./Shared/Card/CardActions").default
  },
  methods: {
    ...mapActions('lpr', ['editLprPlateNumber']),

  },
  mounted() {},
  computed: {}
};
</script>
<style lang="scss">
.lpr-card {
  //height: 400px;
  //margin: 3px;
  // width: 100%;
  //border: 3px solid white;
  // min-width: 25%;
  // max-width: 50%;
}
</style>
