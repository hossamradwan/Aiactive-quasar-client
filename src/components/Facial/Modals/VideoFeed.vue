<template>
  <div class="fit column   ">
    <!-- Row 2 -->
    <div class="col-7">
      <div class="fit row">
        <!-- Row 2 > Column 1 -->
        <!-- Faces Carousel -->
        <q-carousel
          v-model="slide"
          vertical
          transition-prev="slide-up"
          transition-next="slide-down"
          animated
          swipeable
          height=" 450px"
          :autoplay="autoplay"
          infinite
          class="col-2 overflow-hidden "
          style="overflow: auto;"
        >
          <q-carousel-slide :name="1" class="row no-wrap">
            <div
              class="column fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
            >
              <q-img
                v-for="image in arr1"
                :key="image.index"
                class="rounded-borders  "
                style="height: 200px; max-width: 300px"
                :src="image"
              />
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="row no-wrap">
            <div class="column fit justify-start items-center  no-wrap">
              <q-img
                v-for="image in arr2"
                :key="image.index"
                class="rounded-borders  "
                style="height: 200px; max-width: 300px"
                :src="image"
              />
            </div>
          </q-carousel-slide>
        </q-carousel>

        <!-- Row 2 > Column 2 -->
        <!-- Record Video Stream -->

        <q-carousel
          v-model="cameraSlide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-color="primary"
          padding
          infinite
          class="col   "
          style="overflow: auto; border-style: dotted"
        >
          <q-carousel-slide
            v-for="camera in cameras"
            :key="camera.cameraId"
            :name="camera.cameraId"
          >
            <q-img
              :src="camera.videoFeedUrl"
              :ratio="1"
              style="overflow: auto; max-height:100%; "
              class="col-7"
            >
              <template v-slot:error>
                <div
                  class="absolute-full flex flex-center bg-negative text-white"
                >
                  Cannot load image
                </div>
              </template>
            </q-img>
          </q-carousel-slide>
          <div
            class="absolute-bottom custom-caption center"
            v-if="cameras.length > 0"
          >
            <q-btn icon="pause" color="positive" @click="pauseDevice(camera)" />
            <q-btn
              icon="play_arrow"
              color="positive"
              @click="addDevice(camera)"
            />
            <q-btn icon="stop" color="positive" @click="stopCamera(camera)" />
          </div>
        </q-carousel>
        <!-- Row 2 > Column 3 -->
        <div class="col-2" style="overflow: auto;">
          <!-- Button Add New Person -->
          <q-btn
            label="Add New Person"
            color="primary"
            @click="showDialog = true"
          />
          <!-- Buttons For Testing -->
          <q-btn label="Generate" color="warning" @click="push" />
          <q-btn label="Test" color="warning" @click="test" />

          <q-btn color="primary" icon="settings" round>
            <q-menu fit anchor="center right" self="center left">
              <q-item>
                <q-item-section
                  ><q-input
                    outlined
                    v-model="payload.url"
                    label="url"
                    clearable/>
                  <q-input
                    outlined
                    v-model="payload.width"
                    label="width"
                    clearable/>
                  <q-input
                    outlined
                    v-model="payload.height"
                    label="height"
                    clearable/>

                  <q-btn
                    label="Add Camera"
                    color="negative"
                    @click="addDevice(payload)"/>

                  <q-toggle
                    v-model="faceDetection"
                    color="green"
                    label="Face Detection"/>
                  <q-toggle
                    v-model="faceRecognition"
                    color="green"
                    label="Face Recognition"
                /></q-item-section>
              </q-item>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "ComponentFacialRecord",

  data() {
    return {
      faceDetection: false,
      faceRecognition: false,
      payload: {
        url: 0,
        width: 480,
        height: 320
      },
      slide: 1,
      cameraSlide: "",
      autoplay: false,
      images: [
        "https://cdn.quasar.dev/img/mountains.jpg",
        "https://cdn.quasar.dev/img/material.png",
        "https://cdn.quasar.dev/img/donuts.png",
        "https://cdn.quasar.dev/img/cat.jpg",
        "https://cdn.quasar.dev/img/linux-avatar.png"
      ],
      arr1: [],
      arr2: []
    };
  },
  mounted() {
    this.arr1 = this.images.slice(0, 4);
    if (this.cameras.length > 0) this.cameraSlide = this.cameras[0].cameraId;
  },

  computed: {
    ...mapState("facialCamera", ["cameras"])
  },
  methods: {
    ...mapActions("facialCamera", [
      "addDevice",
      "removeDevice",
      "enableFaceRecognition",
      "enableFaceDetection",
      "pauseDevice"
    ]),
    stopCamera(camera) {
      // TOdo error if slide of index 0
      let index = this.cameras.findIndex(x => x.cameraId === camera.cameraId);

      let previouseSlide = this.cameras[index - 1].cameraId;
      console.log("index:", index);
      console.log("previouseSlide:", previouseSlide);
      this.removeDevice(camera);

      this.setCameraSlide(previouseSlide);
    },
    setCameraSlide(slide) {
      this.cameraSlide = slide;
    },

    test() {},

    async push() {
      let newPic = ["https://placeimg.com/640/480/any"];

      if (this.slide == 1) {
        this.arr2 = newPic.concat(this.arr1.slice(0, 3));
      } else {
        this.arr1 = newPic.concat(this.arr2.slice(0, 3));
      }

      this.autoplay = 100;
      this.sleep(150).then(() => {
        this.autoplay = false;
      });
    }
  },
  watch: {
    faceDetection: function() {
      this.enableFaceDetection(this.selectedCamera);
    },
    faceRecognition: function() {
      this.enableFaceRecognition(this.selectedCamera);
    }
  }
};
</script>
