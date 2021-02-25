<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="email"
      @input="$emit('update:email', $event)"
      :rules="[
        val => isValidEmailAddress(val) || 'Please enter a valid email address.'
      ]"
      lazy-rules
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
  props: ["email", "label"],
  methods: {
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>
