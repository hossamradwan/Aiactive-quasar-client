<template>
  <div class="q-pa-md">
    <div>
      <q-layout
        view="hHh Lpr lfr"
        container
        style="height: 500px"
        class="bg-grey-3"
      >
        <q-header class="bg-black">
          <q-toolbar>
            <q-btn
              flat
              @click="drawerLeft = !drawerLeft"
              round
              dense
              icon="menu"
            />
            <q-btn icon="psychology" round color="primary" @click="push" />
            <q-toolbar-title>Camera Name</q-toolbar-title>
            <div
              class="row  justify-center  "
              v-if="selectedCameraID != 'noImage'"
            >
              <q-toggle
                toggle-indeterminate
                v-model="detection"
                color="green"
                :label="
                  detection
                    ? 'Face Recognition'
                    : detection == null
                    ? 'Face Detection'
                    : 'Disabled'
                "
              />
              <q-btn
                v-if="videoStatus == 'play'"
                icon="pause"
                color="positive"
                @click="pauseFeed(selectedCameraID)"
              />
              <q-btn
                v-if="videoStatus == 'pause'"
                icon="play_arrow"
                color="positive"
                @click="palyFeed(selectedCameraID)"
              />
              <q-btn
                icon="stop"
                color="positive"
                @click="stopCamera(selectedCameraID)"
              />
            </div>
          </q-toolbar>
        </q-header>

        <q-drawer v-model="drawerLeft" bordered :width="200" :breakpoint="300">
          <q-scroll-area class="fit">
            <div class="q-pa-sm">
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
            </div>
          </q-scroll-area>
        </q-drawer>

        <q-page-container>
          <q-page class="q-pa-md">
            <q-carousel
              v-model="selectedCameraID"
              transition-prev="slide-right"
              transition-next="slide-left"
              animated
              control-color="primary"
              padding
              infinite
              arrows
            >
              <q-carousel-slide name="noImage">
                <template>
                  <div
                    class="absolute-full flex flex-center bg-negative text-white"
                  >
                    No Cameras Added Yet
                  </div>
                </template>
              </q-carousel-slide>
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
                </q-img>
              </q-carousel-slide>
            </q-carousel>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      drawerLeft: true,
      selectedCameraID: "noImage",
      videoStatus: "play",
      slide: 1,
      autoplay: false,
      images: [
        "https://picsum.photos/123/456",
        "https://picsum.photos/789/987",
        "https://picsum.photos/321/213",
        "https://picsum.photos/486/654",
        "https://picsum.photos/756/255"
      ],
      arr1: [],
      arr2: []
    };
  },

  mounted() {
    this.arr1 = this.images.slice(0, 4);
    if (this.cameras.length > 0)
      this.selectedCameraID = this.cameras[0].cameraId;
  },
  computed: {
    ...mapState("facialCamera", ["cameras", "screenToShow"]),
    detection: {
      get() {
        let index = this.cameras.findIndex(
          x => x.cameraId === this.selectedCameraID
        );
        let selectedCamera = this.$store.getters["facialCamera/cameras"][index];
        if (selectedCamera.faceRecognition) {
          return true;
        } else if (
          selectedCamera.faceDetection == true &&
          selectedCamera.faceRecognition == false
        ) {
          return null;
        } else {
          return false;
        }
      },
      set(value) {
        console.log("value:", value);
        let index = this.cameras.findIndex(
          x => x.cameraId === this.selectedCameraID
        );
        this.$store.dispatch("facialCamera/updateFaceDetection", {
          index,
          value,
          cameraId: this.selectedCameraID
        });
      }
    }
  },
  methods: {
    ...mapActions("facialCamera", [
      "addDevice",
      "removeDevice",
      "enableFaceRecognition",
      "enableFaceDetection",
      "pauseDevice",
      "updateMessage"
    ]),
    pauseFeed(camera) {
      this.videoStatus = "pause";
      this.pauseDevice(camera);
    },
    palyFeed(camera) {
      this.videoStatus = "play";
      this.addDevice(camera);
    },
    stopCamera(camera) {
      let index = this.cameras.findIndex(x => x.cameraId === camera);
      let previouseSlide;
      if (index != 0) {
        previouseSlide = this.cameras[index - 1].cameraId;
      } else {
        if (this.cameras.length == 1) {
          previouseSlide = "noImage";
        } else {
          previouseSlide = this.cameras[this.cameras.length - 1].cameraId;
        }
      }
      console.log("index:", index);
      console.log("previouseSlide:", previouseSlide);
      this.removeDevice(camera);

      this.setselectedCameraID(previouseSlide);
    },
    setselectedCameraID(slide) {
      this.selectedCameraID = slide;
    },
    async push() {
      let random1 = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      let random2 = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      let newPic = [`https://picsum.photos/${random1}/${random2}`];
      if (this.slide == 1) {
        this.arr2 = newPic.concat(this.arr1.slice(0, 3));
      } else {
        this.arr1 = newPic.concat(this.arr2.slice(0, 3));
      }

      this.autoplay = 100;
      this.sleep(150).then(() => {
        this.autoplay = false;
      });
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  watch: {
    // screenToShow: function() {
    //   console.log("this.screenToShow:", this.screenToShow);
    //   if (this.screenToShow != null) {
    //     this.setselectedCameraID(this.screenToShow);
    //     this.$store.commit("facialCamera/resetSelectedCameraIndex");
    //   }
    // },
    // Set Carosel on first camera if no other exists
    // cameras: function() {
    //   console.log("selectedCameraIndex", this.selectedCameraIndex);
    //   if (this.cameras.length == 1) {
    //     this.selectedCameraID = this.cameras[0].cameraId;
    //   }
    // }
  }
};
</script>
