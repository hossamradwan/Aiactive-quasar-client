<template>
  <div class="q-pa-sm">
    <q-input
      dense
      outlined
      v-model="searchField"
      @keyup.enter="searchLpr"
      @keyup.esc="stopSeach"
      v-select-all
      input-class="text-left"
      :placeholder="$t('SearchPlate')"
      class="q-mr-lg col-md-3"
    >
      <template v-slot:append>
        <q-icon v-if="searchField === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="stopSeach" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { SearchLpr } from "src/functions/class-lpr-search";
import { selectAll } from "src/directives/directive-select-all";

export default {
  props: ["moduleName"],
  data() {
    return {
      searchField: ""
    };
  },
  methods: {
    ...mapActions("lpr", [
      "setUpdateTransits",
      "setSearchFlag",
      "searchLprData"
    ]),
    ...mapActions("averageSpeedResult", [
      "setUpdateAverageSpeedTransits",
      "searchAverageSpeedData",
      "setAverageSpeedSearchFlag"
    ]),

    searchLpr() {
      if (this.searchField.length == 0) return;

      let Search = new SearchLpr(this.searchField);
      let outputPlateNumber = Search.search();

      if (outputPlateNumber.length != 0) {
        if (this.moduleName == "average-speed-module") {
          this.searchAverageSpeedData(outputPlateNumber); // Commit Search Action
          return;
        }

        this.searchLprData(outputPlateNumber); // commit search action
      }

      console.log("output platenumber:: ", outputPlateNumber);
    },

    stopSeach() {
      this.searchField = "";
      if (this.moduleName == "average-speed-module") {
        this.setAverageSpeedSearchFlag(false);
        return;
      }

      this.setSearchFlag(false);
    }
  },
  mounted() {
    console.log("searching module", this.moduleName);
  },
  computed: {},
  directives: {
    selectAll
  }
};
</script>

<style lang="scss" scoped></style>
