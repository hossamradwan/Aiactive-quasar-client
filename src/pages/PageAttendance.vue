<template>
  <q-page padding>
    <q-card class="settings-tabs">
      <q-tabs
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

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="report">
          <attendance-report />
        </q-tab-panel>

        <q-tab-panel name="record" class="column content-center">
          <!-- src="https://placeimg.com/500/300/natszure" -->
          <q-img
            src="http://196.219.234.3:5006/video_feed/0"
            :ratio="1"
            style=" height: 700px; max-width: 600px"
          >
            <template v-slot:error>
              <div
                class="absolute-full flex flex-center bg-negative text-white"
              >
                Cannot load image
              </div>
            </template>
            <q-card
              class="my-card fixed-bottom"
              flat
              bordered
              style=" height: 200px; max-width: 600px"
            >
              <q-card-section horizontal>
                <q-avatar
                  rounded
                  size="150px"
                  font-size="82px"
                  color="teal"
                  text-color="white"
                >
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>

                <q-card-actions vertical class="justify-around q-px-md">
                  <div>Name: John Adams</div>
                  <div>Email: email@email.com</div>
                  <div>Phone: 01013519856</div>
                  <div>Message: Delivered</div>
                </q-card-actions>
              </q-card-section>
            </q-card>
          </q-img>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "PageSettings",
  data() {
    return {
      tab: "record"
    };
  },
  components: {
    "attendance-report": require("components/Attendance/AttendanceReport")
      .default,
    "devices-settings": require("components/Settings/DevicesSettings/DevicesSettings")
      .default
  }
};
</script>
