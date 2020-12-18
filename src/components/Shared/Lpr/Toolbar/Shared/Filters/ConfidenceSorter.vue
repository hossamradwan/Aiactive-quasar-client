<template>
  <div class="column items-left filter">
    <div class="text-h6 text-center q-mb-md">Confidence Sorter</div>

    <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio
            v-model="sorterType"
            val="ASC"
            color="teal" />
        </q-item-section>

        <q-item-section>
          <q-item-label>ASC</q-item-label>
        </q-item-section>
    </q-item>


    <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio
            v-model="sorterType"
            val="DESC"
            color="teal" />
        </q-item-section>

        <q-item-section>
          <q-item-label>DESC</q-item-label>
        </q-item-section>
    </q-item>

    <filter-actions @applyFilter="$emit('applyConfidenceSorter', sorterType)" />
  </div>
</template>

<script>
export default {
  props: ['sorterConfidence'],
  data() {
    return {
      sorterType: 'DESC'
    };
  },
  components: {
    'filter-actions': require('./FiltersActions/ActionButtons').default
  },
  methods: {

  },
  mounted() {
    this.sorterType = this.sorterConfidence.type
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
