<template>
  <div style="height:100%">
    <div
      @mouseover="showToolbar = true"
      @mouseleave="showToolbar = false"
      v-if="index < cameras.length"
      style="height:100%"
    >
      <!-- m3u8 player -->
      <div class="player">
        <video-player
          ref="videoPlayer"
          class="vjs-custom-skin"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @ready="onPlayerReady($event)"
        >
        </video-player>
      </div>
    </div>
    <span v-else style=" color: white;">No Content</span>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import VideoPlayer from "@/components/Vms/Modals/Shared/VideoPlayer/VideoPlayer.vue";
import Adsense from "@/components/Vms/Modals/Shared/VideoPlayer/xui-adsense/InArticleAdsense.vue";
import Ribbon from "vue-ribbon";
export default {
  components: {
    VideoPlayer
  },
  props: ["index"],
  data() {
    return {
      showToolbar: false,
      facesDrawer: false,
      autoplay: false,

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

  mounted() {},
  computed: {
    ...mapState("facial", ["cameras", "selectedCameraIndex"]),
    ...mapState("shinobi", ["ip", "port", "keys", "monitors"]),

    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    ...mapActions("facial", [
      "addDevice",
      "removeDevice",
      "enableFaceRecognition",
      "enableFaceDetection",
      "pauseDevice",
      "updateMessage"
    ]),
    ...mapActions("shinobi", ["getMonitors", "addMonitor"]),
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

    onPlayerPlay(player) {
      console.log("player play");
    },
    onPlayerReady(player) {
      this.player.play();

      let monitorId = this.monitors[this.index].deviceId;
      const src = `http://${this.ip}:${this.port}/${this.keys.API_KEY}/hls/${this.keys.GROUP_KEY}/${monitorId}/s.m3u8`;
      this.playVideo(src);
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
