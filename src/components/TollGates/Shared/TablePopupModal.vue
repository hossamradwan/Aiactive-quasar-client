<template>
  <q-card class="ExpandableCard">
    <div class="row">
      <!-- Person Image -->
      <q-img
        class="col"
        :src="activeCarousel.path + '/' + activeCarousel.source2"
        transition="slide-right"
        style="height: 400px; max-width: 500px"
      >
        <!-- Date_Time -->
        <div class="absolute-top  text-weight-bold  ">
          <div class="absolute-center  ">
            {{ activeCarousel.date_time }}
          </div>
        </div>
      </q-img>

      <!-- Plate Image -->
      <q-img
        class="col"
        :src="activeCarousel.path + '/' + activeCarousel.source1"
        transition="slide-left"
        style="width: 500px; max-height: 500px"
      >
        <!-- Car Details -->
        <div class="absolute-bottom text-subtitle2 text-center">
          <div>Brand: {{ activeCarousel.brand }}</div>
          <div>Model: {{ activeCarousel.model }}</div>
          <div>Colour: {{ activeCarousel.color }}</div>
        </div>
        <!-- Plate Number -->
        <div class="absolute-top text-h6 text-weight-bold">
          <div class="absolute-center ">
            {{ activeCarousel.plate_number }}
          </div>
        </div>
      </q-img>
    </div>
  </q-card>
</template>
<script>
export default {
  props: ["activeCarousel"]
};
</script>
<style>
.ExpandableCard {
  width: 100%;
}
</style>
