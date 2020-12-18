<template>
    <div class="text-center">
      <q-btn
        @click="$emit('applyFilter')"
        color="primary"
        class="q-ma-sm"
        label="apply"
        push
        size="12px"
      />
      <!-- <q-btn
        color="primary"
        class="q-ma-sm"
        label="reset"
        push
        size="10px"
        v-close-popup
      /> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    test() {
      console.log('applying');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
