<template>
  <div>
    <q-input
      outlined
      v-model="plateNo"
      label="Plate Number"
      class="q-pa-md"
      style="min-width: 170px;"
    />
    <div class="row">
      <modal-date-picker label="From Date" />
      <modal-date-picker label="To Date" />
    </div>
    <div class="fit row  justify-center  ">
      <q-btn class="q-ma-md bg-dark text-white" label="Add To BLACK list" />
      <q-btn
        outline
        color="primary"
        class="q-ma-md"
        label="Add To WHITE list"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ['plateNo'],
  components: {
    'modal-date-picker': require('components/Settings/DevicesSettings/Modals/Shared/ModalDatePicker')
      .default
  }
};
</script>
