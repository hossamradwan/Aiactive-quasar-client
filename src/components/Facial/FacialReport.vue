<template>
  <div class="q-pa-md">
    <q-table :data="facialData" :columns="columns" row-key="name">
      <!-- @request="onRequest" -->
      <!-- :pagination.sync="paginationRename" -->
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
        <q-tr :props="props" class="cursor-pointer">
          <!-- Assigne the value of each record if it matches the column name -->
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size:15px"
            @click="props.expand = !props.expand"
          >
            <span v-if="col.name != 'Image'"> {{ col.value }}</span>

            <!-- Person Image -->
            <q-avatar v-if="col.name == 'Image'" size="50px" class="shadow-10">
              <!-- <img :src="props.row.path + '/' + props.row.source2" /> -->
              <img :src="col.value" />
            </q-avatar>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.name }}.
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- todo -->
    <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
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
      selected: [],
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
          name: "personName",
          label: this.$t("Name"),
          field: row => row.personName,
          style: "width: 5px"
        },
        {
          name: "Image",
          label: this.$t("Image"),
          field: "image",
          style: "width: 5px"
        },

        {
          name: "Date",
          label: this.$t("Date"),
          field: row => row.date,
          align: "center",
          sortable: true
        },
        {
          name: "arrivalTime",
          label: this.$t("Arrival Time"),
          field: row => row.arrivalTime,
          align: "center",
          sortable: true
        },
        {
          name: "departuareTime",
          label: this.$t("Departure Time"),
          field: row => row.departuareTime,
          align: "center",
          sortable: true
        }
      ],
      facialData: [
        {
          id: 1,
          personName: "John Adams",
          image: "https://cdn.quasar.dev/logo/svg/quasar-logo.svg",
          date: "5/10/2020",
          arrivalTime: "10:15 am",
          departuareTime: "5:00 pm"
        },
        {
          id: 1,
          personName: "John Adams",
          image: "https://cdn.quasar.dev/logo/svg/quasar-logo.svg",
          date: "5/10/2020",
          arrivalTime: "10:15 am",
          departuareTime: "5:00 pm"
        },
        {
          id: 1,
          personName: "John Adams",
          image: "https://cdn.quasar.dev/logo/svg/quasar-logo.svg",
          date: "5/10/2020",
          arrivalTime: "10:15 am",
          departuareTime: "5:00 pm"
        },
        {
          id: 1,
          personName: "John Adams",
          image: "https://cdn.quasar.dev/logo/svg/quasar-logo.svg",
          date: "5/10/2020",
          arrivalTime: "10:15 am",
          departuareTime: "5:00 pm"
        },
        {
          id: 1,
          personName: "John Adams",
          image: "https://cdn.quasar.dev/logo/svg/quasar-logo.svg",
          date: "5/10/2020",
          arrivalTime: "10:15 am",
          departuareTime: "5:00 pm"
        }
      ]
    };
  },

  methods: {
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

  computed: {}
};
</script>
