<template>
  <q-page padding>
    <!-- ToolBar  -->
    <tool-bar :moduleName="moduleName" />
    <q-card class="settings-tabs">
      <!-- TABS -->
      <!-- <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="report" icon="fas fa-users-cog" :label="$t('Report')" />

        <q-tab name="record" icon="device_hub" :label="$t('Record')" />
      </q-tabs>

      <q-separator /> -->

      <q-tab-panels v-model="tab" animated>
        <!-- Report Tab Container -->
        <q-tab-panel name="report">
          <facial-report />
        </q-tab-panel>

        <!-- Record Tab Container -->
        <q-tab-panel name="record">
          <facial-record />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "PageFacial",

  data() {
    return {
      moduleName: "facial-module",

      tab: "record",
      slide: 1,
      autoplay: false,
      images: [
        "https://cdn.quasar.dev/img/mountains.jpg",
        "https://cdn.quasar.dev/img/material.png",
        "https://cdn.quasar.dev/img/donuts.png",
        "https://cdn.quasar.dev/img/cat.jpg",
        "https://cdn.quasar.dev/img/linux-avatar.png"
      ],
      arr1: [],
      arr2: [],

      timestamp: ""
    };
  },
  mounted() {
    this.arr1 = this.images.slice(0, 4);
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
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
    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

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
  components: {
    "tool-bar": require("components/Shared/Lpr/Toolbar/Toolbar").default,
    "facial-report": require("components/Facial/FacialReport").default,
    "facial-record": require("components/Facial/FacialRecord").default
  }
};
</script>
