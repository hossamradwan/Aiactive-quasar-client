<template>
  <q-toolbar class="matching-toolbar text-primary">
    <template class="absolute-left">
      <toggel-update
        v-if="toggelUpdate.includes(moduleName)"
        :moduleName="moduleName"
      />
    </template>

    <template class="align-center">
      <facial-options
        v-if="facial.includes(moduleName)"
        :moduleName="moduleName"
      />
      <q-space />

      <reporting-module-print
        v-if="selectReportingModule.includes(moduleName)"
        :moduleName="moduleName"
      />

      <reporting-module-select
        v-if="selectReportingModule.includes(moduleName)"
        :moduleName="moduleName"
      />

      <date-time
        v-if="dateTime.includes(moduleName)"
        :moduleName="moduleName"
      />

      <search v-if="search.includes(moduleName)" :moduleName="moduleName" />
    </template>

    <filters-dropdown
      v-if="filters.includes(moduleName)"
      :moduleName="moduleName"
      class="absolute-right"
    />
  </q-toolbar>
</template>
<script>
export default {
  props: ["moduleName"],
  data() {
    return {
      toggelUpdate: [
        "generic-lpr-module",
        "average-speed-module",
        "reporting-module",
        "toll-gates-module"
      ],

      selectReportingModule: ["reporting-module"],

      dateTime: [
        "generic-lpr-module",
        "average-speed-module",
        "reporting-module",
        "toll-gates-module"
      ],

      search: [
        "generic-lpr-module",
        "average-speed-module",
        "toll-gates-module"
      ],

      filters: [
        "generic-lpr-module",
        "average-speed-module",
        "toll-gates-module",
        "facial-module"
      ],

      facial: ["facial-module"]
    };
  },
  components: {
    "toggel-update": require("./Shared/ToggelUpdate").default,
    "reporting-module-select": require("./Shared/SelectReportingModule")
      .default,
    "reporting-module-print": require("./Shared/PrintReportingModule").default,
    search: require("./Shared/Search").default,
    "date-time": require("./Shared/DateTime").default,
    "filters-dropdown": require("./Shared/FiltersDropdown").default,
    "facial-options": require("./Shared/FacialOptions").default
  }
};
</script>

<style lang="scss">
.matching-toolbar {
  //padding: 8px;
  //margin: 10px;
  //margin-top: 10px;
  border: 1px solid #d0d0d0;
  border-radius: 10px 10px 0 0;
  //border-top: none
}

.options-dropdown {
  .q-btn-dropdown__arrow {
    display: none;
  }
}

.center {
  display: inline-block;
}
</style>
