<template>
  <div>
    <div v-if="primarySourceType == 'video'" class="video-preview">
      <video
        ref="videoRef"
        src=""
        id="video-container"
        @click="openImageModal"
        height="146px"
        width="100%"
        controls
      ></video>
    </div>

    <vue-load-image v-else class="cursor-pointer">
      <img
        slot="image"
        :src="primarySource"
        @click="openImageModal"
        class="images-preview"
      />

      <q-spinner-puff
        class="q-mt-sm images-preview"
        color="teal-3"
        slot="preloader"
        size="4rem"
        thickness="2"
      />

      <img
        slot="error"
        src="~/assets/new-logo11.png"
        @click="openImageModal"
        class="images-preview"
      />
    </vue-load-image>

    <q-dialog v-model="carousel">
      <div style="padding: 0px;">
        <v-zoomer-gallery
          ref="gallery"
          class="images-modal"
          :list="carouselImagesList"
          v-model="selIndex"
        ></v-zoomer-gallery>
        <div style="box-sizing: border-box; height: 32px; padding: 4px;">
          <button :disabled="selIndex === 0" @click="selIndex -= 1">
            &lt;-
          </button>
          <span>{{ selIndex + 1 }} / {{ carouselImagesList.length }}</span>
          <button
            :disabled="selIndex === carouselImagesList.length - 1"
            @click="selIndex += 1"
          >
            -&gt;
          </button>
          <button @click="$refs.gallery.reset()">reset</button>
          <button @click="$refs.gallery.zoomIn()">+</button>
          <button @click="$refs.gallery.zoomOut()">-</button>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import VueLoadImage from "vue-load-image";
export default {
  props: ["lprImages", "moduleName", "deviceNumber"],
  data() {
    return {
      sourceData: {
        path: "",
        source1: "",
        source2: "",
        source3: "",
        source4: "",
        source5: "",
        source6: "",
        source7: "",
        source8: ""
      },
      primarySourceType: "image",
      primarySource: "",
      showImages: false,
      selIndex: 0,
      carousel: false,
      notFoundImage: "./static/Logo_2020.png"
    };
  },
  components: {
    "vue-load-image": VueLoadImage
  },
  methods: {
    openImageModal() {
      this.carousel = true;
    },
    getFileExt(fileName) {
      return fileName.split(".").pop();
    },
    checkImage(src, good, bad) {
      var img = new Image();
      img.onload = good;
      img.onerror = bad;
      img.src = src;
    }
  },
  mounted() {
    if (
      this.moduleName == "generic-lpr-module" ||
      this.moduleName == "match-module"
    ) {
      this.sourceData.path = this.lprImages.path;
      this.sourceData.source1 = this.lprImages.source1;
      this.sourceData.source2 = this.lprImages.source2;
      this.sourceData.source3 = this.lprImages.source3;
      this.sourceData.source4 = this.lprImages.source4;
      this.sourceData.source5 = this.lprImages.source5;
      this.sourceData.source6 = this.lprImages.source6;
      this.sourceData.source7 = this.lprImages.source7;
      this.sourceData.source8 = this.lprImages.source8;
    } else if (this.moduleName == "average-speed-module") {
      if (this.deviceNumber == "device_one") {
        this.sourceData.path = this.lprImages.device_one_path;
        this.sourceData.source1 = this.lprImages.source1_1;
        this.sourceData.source2 = this.lprImages.source1_2;
        this.sourceData.source3 = this.lprImages.source1_3;
        this.sourceData.source4 = this.lprImages.source1_4;
        this.sourceData.source5 = this.lprImages.source1_5;
        this.sourceData.source6 = this.lprImages.source1_6;
        this.sourceData.source7 = this.lprImages.source1_7;
        this.sourceData.source8 = this.lprImages.source1_8;
      } else {
        this.sourceData.path = this.lprImages.device_two_path;
        this.sourceData.source1 = this.lprImages.source2_1;
        this.sourceData.source2 = this.lprImages.source2_2;
        this.sourceData.source3 = this.lprImages.source2_3;
        this.sourceData.source4 = this.lprImages.source2_4;
        this.sourceData.source5 = this.lprImages.source2_5;
        this.sourceData.source6 = this.lprImages.source2_6;
        this.sourceData.source7 = this.lprImages.source2_7;
        this.sourceData.source8 = this.lprImages.source2_8;
      }
    }
    // getting primary source type
    let primarysrc = this.getFileExt(this.sourceData.source1);

    if (primarysrc == "avi") {
      let fileName = this.sourceData.source1.split(".")[0];
      fileName = `${this.sourceData.path}/${fileName}.mp4`;

      this.primarySourceType = "video";

      this.$nextTick(() => {
        this.$refs.videoRef.src = fileName;
        //this.$refs.videoRef.play();
      });
    } else {
      //`./ftp/0c4aa695-4793-f015-8280-e0071b8a07c3_1.jpeg`
      this.primarySource = `${this.sourceData.path}/${this.sourceData.source1}`;
    }
  },
  computed: {
    carouselImagesList() {
      const notFoundImage = this.notFoundImage;
      let primarySrcType = this.getFileExt(this.sourceData.source1);

      let carouselImagesList = [];
      // let imagesSources = [
      //   `${this.sourceData.path}/${this.sourceData.source1}`,
      //   `${this.sourceData.path}/${this.sourceData.source2}`,
      //   `${this.sourceData.path}/${this.sourceData.source3}`,
      //   `${this.sourceData.path}/${this.sourceData.source4}`,
      //   `${this.sourceData.path}/${this.sourceData.source5}`,
      //   `${this.sourceData.path}/${this.sourceData.source6}`,
      //   `${this.sourceData.path}/${this.sourceData.source7}`,
      //   `${this.sourceData.path}/${this.sourceData.source8}`
      // ];
      let imagesSources = [
        `${this.sourceData.source1}`,
        `${this.sourceData.source2}`,
        `${this.sourceData.source3}`,
        `${this.sourceData.source4}`,
        `${this.sourceData.source5}`,
        `${this.sourceData.source6}`,
        `${this.sourceData.source7}`,
        `${this.sourceData.source8}`
      ];

      if (primarySrcType == "avi") {
        imagesSources.shift(); // remove frist element from carousal array
      }

      imagesSources.forEach(image => {
        image = `${this.sourceData.path}/${image}`
        this.checkImage(
          image,
          function() {
            carouselImagesList.push(image);
          },
          function() {
            //console.log('not found')
            //carouselImagesList.push(notFoundImage);
          }
        );
      });
      //console.log(imagesSources);
      return carouselImagesList;
    }
  }
};
</script>

<style lang="scss" scoped>
.images-preview {
  width: 315px;
  height: 146px;
  object-fit: cover;
}

.video-preview {
  margin-bottom: 47px;
  width: 315px;
  height: 104px;
  object-fit: cover;
}

.images-modal {
  min-width: 560px !important;
  min-height: 400px !important;
}
</style>
