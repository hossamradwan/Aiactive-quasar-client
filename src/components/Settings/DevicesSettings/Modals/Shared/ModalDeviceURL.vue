<template>
  <div class="q-mb-sm device-url row fit ">
    <q-input
      outlined
      :value="streamUrl"
      @input="$emit('update:streamUrl', $event)"
      ref="modalDeviceURL"
      label="Stream URL"
      stack-label
      class="col-12"
      clearable
    >
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["streamUrl"],

  methods: {}
};
</script>

<style scoped>
.device-url {
  min-width: 170px;
}
</style>
