<template>
  <q-card>
    <q-card-section class="text-h6"
      >Add LPR
      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>

    <form @submit.prevent="submitForm">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
            outlined
            :value="plateNo"
            label="Plate No."
            stack-label
            class="col"
            clearable
          />
        </div>
        <div class="row q-mb-sm">
          <q-input
            outlined
            :value="driverName"
            label="Driver Name"
            stack-label
            class="col"
            clearable
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Save" color="primary" type="submit" />
      </q-card-actions>
    </form>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      plateNo: "",
      driverName: ""
    };
  }
};
</script>
