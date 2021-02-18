<template>
  <div v-if="selectedData.length > 1" class="q-pa-sm" style="max-width: 300px">
    <q-btn
      outline
      dense
      @click="setSelectedData({ action: 'removeAll' })"
      :color="selectedData.length > 0 ? 'primary' : ''"
      :label="`Unselect -  ${selectedData.length}`"
      :disable="selectedData.length == 0"
    />

    <q-btn
      outline
      dense
      @click="setViolationToPrint('printAll')"
      :color="selectedData.length > 0 ? 'primary' : ''"
      :label="`Print All`"
      :disable="selectedData.length == 0"
    />
    <q-btn
      outline
      dense
      @click="setViolationToPrint('downloadAll')"
      :color="selectedData.length > 0 ? 'primary' : ''"
      :label="`Download All`"
      :disable="selectedData.length == 0"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["moduleName"],
  data() {
    return {};
  },
  methods: {
    ...mapActions("reporting", ["setSelectedData", "setViolationToPrint"])
  },
  mounted() {},
  computed: {
    ...mapState("reporting", ["selectedData"])
  }
};
</script>
