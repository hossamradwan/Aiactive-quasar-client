<template>
  <q-item-section
    class="lpr-plateNumber"
  >
    <q-item-label class="q-ma-xs text-center text-bold text-black text-h6">{{lprPlateNumber}}</q-item-label>
  </q-item-section>
</template>

<script>
export default {
  props: ['lprPlateNumber'],
  data() {
    return {

    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.lpr-plateNumber {
  //background: rgba(0, 0, 0, 0.57);
  border: 1px solid #cecece;
  padding: 5px;
  box-shadow: 0px -3px #005a7ee3;
}
</style>
