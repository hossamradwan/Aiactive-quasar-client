<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[val => !!val || 'Field is required']"
      lazy-rul
      es
      :label="label"
      class="col"
      clearable
    >
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["name", "label"],
  methods: {}
};
</script>
