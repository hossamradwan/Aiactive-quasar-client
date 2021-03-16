<template>
  <div>
    <div class="row">
      <video-feed
        :class="flex"
        v-for="(camera, index) in cameras"
        :key="camera.cameraId"
        :index="index"
        :flex="devicesPerRow"
        @clicked="showCameraDialog"
      />

      <!-- <morph-view /> -->
    </div>

    <q-dialog v-model="cameraDialog" persistent :maximized="maximizedToggle">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none">
          <video-feed :index="cameraid" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "ComponentFacialRecord",

  data() {
    return {
      maximizedToggle: true,
      cameraDialog: false,
      showToolbar: false,
      flex: `col-${12 / 2}`,
      faceDetection: false,
      faceRecognition: false,
      videoStatus: "play",
      payload: {
        url: 0,
        width: 480,
        height: 320
      },
      selectedCamera: {
        videoFeedUrl: "https://picsum.photos/536/978"
      },
      showDialog: false,
      series: [75],

      slide: 1,
      selectedCameraID: "noImage",
      autoplay: false,

      timestamp: "",
      date: "",
      time: "",
      settingsLoading: false,
      messages: false,
      cameraid: -1
    };
  },
  mounted() {},
  created() {
    setInterval(this.getNow, 1000);
  },
  computed: {
    ...mapState("facialCamera", [
      "cameras",
      "selectedCameraIndex",
      "devicesPerRow"
    ]),
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

    showCameraDialog(cameraId) {
      this.cameraDialog = true;
      this.cameraid = cameraId;
    },
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

      this.removeDevice(camera);

      this.setselectedCameraID(previouseSlide);
    },
    setselectedCameraID(slide) {
      this.selectedCameraID = slide;
    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    test(x) {
      console.log("x:", x);
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
    }
  },
  watch: {
    // Dynamic Flex Box Watcher
    devicesPerRow: function() {
      this.flex = `col-${12 / this.devicesPerRow}`;
    },

    selectedCameraIndex: function() {
      if (this.selectedCameraIndex != null) {
        this.setselectedCameraID(this.selectedCameraIndex);
        // this.$store.commit("facialCamera/resetSelectedCameraIndex");
      }
    },

    // Set Carosel on first camera if no other exists
    cameras: function() {
      if (this.cameras.length == 1) {
        this.selectedCameraID = this.cameras[0].cameraId;
      }
    }
  },
  components: {
    "new-person-dialog": require("components/Facial/Modals/NewPersonDialog")
      .default,
    "video-feed": require("components/Facial/Modals/VideoFeed").default
  }
};
</script>
