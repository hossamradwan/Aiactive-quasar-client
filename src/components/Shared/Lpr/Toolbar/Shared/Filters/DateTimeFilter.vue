<template>
  <div class="column items-center filter">
    <div class="text-h6 text-center q-mb-md">Date Time</div>

    <div class="q-pa-md">
      <div class="q-mb-sm">
        <q-badge color="teal"> From: {{ date }} - {{ time }} </q-badge>
      </div>

      <div class="q-mb-sm text-center">
        <q-btn icon="event" round color="primary" class="q-ma-sm">
          <q-popup-proxy
            @before-show="updateProxyDate"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="proxyDate">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn
                  label="OK"
                  color="primary"
                  flat
                  @click="saveDate"
                  v-close-popup
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>

        <q-btn icon="access_time" round color="primary" class="q-ma-sm">
          <q-popup-proxy
            @before-show="updateProxyTime"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time v-model="proxyTime">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn
                  label="OK"
                  color="primary"
                  flat
                  @click="saveTime"
                  v-close-popup
                />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>

    <filter-actions />
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "2019/03/01",
      time: "10:56",
      proxyDate: "2019/03/01",
      proxyTime: "10:56"
    };
  },

  methods: {
    updateProxyDate() {
      this.proxyDate = this.date;
    },

    updateProxyTime() {
      this.proxyTime = this.time;
    },

    saveDate() {
      this.date = this.proxyDate;
    },

    saveTime() {
      this.time = this.proxyTime;
    }
  },
  components: {
    "filter-actions": require("./FiltersActions/ActionButtons").default
  }
};
</script>

<style lang="scss" scoped>
.filter {
  justify-content: center;
}
</style>
