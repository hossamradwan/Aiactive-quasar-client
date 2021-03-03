<template>
  <div class="q-pa-sm" style="max-width: 300px">
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
import { mapActions } from "vuex";

export default {
  props: ["moduleName"],
  data() {
    return {
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
  computed: {},
  components: {
    "new-person-dialog": require("components/Facial/Modals/NewPersonDialog")
      .default
  }
};
</script>
