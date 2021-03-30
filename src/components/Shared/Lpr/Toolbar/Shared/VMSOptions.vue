<template>
  <div class="q-pa-sm" style="max-width: 300px">
    <!-- Layout Options -->
    <q-select
      :label="$t('LayoutOptions')"
      v-model="devicesPerRow"
      :options="gridOptions"
      dense
      borderless
      map-options
      options-dense
      style="min-width: 150px"
      emit-value
      v-if="gridOptions.length > 0"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["moduleName"],
  data() {
    return {
      standard: 1,
      gridOptions: [
        {
          label: "1x1",
          value: 1
        },
        // {
        //   label: "2x1",
        //   value: 2
        // },
        {
          label: "2x2",
          value: 4
        },
        {
          label: "3x3",
          value: 9
        },
        {
          label: "4x4",
          value: 16
        }
      ],
      showDialog: false,
      payload: {
        url: 0,
        width: 480,
        height: 320
      }
    };
  },
  watch: {
    cameras: function() {
      this.layoutOptions();
    }
  },
  methods: {
    ...mapActions("VMS", ["addDevice"]),
    // Dynamic options depending on available cameras
    layoutOptions() {
      // this.gridOptions = [];
      // for (let i = 1; i <= this.cameras.length; i++) {
      //   if (12 % i == 0) {
      //     let round = Math.ceil(this.cameras.length / i);
      //     this.gridOptions.push({
      //       label: i + "x" + round,
      //       value: i
      //     });
      //   }
      // }
    }
  },
  mounted() {
    this.layoutOptions();
  },
  computed: {
    ...mapState("VMS", ["cameras", "devicesPerRow"]),
    devicesPerRow: {
      get() {
        return this.$store.getters["VMS/devicesPerRow"];
      },
      set(value) {
        this.$store.commit("VMS/updateDevicesPerRow", value);
      }
    }
  },
  components: {}
};
</script>
