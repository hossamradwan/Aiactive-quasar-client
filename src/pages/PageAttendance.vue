<template>
  <q-page padding>
    <q-card class="settings-tabs">
      <!-- TABS -->
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
        <!-- Report Tab Container -->
        <q-tab-panel name="report">
          <attendance-report />
        </q-tab-panel>

        <!-- Record Tab Container -->
        <q-tab-panel name="record" class="fit column   ">
          <!-- Row 1 -->
          <div class="full-width row  justify-between  ">
            <!-- Row 1 > Column 1 -->
            <h5>{{ timestamp }}</h5>

            <!-- Row 1 > Column 2 -->
            <div style="overflow: auto;min-height: 110px;  ">
              <div class="fit row">
                <apexchart
                  type="radialBar"
                  height="100"
                  width="60"
                  :options="chartOptions"
                  :series="series"
                />
                <apexchart
                  type="radialBar"
                  height="100"
                  width="60"
                  :options="chartOptions"
                  :series="series"
                />
                <apexchart
                  type="radialBar"
                  height="100"
                  width="60"
                  :options="chartOptions"
                  :series="series"
                />
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="col-7">
            <div class="fit   row  justify-between ">
              <!-- Row 2 > Column 1 -->
              <q-carousel
                v-model="slide"
                vertical
                transition-prev="slide-up"
                transition-next="slide-down"
                animated
                swipeable
                height=" 450px"
                :autoplay="autoplay"
                infinite
                class="col-2 overflow-hidden "
                style="overflow: auto;"
              >
                <q-carousel-slide :name="1" class="row no-wrap">
                  <div
                    class="column fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                  >
                    <q-img
                      v-for="image in arr1"
                      :key="image.index"
                      class="rounded-borders  "
                      style="height: 200px; max-width: 300px"
                      :src="image"
                    />
                  </div>
                </q-carousel-slide>
                <q-carousel-slide :name="2" class="row no-wrap">
                  <div
                    class="column fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                  >
                    <q-img
                      v-for="image in arr2"
                      :key="image.index"
                      class="rounded-borders  "
                      style="height: 200px; max-width: 300px"
                      :src="image"
                    />
                  </div>
                </q-carousel-slide>
              </q-carousel>

              <!-- Record Video Stream -->
              <!-- Row 2 > Column 2 -->
              <!-- src="http://196.219.234.3:5006/video_feed/0" -->
              <q-img
                src="https://placeimg.com/500/300/any"
                :ratio="1"
                style="overflow: auto; height: 450px; max-width: 300px"
                class="col-7"
              >
                <template v-slot:error>
                  <div
                    class="absolute-full flex flex-center bg-negative text-white"
                  >
                    Cannot load image
                  </div>
                </template>
                <!--       <q-card
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
            </q-card> -->
              </q-img>

              <!-- Row 2 > Column 3 -->
              <div class="col-2" style="overflow: auto;">
                <q-btn label="Add" color="warning" @click="push" />
              </div>
            </div>
          </div>
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
      series: [75],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          }
        },
        title: {
          text: "Radial Bar",
          align: "left",
          style: {
            color: "#FFF"
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#424242",
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#424242",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                formatter: function(val) {
                  return val + "%";
                },
                color: "#FFF",
                fontSize: "15px",
                show: true,
                offsetY: 5
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#FCCF31", "#FCCF31"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        }
      },
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
    "attendance-report": require("components/Attendance/AttendanceReport")
      .default,
    "devices-settings": require("components/Settings/DevicesSettings/DevicesSettings")
      .default
  }
};
</script>
