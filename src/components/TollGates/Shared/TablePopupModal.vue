<template>
  <q-card class="row" style="width: 2560px; max-width: 940vw; font-size: 3vmin; background-color: black ">
    <!-- Person Image -->
    <div class="col">


      <!-- Date_Time -->
      <div class=" text-weight-bold" >
        <div style="text-align: center !important; color: white; margin: 10px">
          {{ activeCarousel.date_time }}
        </div>
      </div>

      <!-- plate image -->
      <div class="display: flex">
        <img
          class=" plate-image-preview"
          style="margin: auto; margin-top: 50px"
          :src="activeCarousel.path + '/' + activeCarousel.source2"
          transition="slide-right"
        >
      </div>
      
    </div>
    <!-- </q-img> -->

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
<style scoped>
  div.absolute-full{
    width: 100px;
  }
</style>