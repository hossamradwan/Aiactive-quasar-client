<template>
  <q-item-section
    class="lpr-plateNumber"
  >
    <q-item-label class="q-ma-sm text-center text-bold text-black text-h5">{{lprPlateNumber}}</q-item-label>
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
  padding: 10px;
  box-shadow: 0px -5px #005a7ee3;
}
</style>
