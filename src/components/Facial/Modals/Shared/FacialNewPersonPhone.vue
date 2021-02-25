<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="phone"
      @input="$emit('update:phone', $event)"
      :rules="[val => !!val || 'Filed Is Required']"
      lazy-rules
      mask="### - #### - ####"
      unmasked-value
      :label="label"
      stack-label
      class="col"
      clearable
    >
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["phone", "label"],
  methods: {}
};
</script>
