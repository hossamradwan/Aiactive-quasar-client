<template>
  <div>
    <div class="fit column" v-if="false">
      <!-- Row 1 -->
      <div class="full-width row  justify-between  ">
        <!-- Row 1 > Column 1 -->
        <!-- TimeStamp -->
        <h5>
          {{ date }} <br />
          {{ time }}
        </h5>

        <!-- Row 1 > Column 2 -->
        <!-- Action Buttons -->
        <div class="q-pa-md">
          <!-- Button Add New Person -->
          <q-btn
            icon="person_add"
            round
            color="primary"
            @click="showDialog = true"
          />

          <!-- Buttons For Testing -->
          <q-btn icon="psychology" round color="primary" @click="push" />

          <!-- Button Add New Camera -->
          <q-btn color="primary" icon="video_call" round>
            <!-- Dialoge Add New Camera  -->
            <q-menu fit anchor="center right" self="center left">
              <q-item>
                <q-item-section
                  ><q-input
                    outlined
                    v-model="payload.url"
                    label="url"
                    clearable
                  />
                  <q-input
                    outlined
                    v-model="payload.width"
                    label="width"
                    clearable
                  />
                  <q-input
                    outlined
                    v-model="payload.height"
                    label="height"
                    clearable
                  />

                  <q-btn
                    label="Add Camera"
                    color="negative"
                    @click="addDevice(payload)"
                  />
                </q-item-section>
              </q-item>
            </q-menu>
          </q-btn>
        </div>

        <!-- Row 1 > Column 3 -->
        <div style="overflow: auto;min-height: 110px;  ">
          <div class="fit row">
            <apexchart
              type="radialBar"
              height="100"
              width="60"
              :options="chartOptions"
              :series="series"
            />
            <apexchart
              type="radialBar"
              height="100"
              width="60"
              :options="chartOptions"
              :series="series"
            />
            <apexchart
              type="radialBar"
              height="100"
              width="60"
              :options="chartOptions"
              :series="series"
            />
          </div>
        </div>
      </div>

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
            v-if="faceDetection || faceRecognition"
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
          <div class=" column col" style="overflow: auto; ">
            <div
              class=" row  justify-center  "
              v-if="selectedCameraID != 'noImage'"
            >
              <!-- v-model="faceDetection" -->
              <q-toggle
                toggle-indeterminate
                v-model="detection"
                color="green"
                checked-icon="sentiment_very_satisfied"
                indeterminate-icon="sentiment_neutral"
                unchecked-icon="sentiment_very_dissatisfied"
                keep-color
                :label="
                  detection
                    ? 'Face Recognition'
                    : detection == null
                    ? 'Face Detection'
                    : 'Disabled'
                "
              />
            </div>
            <q-carousel
              v-model="selectedCameraID"
              transition-prev="slide-right"
              transition-next="slide-left"
              animated
              control-color="primary"
              padding
              infinite
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
            <div
              class="row  justify-center  "
              v-if="selectedCameraID != 'noImage'"
            >
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
          </div>

          <!-- Row 2 > Column 3 -->
          <!-- Cameras List -->
          <div class="col-2" style="overflow: auto;" v-if="cameras.length > 1">
            <q-list>
              <q-item
                clickable
                v-close-popup
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
          </div>
        </div>
      </div>

      <!-- Add New Person Dialog -->
      <q-dialog
        v-model="showDialog"
        transition-show="rotate"
        transition-hide="rotate"
      >
        <new-person-dialog />
      </q-dialog>
    </div>
    <div v-else class="row">
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
      flex: `col-${12}`,
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
      console.log("index:", index);
      console.log("previouseSlide:", previouseSlide);
      this.removeDevice(camera);

      this.setselectedCameraID(previouseSlide);
    },
    setselectedCameraID(slide) {
      this.selectedCameraID = slide;
    },
    getNow: function() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
      this.date = date;
      this.time = time;
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
    "video-feed": require("components/Facial/Modals/VideoFeed").default,
    "morph-view": require("components/Facial/Modals/MorphView").default
  }
};
</script>
