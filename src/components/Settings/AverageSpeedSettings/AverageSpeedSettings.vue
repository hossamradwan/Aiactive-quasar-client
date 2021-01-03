<template>
  <div class="q-pa-md">
    <q-list padding bordered class="rounded-borders bg-grey-4">
      <q-btn
        outline
        rounded
        class="q-ml-md q-mt-sm bg-white"
        :label="$t('AddRoad')"
        icon="add"
        @click="addAverageSpeedModal = true"
      />
      <!-- Road -->
      <q-expansion-item
        v-for="(road, key) in averageSpeedSettings"
        :key="key"
        expand-separator
        class="q-ma-md"
        header-class=""
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="fas fa-road" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section>
            <span class="text-subtitle1">{{ Object.keys(road)[0] }}</span>
          </q-item-section>

          <q-item-section side>
            <div class="row items-cente">
              <q-btn
                class="q-ma-sm"
                size="sm"
                color="primary"
                round
                dense
                @click.stop="editAverageSpeedSettings(Object.keys(road)[0])"
                icon="edit"
              />
              <q-btn
                round
                dense
                @click.stop="removeAverageSpeedSettings(Object.keys(road)[0])"
                class="q-ma-sm"
                size="sm"
                color="accent"
                icon="remove"
              />
            </div>
          </q-item-section>
        </template>
        <!-- Trap -->
        <q-expansion-item
          v-for="(trap, key) in road[Object.keys(road)[0]]"
          :key="key"
          :header-inset-level="1"
          :content-inset-level="1"
          expand-separator
          icon="fas fa-map-marked-alt"
          :label="'Trap ' + trap.trap_number"
          default-closed
        >
          <q-card>
            <q-card-section>
              <div class="text-center">
                <div class="q-mt-lg text-h4 text-bold">
                  <q-chip>Point one</q-chip>
                </div>
                <div class="">
                  <q-chip
                    outline
                    v-for="(point, key) in JSON.parse(trap.point_one)"
                    :key="key + 'point_one'"
                    color="primary"
                    text-color="white"
                    icon="camera"
                  >
                    {{ point }}
                  </q-chip>
                </div>

                <div class="q-mt-xl">
                  <q-chip class="text-4 text-bold">Distance</q-chip>
                </div>
                <div class="row justify-center q-mt-sm">
                  <q-slider
                    :value="parseInt(trap.distance)"
                    :min="0"
                    :max="50000"
                    color="green"
                    label
                    vertical
                    :label-value="parseInt(trap.distance) + ' meter'"
                    label-always
                    disable
                  />
                </div>

                <div class="q-mt-xl text-h4 text-bold">
                  <q-chip>Point two</q-chip>
                </div>
                <div class="q-pa-md">
                  <q-chip
                    outline
                    v-for="(point, key) in JSON.parse(trap.point_two)"
                    :key="key + 'point_two'"
                    color="primary"
                    text-color="white"
                    icon="camera"
                  >
                    {{ point }}
                  </q-chip>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-expansion-item>
    </q-list>

    <!-- Add User Modal -->
    <q-dialog
      v-model="addAverageSpeedModal"
      @hide="addAverageSpeedModal = false"
    >
      <add-average-speed-road />
    </q-dialog>

    <!-- Edit User Modal -->
    <q-dialog
      v-model="editAverageSpeedModal"
      @hide="editAverageSpeedModal = false"
    >
      <edit-average-speed-road
        :averageSpeedRoadData="editAverageSpeedRoadData"
      />
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      editAverageSpeedRoadData: [],
      data: [
        {
          road_one: [
            {
              id: 20,
              trap_number: 1,
              point_one: [10415, 10416],
              point_two: [10417, 10418],
              distance: 3000
            },
            {
              id: 21,
              trap_number: 2,
              point_one: [10417, 10418],
              point_two: [10419],
              distance: 4000
            }
          ]
        }
      ]
    };
  },
  components: {
    "add-average-speed-road": require("./Modals/AddAverageSpeedRoad").default,
    "edit-average-speed-road": require("./Modals/EditAverageSpeedRoad").default
  },
  methods: {
    ...mapActions("averageSpeed", [
      "getAverageSpeedSettings",
      "editAverageSpeedSettings",
      "deleteAverageSpeedSettings",
      "setAddAverageSpeedModal",
      "setEditAverageSpeedModal"
    ]),
    editAverageSpeedSettings(averageSpeedRoadName) {
      this.editAverageSpeedModal = true;

      let found = this.averageSpeedSettings.find(
        element => Object.keys(element)[0] === averageSpeedRoadName
      );

      this.editAverageSpeedRoadData = found;
      //console.log('match found', found);
    },
    removeAverageSpeedSettings(averageSpeedRoadName) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to Delete this Average Speed Road?",
          cancel: true
          //persistent: true
        })
        .onOk(() => {
          this.deleteAverageSpeedSettings(averageSpeedRoadName);
          //console.log('confiremed', averageSpeedRoadName);
        });
    }
  },
  mounted() {
    this.getAverageSpeedSettings();
  },
  computed: {
    ...mapState("averageSpeed", ["averageSpeedSettings"]),
    ...mapGetters("averageSpeed", [
      "showAddAverageSpeedModal",
      "showEditAverageSpeedModal"
    ]),
    addAverageSpeedModal: {
      get() {
        return this.showAddAverageSpeedModal;
      },
      set(value) {
        this.setAddAverageSpeedModal(value);
      }
    },
    editAverageSpeedModal: {
      get() {
        return this.showEditAverageSpeedModal;
      },
      set(value) {
        this.setEditAverageSpeedModal(value);
      }
    }
  },
  filters: {}
};
</script>
<style lang="scss">
.users-table thead,
tr {
  background-color: #adadad2b;
}
</style>
