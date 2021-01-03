<template>
  <div class="">
    <q-toggle
      :label="$t('AutoUpdate')"
      v-model="toggelUpdateTransits"
      checked-icon="check"
      unchecked-icon="clear"
      color="teal"
      class="q-ml-xs"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["moduleName"],
  data() {
    return {
      lprModules: ["generic-lpr-module", "toll-gates-module"]
    };
  },
  methods: {
    ...mapActions("lpr", ["setUpdateTransits"]),
    ...mapActions("averageSpeedResult", ["setUpdateAverageSpeedTransits"])
  },
  computed: {
    ...mapGetters("lpr", ["updateTransits"]),
    ...mapGetters("averageSpeedResult", ["updateAverageSpeedTransits"]),
    toggelUpdateTransits: {
      get() {
        if (this.moduleName == "average-speed-module") {
          return this.updateAverageSpeedTransits;
        } else if (this.lprModules.includes(this.moduleName)) {
          return this.updateTransits;
        }
      },
      set(value) {
        if (this.moduleName == "average-speed-module") {
          this.setUpdateAverageSpeedTransits(value);
        } else if (this.lprModules.includes(this.moduleName)) {
          this.setUpdateTransits(value);
        }
      }
    }
  },
  beforeDestroy() {
    this.toggelUpdateTransits = false;
  }
};
</script>

<style lang="scss" scoped></style>
