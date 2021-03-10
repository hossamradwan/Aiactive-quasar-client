<template>
  <div class="q-mb-sm device-url row">
    <q-input
      outlined
      :value="deviceURL"
      @input="$emit('update:deviceURL', $event)"
      ref="modalDeviceURL"
      label="Device URL"
      stack-label
      class="col"
      clearable
    >
    </q-input>
    <q-input
      v-model.number="deviceWidth"
      type="number"
      outlined
      label="Width"
      stack-label
      class="col-2"
    />
    <q-input
      v-model.number="deviceHeight"
      type="number"
      outlined
      label="Height"
      stack-label
      class="col-2"
    />
  </div>
</template>

<script>
export default {
  props: ["deviceURL", "deviceWidth", "deviceHeight"],

  methods: {}
};
</script>

<style scoped>
.device-url {
  min-width: 170px;
}
</style>
