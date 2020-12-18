<template>
  <div class="q-pa-md">
    <q-input
      :value="serverPortNumberToSubmit"
		  @input="$emit('update:serverPortNumberToSubmit', $event)"
      type="number"
      outlined
      label="Port Number"
      class="col"
    />
  </div>
</template>

<script>
export default {
  props: ['serverPortNumberToSubmit'],
  data() {
    return {
    }
  }
}
</script>
