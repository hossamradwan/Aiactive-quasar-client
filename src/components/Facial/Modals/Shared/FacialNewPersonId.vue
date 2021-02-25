<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="id"
      @input="$emit('update:id', $event)"
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
  props: ["id", "label"],
  methods: {}
};
</script>
