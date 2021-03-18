<template>
  <div>
    <input type="checkbox" v-model="draggable" /> Draggable
    <input type="checkbox" v-model="resizable" /> Resizable
    <grid-layout
      :layout.sync="layout"
      :col-num="colNum"
      :row-height="30"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :static="item.static"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :minH="5"
        :preserveAspectRatio="false"
      >
        <q-img :src="cameras[item.i].videoFeedUrl" style="height: 100%" />
        <span class="remove" @click="removeItem(item.i)">x</span>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout';
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  components: {
    GridLayout,
    GridItem,
    'new-person-dialog': require('components/facial/Modals/NewPersonDialog')
      .default,
    'video-feed': require('components/facial/Modals/VideoFeed').default
  },
  data() {
    return {
      layout: [
        // { x: 0, y: 0, w: 2, h: 5, i: "0" },
        // { x: 2, y: 0, w: 2, h: 5, i: "1" },
        // { x: 4, y: 0, w: 2, h: 5, i: "2" },
        // { x: 6, y: 0, w: 2, h: 5, i: "3" }
      ],
      draggable: true,
      resizable: true,
      colNum: 12,
      index: 0,

      activeStoreDevices: [],
      maximizedToggle: true,
      cameraDialog: false,
      showToolbar: false,
      flex: `col-${12}`,
      faceDetection: false,
      faceRecognition: false,
      videoStatus: 'play',
      payload: {
        url: 0,
        width: 480,
        height: 320
      },
      selectedCamera: {
        videoFeedUrl: 'https://picsum.photos/536/978'
      },
      showDialog: false,
      series: [75],

      slide: 1,
      selectedCameraID: 'noImage',
      autoplay: false,

      timestamp: '',
      date: '',
      time: '',
      settingsLoading: false,
      messages: false,
      cameraid: -1
    };
  },
  mounted() {
    // this.$gridlayout.load();
    for (var i = 0; i < this.cameras.length; i++) {
      this.addItem();
    }
    this.index = this.layout.length;
  },
  methods: {
    addItem: function() {
      // Add a new item. It must have a unique key!
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        w: 2,
        h: 5,
        i: this.index
      });
      // Increment the counter to ensure key is always unique.
      this.index++;
    },
    removeItem: function(val) {
      const index = this.layout.map(item => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },
    ...mapActions('VMS', [
      'addDevice',
      'removeDevice',
      'enableFaceRecognition',
      'enableFaceDetection',
      'pauseDevice',
      'updateMessage'
    ]),

    showCameraDialog(cameraId) {
      this.cameraDialog = true;
      this.cameraid = cameraId;
    },
    pauseFeed(camera) {
      this.videoStatus = 'pause';
      this.pauseDevice(camera);
    },
    palyFeed(camera) {
      this.videoStatus = 'play';
      this.addDevice(camera);
    },
    stopCamera(camera) {
      let index = this.cameras.findIndex(x => x.cameraId === camera);
      let previouseSlide;
      if (index != 0) {
        previouseSlide = this.cameras[index - 1].cameraId;
      } else {
        if (this.cameras.length == 1) {
          previouseSlide = 'noImage';
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
  computed: {
    ...mapState('VMS', [
      'cameras',
      'selectedCameraIndex',
      'devicesPerRow',
      'activeDevices',
      'url'
    ]),
    detection: {
      get() {
        let index = this.cameras.findIndex(
          x => x.cameraId === this.selectedCameraID
        );
        let selectedCamera = this.$store.getters['VMS/cameras'][index];
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
        this.$store.dispatch('VMS/updateFaceDetection', {
          index,
          value,
          cameraId: this.selectedCameraID
        });
      }
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
        // this.$store.commit("VMS/resetSelectedCameraIndex");
      }
    },

    // Set Carosel on first camera if no other exists
    cameras: function() {
      if (this.cameras.length > this.layout.length) {
        this.addItem();
      } else if (this.cameras.length < this.layout.length) {
        this.removeItem(this.layout.length - 1);
      }

      if (this.cameras.length == 1) {
        this.selectedCameraID = this.cameras[0].cameraId;
      }
    }
  }
};
</script>

<style>
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
/*************************************/
.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}
.vue-grid-layout {
  background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
