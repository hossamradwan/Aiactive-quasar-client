<template>
  <div class="column items-center filter">
    <div class="text-h6 text-center q-mb-md">Confidence Filter</div>

    <q-input
      :value="confidence_number"
      type="number"
      @input="changeValue"
      :rules="[val => val <= 100 || 'Maximum confidence number (100)']"
      :label="'Confidence Limit'"
      outlined
    />

    <q-knob
      show-value
      font-size="12px"
      v-model="confidence_number"
      size="100px"
      :thickness="0.22"
      color="teal"
      track-color="grey-3"
      class="q-mb-lg q-mt-md"
    >
      {{ confidence_number }}%
    </q-knob>

    <filter-actions @applyFilter="$emit('applyConfidenceFilter', confidence_number)" />
  </div>
</template>

<script>
export default {
  props: ['confidence'],
  data() {
    return {
      confidence_number: 60
    };
  },
  components: {
    'filter-actions': require('./FiltersActions/ActionButtons').default
  },
  methods: {
    changeValue(val) {
      this.confidence_number = parseInt(val);
    }
  },
  mounted() {
    this.confidence_number = this.confidence.data
  },
  computed: {

  }
};
</script>

<style lang="scss" scoped>
.filter {
  justify-content: center;
}

</style>
