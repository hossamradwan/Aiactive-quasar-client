<template>
  <div class="column items-center filter">
    <div class="text-h6 text-center q-mb-md">Pagination Settings</div>

    <q-input
      :value="limit"
      type="number"
      @input="changeValue"
      :rules="[val => val <= 100 || 'Maximum Records Per Page (250)']"
      outlined
      label="Page Limit"
    />

    <q-knob
      show-value
      font-size="12px"
      v-model="limit"
      size="100px"
      :thickness="0.22"
      color="teal"
      track-color="grey-3"
      class="q-mb-lg q-mt-md"
    >
      {{ limit }} Record/Page
    </q-knob>

    <filter-actions @applyFilter="$emit('applyPaginationLimit', limit)" />
  </div>
</template>

<script>
export default {
  props: ['paginationLimit'],
  data() {
    return {
      limit: 10
    };
  },
  components: {
    'filter-actions': require('./FiltersActions/ActionButtons').default
  },
  methods: {
    changeValue(value) {
      this.limit = parseInt(value);
    }
  },
  mounted() {
    this.limit = this.paginationLimit
  }
};
</script>

<style lang="scss" scoped>
.filter {
  justify-content: center;
}

</style>
