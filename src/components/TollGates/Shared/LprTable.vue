<template>
  <div class="q-pa-md">
    <q-table
      :data="lprData"
      :pagination.sync="paginationRename"
      :columns="columns"
      row-key="name"
      @request="onRequest"
    >
      <!-- Export Data -->
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>

      <!-- Table Header -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <!-- loop over data columns -->
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
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
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
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
              size="50px"
              class="shadow-10"
            >
              <img :src="props.row.path + '/' + props.row.source1" />
            </q-avatar>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Popup Dialoge -->
    <q-dialog v-model="carousel" class=" q-pa-md items-start q-gutter-md ">
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
          label: "ID",
          field: row => row.id,
          align: "left",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "Plate No.",
          required: true,
          label: "Plate No.",
          field: row => row.plate_number,
          align: "left",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "Plate_Image",
          label: "Plate Image",
          field: "plate_image",
          style: "width: 5px"
        },
        {
          name: "Date",
          label: "Date",
          field: row => row.date_time,
          align: "center",
          sortable: true
        },
        {
          name: "Brand",
          label: "Brand",
          field: row => row.brand,
          align: "center",
          sortable: true
        },
        {
          name: "Model",
          label: "Model",
          field: row => row.model,
          align: "center",
          sortable: true
        },
        {
          name: "Color",
          label: "Color",
          field: row => row.color,
          align: "center",
          sortable: true
        },

        {
          name: "Image",
          label: "Image",
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
      console.log("table triggered", props);
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
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
    ...mapState("lpr", ["lprData"]),

    ...mapGetters("lpr", ["paginationRename"])
  }
};
</script>
