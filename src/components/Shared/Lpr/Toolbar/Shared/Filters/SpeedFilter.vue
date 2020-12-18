<template>
  <div class="column items-center filter">
    <div class="text-h6 text-center q-mb-md">Speed Filter</div>

    <q-input
      v-model="speedNum"
      type="number"
      @input="changeValue"
      :rules="[val => val <= 250 || 'Maximum Speed number (250)']"
      outlined
      label="Speed Limit"
    />

    <q-knob
      :max="250"
      show-value
      font-size="12px"
      v-model="speedNum"
      size="100px"
      :thickness="0.22"
      color="teal"
      track-color="grey-3"
      class="q-mb-lg q-mt-md"
    >
      {{ speedNum }} Km/h
    </q-knob>

    <filter-actions @applyFilter="$emit('applySpeedFilter', speedNum)" />
  </div>
</template>

<script>
export default {
  props: ['speed'],
  data() {
    return {
      speedNum: 10
    };
  },
  components: {
    'filter-actions': require('./FiltersActions/ActionButtons').default
  },
  methods: {
    changeValue(val) {
      this.speedNum = parseInt(val);
    }
  },
  mounted() {
    this.speedNum = this.speed.data
  }
};
</script>

<style lang="scss" scoped>
.filter {
  justify-content: center;
}

</style>
