<template>
  <div class="q-pa-md">
    <!-- Hide Images Column if path = /gatesModule -->
    <q-table
      :data="lprData"
      :pagination.sync="paginationRename"
      :columns="
        $route.path != '/gatesModule' ? columns.concat(imageCol) : columns
      "
      row-key="name"
      @request="onRequest"
    >
      <!-- Export Data -->
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          :label="$t('ExportCSV')"
          no-caps
          @click="exportTable"
        />
      </template>

      <!-- Table Header -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <!-- loop over data columns -->
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size: 15px"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <!-- Table Body -->
      <template v-slot:body="props">
        <q-tr
          :props="props"
          class="cursor-pointer"
          @click="setCarousel(props.row)"
        >
          <!-- Assigne the value of each record if it matches the column name -->
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size:15px"
          >
            <span v-if="col.name != 'Image' && col.name != 'Plate_Image'">
              {{ col.value }}</span
            >

            <!-- Person Image -->
            <q-avatar v-if="col.name == 'Image'" size="50px" class="shadow-10">
              <img :src="props.row.path + '/' + props.row.source2" />
            </q-avatar>

            <!-- Plate Image -->
            <q-avatar
              v-if="col.name == 'Plate_Image'"
              size="70px"
              square
              class="shadow-10 plate-image"
            >
              <img :src="props.row.path + '/' + props.row.source2" />
            </q-avatar>

            <!-- car Image -->
            <q-avatar
              v-if="col.name == 'Vehicle_Image'"
              size="70px"
              square
              class="shadow-10 plate-image"
            >
              <img :src="props.row.path + '/' + props.row.source1" />
            </q-avatar>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Popup Dialoge -->
    <q-dialog v-model="carousel">
      <popupModal :activeCarousel="activeCarousel" />
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import { exportFile } from "quasar";
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}
export default {
  data() {
    return {
      carousel: false,
      activeCarousel: [],
      columns: [
        {
          name: "ID",
          required: true,
          label: this.$t("ID"),
          field: row => row.id,
          align: "left",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "Plate No.",
          required: true,
          label: this.$t("PlateNo"),
          field: row => row.plate_number,
          align: "center",
          format: val => {
            // todo: Fix AIActive LPR UNICODE chars of empty plate
            if (val == "‭‬" || val == null) {
              return "N/A";
            } else {
              return val.split("").join(" ");
            }
          },

          sortable: true,
          style: "background-color:#ddd ; font-weight: bold;"
        },
        {
          name: "Plate_Image",
          label: this.$t("PlateImage"),
          field: "plate_image",
          style: "width: 5px"
        },
        {
          name: "Vehicle_Image",
          label: this.$t("vehicleImage"),
          field: "vehicle_image",
          style: "width: 5px"
        },
        {
          name: "Date",
          label: this.$t("Date"),
          field: row => row.date_time,
          align: "center",
          sortable: true
        },
        {
          name: "Brand",
          label: this.$t("Brand"),
          field: row => row.brand,
          align: "center",
          sortable: true
        },
        {
          name: "Model",
          label: this.$t("Model"),
          field: row => row.model,
          align: "center",
          sortable: true
        },
        {
          name: "Color",
          label: this.$t("Color"),
          field: row => row.color,
          align: "center",
          sortable: true
        }
      ],
      imageCol: [
        {
          name: "Image",
          label: this.$t("Image"),
          field: "image",
          style: "width: 5px"
        }
      ]
    };
  },

  components: {
    popupModal: require("./TablePopupModal").default
  },

  methods: {
    ...mapActions("lpr", ["setPagination"]),

    setCarousel(data) {
      this.activeCarousel = data;
      this.carousel = true;
    },

    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      let rowsNumber = this.paginationRename.rowsNumber;

      this.setPagination({
        page: page,
        limit: rowsPerPage
      });
    },

    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.lprData.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    }
  },

  computed: {
    ...mapGetters("lpr", ["sortedTransits", "paginationRename"]),

    lprData() {
      return this.sortedTransits;
    }
  }
};
</script>
<style scoped>
.plate-image {
  height: 40px;
}
</style>
