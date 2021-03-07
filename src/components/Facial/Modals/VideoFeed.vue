<template>
  <div @mouseover="showToolbar = true" @mouseleave="showToolbar = false">
    <div>
      <!-- Cameras -->
      <q-scroll-area class="fit" v-model="drawerRight">
        <div class="q-pa-sm"></div>
      </q-scroll-area>

      <!-- Video Feed -->

      <q-carousel
        v-model="selectedCameraID"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        padding
        infinite
      >
        <!-- No Image Slide -->
        <q-carousel-slide name="noImage">
          <template>
            <div class="absolute-full flex flex-center bg-negative text-white">
              No Cameras Added Yet
            </div>
          </template>
        </q-carousel-slide>

        <!-- Video Carousel -->
        <q-carousel-slide
          v-for="camera in cameras"
          :key="camera.cameraId"
          :name="camera.cameraId"
        >
          <!-- Video Feed -->
          <q-img
            :src="camera.videoFeedUrl"
            :ratio="1"
            style="overflow: auto; max-height:100%; "
            class="col-7"
          >
            <q-menu touch-position context-menu>
              <q-list>
                <q-item
                  clickable
                  v-for="camera in cameras"
                  :key="camera.cameraId"
                  @click="setselectedCameraID(camera.cameraId)"
                >
                  <!-- @click="setStreamUrl(camera.videoFeedUrl)" -->
                  <q-item-section>
                    <q-item-label>Camera {{ camera.cameraId }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>

            <!-- Faces -->
            <div
              style="min-height:100%;width:20% ;background-color: transparent"
              v-if="flex < 3"
            >
              <div
                class="q-py-xl"
                style="background-color: transparent ;"
                v-if="facesDrawer"
              >
                <q-carousel
                  v-model="slide"
                  vertical
                  transition-prev="slide-up"
                  transition-next="slide-down"
                  animated
                  swipeable
                  :autoplay="autoplay"
                  infinite
                  class="col-2 overflow-hidden "
                  style="overflow: auto; float: left; background-color: transparent"
                >
                  <q-carousel-slide :name="1" class="row no-wrap">
                    <div class="column fit  items-center  no-wrap">
                      <q-avatar
                        size="4rem"
                        v-for="image in arr1"
                        :key="image.index"
                      >
                        <q-img class="rounded-borders  " :src="image"> </q-img>
                        <q-tooltip>Person Name</q-tooltip>
                      </q-avatar>
                    </div>
                  </q-carousel-slide>
                  <q-carousel-slide :name="2" class="row no-wrap">
                    <div class="column fit justify-start items-center  no-wrap">
                      <q-avatar
                        size="4em"
                        v-for="image in arr2"
                        :key="image.index"
                      >
                        <q-img class="rounded-borders  " :src="image" />
                      </q-avatar>
                    </div>
                  </q-carousel-slide>
                </q-carousel>
              </div>
            </div>

            <!-- Video Toolbar -->
            <q-toolbar v-if="showToolbar" style="zoom: 80%; ">
              <q-btn
                flat
                @click="facesDrawer = !facesDrawer"
                round
                dense
                icon="menu"
              />
              <!-- Test Button -->
              <!-- <q-btn icon="psychology" round color="primary" @click="push" /> -->

              <!-- Title -->
              <q-toolbar-title style="font-size:1.5em">
                {{ index }}
              </q-toolbar-title>
              <div
                class="row absolute-center  "
                v-if="selectedCameraID != 'noImage'"
              >
                <!-- Pause -->
                <q-btn
                  v-if="videoStatus == 'play'"
                  icon="pause"
                  text-color="yellow"
                  round
                  @click="pauseFeed(selectedCameraID)"
                />
                <!-- Play -->
                <q-btn
                  v-if="videoStatus == 'pause'"
                  icon="play_arrow"
                  text-color="green"
                  round
                  @click="palyFeed(selectedCameraID)"
                />
                <!-- Stop -->
                <q-btn
                  icon="stop"
                  round
                  text-color="red"
                  @click="stopCamera(selectedCameraID)"
                />
              </div>
              <!-- Face Recognition Button -->
              <q-toggle
                toggle-indeterminate
                v-model="detection"
                color="green"
                shrink
                :label="
                  detection
                    ? 'Face Recognition Enabled'
                    : detection == null
                    ? 'Face Detection Enabled'
                    : 'Face Recognition Disabled'
                "
              />
            </q-toolbar>
          </q-img>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  props: ["index", "flex"],
  data() {
    return {
      showToolbar: false,
      facesDrawer: false,
      drawerRight: false,
      selectedCameraID: "noImage",
      videoStatus: "play",
      slide: 1,
      autoplay: false,
      images: [
        "https://randomuser.me/api/portraits/men/63.jpg",
        "https://randomuser.me/api/portraits/women/55.jpg",
        "https://randomuser.me/api/portraits/men/33.jpg",
        "https://randomuser.me/api/portraits/women/22.jpg",
        "https://randomuser.me/api/portraits/men/10.jpg"
      ],
      arr1: [],
      arr2: []
    };
  },

  mounted() {
    this.arr1 = this.images.slice(0, 4);
    if (this.cameras.length > 0)
      this.selectedCameraID = this.cameras[this.index].cameraId;
  },
  computed: {
    ...mapState("facialCamera", ["cameras", "selectedCameraIndex"]),
    detection: {
      get() {
        let index = this.cameras.findIndex(
          x => x.cameraId === this.selectedCameraID
        );
        let selectedCamera = this.$store.getters["facialCamera/cameras"][index];
        if (selectedCamera.faceRecognition) {
          this.facesDrawer = true;
          return true;
        } else if (
          selectedCamera.faceDetection == true &&
          selectedCamera.faceRecognition == false
        ) {
          this.facesDrawer = true;
          return null;
        } else {
          this.facesDrawer = false;
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
      let random1 = Math.floor(Math.random() * (99 - 10 + 1) + 10);
      let newPic = [`https://randomuser.me/api/portraits/men/${random1}.jpg`];
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
    selectedCameraIndex: function() {
      console.log("this.selectedCameraIndex:", this.selectedCameraIndex);
      if (this.selectedCameraIndex != null) {
        this.setselectedCameraID(this.selectedCameraIndex);
        this.$store.commit("facialCamera/resetSelectedCameraIndex");
      }
    },

    // Set Carosel on first camera if no other exists
    cameras: function() {
      if (this.cameras.length == 1) {
        this.selectedCameraID = this.cameras[0].cameraId;
      }
    }
  }
};
</script>
