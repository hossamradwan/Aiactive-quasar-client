<template>
  <div class="q-pa-sm" style="max-width: 300px">
    <!-- Layout Slider -->
    <q-btn color="primary" :label="devicesPerRow + ' devices per row'">
      <q-menu transition-show="jump-down" transition-hide="jump-up">
        <q-list style="min-width: 200px ">
          <q-item class="q-pt-lg">
            <q-item-section>
              <q-slider
                v-model="devicesPerRow"
                snap
                label
                label-always
                markers
                :min="1"
                :step="1"
                :max="cameras.length"
            /></q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <!-- Button Add New Person -->
    <q-btn icon="person_add" round color="primary">
      <q-menu fit anchor="center right" self="center left">
        <q-item>
          <q-item-section> <new-person-dialog /> </q-item-section
        ></q-item>
      </q-menu>
    </q-btn>

    <!-- Button Add New Camera -->
    <q-btn color="primary" icon="video_call" round>
      <!-- Dialoge Add New Camera  -->
      <q-menu fit anchor="center right" self="center left">
        <q-item>
          <q-item-section
            ><q-input outlined v-model="payload.url" label="url" clearable />
            <q-input outlined v-model="payload.width" label="width" clearable />
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
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["moduleName"],
  data() {
    return {
      standard: 1,

      showDialog: false,
      payload: {
        url: 0,
        width: 480,
        height: 320
      }
    };
  },
  watch: {},
  methods: {
    ...mapActions("facialCamera", ["addDevice"])
  },
  mounted() {},
  computed: {
    ...mapState("facialCamera", ["cameras", "devicesPerRow"]),
    devicesPerRow: {
      get() {
        return this.$store.getters["facialCamera/devicesPerRow"];
      },
      set(value) {
        this.$store.commit("facialCamera/updateDevicesPerRow", value);
      }
    }
  },
  components: {
    "new-person-dialog": require("components/Facial/Modals/NewPersonDialog")
      .default
  }
};
</script>
