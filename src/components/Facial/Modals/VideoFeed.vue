<template>
  <div style="height:100%">
    <div
      @mouseover="showToolbar = true"
      @mouseleave="showToolbar = false"
      v-if="index < cameras.length"
      style="height:100%"
    >
      <!-- Video Feed -->

      <q-img
        ref="feed"
        :src="cameras[index].videoFeedUrl"
        @dblclick="fullscreen"
        style="height:100%"
      >
        <!-- :ratio="16 / 9" -->
        <div
          class="absolute-bottom text-subtitle1 "
          v-if="showToolbar"
          style="zoom: 80%; "
        >
          <!-- Pause -->
          <q-btn
            v-if="videoStatus == 'play'"
            icon="pause"
            color="primary"
            text-color="yellow"
            round
            @click="pauseFeed(selectedCameraID)"
          />
          <!-- Play -->
          <q-btn
            v-if="videoStatus == 'pause'"
            icon="play_arrow"
            color="primary"
            text-color="green"
            round
            @click="palyFeed(selectedCameraID)"
          />
          <!-- Stop -->
          <q-btn
            icon="stop"
            round
            color="primary"
            text-color="red"
            @click="stopCamera(selectedCameraID)"
          />
          <q-btn icon="volume_up" round color="primary" />
          <q-btn icon="local_see" round color="primary" />
          <q-btn icon="power" round color="primary" />

          <q-btn icon="settings" round color="primary" />
          <!-- Face Recognition Button -->
          <!-- <q-toggle
            style="word-wrap: normal; text-size:40%"
            toggle-indeterminate
            v-model="detection"
            color="green"
          /> -->
        </div>
      </q-img>

      <!-- m3u8 player -->
      <!-- <div class="player">
    <video-player
      ref="videoPlayer"
      class="vjs-custom-skin"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @ready="onPlayerReady($event)"
    />
  </div> -->
    </div>
    <span v-else style=" color: white;">No Content</span>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import VideoPlayer from "@/components/Facial/Modals/Shared/VideoPlayer/VideoPlayer.vue";
import Adsense from "@/components/Facial/Modals/Shared/VideoPlayer/xui-adsense/InArticleAdsense.vue";
import Ribbon from "vue-ribbon";
export default {
  components: {
    VideoPlayer,
    Adsense,
    Ribbon
  },
  props: ["index"],
  data() {
    return {
      dialog: false,
      maximizedToggle: true,
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
      arr2: [],
      playerOptions: {
        autoplay: true,
        controls: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        }
      }
    };
  },

  mounted() {
    this.arr1 = this.images.slice(0, 4);
    if (this.cameras.length > 0)
      this.selectedCameraID = this.cameras[this.index].cameraId;

    const src =
      "http://192.168.1.26:8080/22e479f60aacb86ba8531979f250d892/hls/dnU07P50ws/AgbX42cQ8b80/s.m3u8";
    this.playVideo(src);
  },
  computed: {
    ...mapState("VMS", ["cameras", "selectedCameraIndex"]),
    detection: {
      get() {
        let index = this.cameras.findIndex(
          x => x.cameraId === this.selectedCameraID
        );
        let selectedCamera = this.$store.getters["VMS/cameras"][index];
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
        this.$store.dispatch("VMS/updateFaceDetection", {
          index,
          value,
          cameraId: this.selectedCameraID
        });
      }
    },

    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    ...mapActions("VMS", [
      "addDevice",
      "removeDevice",
      "enableFaceRecognition",
      "enableFaceDetection",
      "pauseDevice",
      "updateMessage"
    ]),
    fullscreen(e) {
      const target = e.target.parentNode.parentNode.parentNode;

      this.$q.fullscreen
        .toggle(target)
        .then(() => {
          // success!
        })
        .catch(err => {
          alert(err);
          // uh, oh, error!!
          // console.error(err)
        });
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
    },

    onPlayerPlay(player) {},
    onPlayerReady(player) {
      this.player.play();
    },
    playVideo: function(source) {
      const video = {
        withCredentials: false,
        type: "application/x-mpegurl",
        src: source
      };
      this.player.reset(); // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video);
      // this.player.load()
      this.player.play();
    }
  },
  watch: {
    selectedCameraIndex: function() {
      // console.log("this.selectedCameraIndex:", this.selectedCameraIndex);
      if (this.selectedCameraIndex != null) {
        this.setselectedCameraID(this.selectedCameraIndex);
        this.$store.commit("VMS/resetSelectedCameraIndex");
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

<style scoped>
.player {
  position: absolute !important;
  width: 100%;
  height: 100%;
}

.vjs-custom-skin {
  height: 90% !important;
}

.vjs-custom-skin /deep/ .video-js {
  width: 100% !important;
  height: 90%;
}
</style>
