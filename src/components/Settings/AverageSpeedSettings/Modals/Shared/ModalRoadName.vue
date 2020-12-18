<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="roadName"
      @input="$emit('update:roadName', $event)"
      :rules="[val => val.length >= 5 || 'Minimum (5) charcater(s) required']"
      lazy-rules
      autofocus
      v-select-all
      ref="modalRoadName"
      label="New Road Name"
      stack-label
      class="col"
    >
      <template v-slot:append>
        <q-icon
          v-if="roadName"
          @click="$emit('update:roadName', '')"
          name="close"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all";

export default {
  props: ["roadName"],
  directives: {
    selectAll
  }
};
</script>
