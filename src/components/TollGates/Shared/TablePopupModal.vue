<template>
  <q-card class="row" style="width: 2560px; max-width: 90vw; font-size: 3vmin ">
    <!-- Person Image -->
    <q-img
      class="col"
      :src="activeCarousel.path + '/' + activeCarousel.source2"
      transition="slide-right"
    >
      <!-- Date_Time -->
      <div class="absolute-top  text-weight-bold">
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
    >
      <!-- Plate Number -->
      <div class="absolute-top text-weight-bold">
        <div class="absolute-center">
          {{ activeCarousel.plate_number.split("").join(" ") }}
        </div>
      </div>

      <!-- Car Details -->
      <div class="absolute-bottom text-center text-weight-bold">
        <div>Brand: {{ activeCarousel.brand }}</div>
        <div>Model: {{ activeCarousel.model }}</div>
        <div>Colour: {{ activeCarousel.color }}</div>
      </div>
    </q-img>
  </q-card>
</template>
<script>
export default {
  props: ["activeCarousel"]
};
</script>
