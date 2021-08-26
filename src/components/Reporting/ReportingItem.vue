<template>
  <div :key="renderComponent" class="q-mt-lg">
    <q-table
      :data="reportingData"
      :columns="columns"
      selection="multiple"
      :selected.sync="selection"
    >
      <template v-slot:header-cell="props">
        <q-th :props="props">
          <!-- Header Print Button -->
          <q-btn
            v-if="props.col.name == 'actionButtons' && selection.length > 1"
            class=""
            size="12px"
            flat
            dense
            round
            icon="print"
            @click="PDF('MultiplePages', false, true)"
          />

          <!-- Header Download Button -->
          <q-btn
            v-if="props.col.name == 'actionButtons' && selection.length > 1"
            class=""
            size="12px"
            flat
            dense
            round
            icon="get_app"
            @click="PDF('MultiplePages', true, false)"
          />
          {{ props.col.label }}
        </q-th>
      </template>
      <!-- Table Body -->
      <template v-slot:body="props">
        <q-tr :props="props" class="cursor-pointer">
          <q-td style="font-size:15px">
            <q-checkbox dense v-model="props.selected" />
          </q-td>
          <!-- Assigne the value of each record if it matches the column name -->
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size:15px"
          >
            <span v-if="col.name != 'actionButtons' && col.name != 'Color'">
              {{ col.value }}</span
            >

            <q-badge
              v-if="col.name == 'Color' && col.value != '$color$'"
              :color="col.value != 'white' ? col.value : 'black'"
            >
              {{ col.value }}
            </q-badge>

            <!-- Single Action Buttons -->
            <!-- Single Print Button -->
            <q-btn
              v-if="col.name == 'actionButtons'"
              class=""
              size="12px"
              flat
              dense
              round
              icon="print"
              @click="PDF(props.row, false, true)"
            />

            <!-- Single Download Button -->
            <q-btn
              v-if="col.name == 'actionButtons'"
              class=""
              size="12px"
              flat
              dense
              round
              icon="get_app"
              @click="PDF(props.row, true, false)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- PDF Modal -->
    <vue-html2pdf
      :float-layout="controlValue.floatLayout"
      :preview-modal="controlValue.previewModal"
      :show-layout="controlValue.showLayout"
      :enable-download="controlValue.enableDownload"
      :filename="controlValue.filename"
      :paginate-elements-by-height="controlValue.paginateElementsByHeight"
      :pdf-quality="controlValue.pdfQuality"
      :pdf-format="controlValue.pdfFormat"
      :pdf-orientation="controlValue.pdfOrientation"
      :pdf-content-width="controlValue.pdfContentWidth"
      :manual-pagination="controlValue.manualPagination"
      @progress="onProgress($event)"
      @startPagination="startPagination()"
      @hasPaginated="hasPaginated()"
      @beforeDownload="beforeDownload($event)"
      @hasDownloaded="hasDownloaded($event)"
      ref="html2Pdf"
    >
      <!-- Printed Section -->
      <PrintModal slot="pdf-content" />
    </vue-html2pdf>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import VueHtml2pdf from "vue-html2pdf";
export default {
  data() {
    return {
      selection: [],
      renderComponent: 0,
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
          format: val => `${val.match(/.([٠-٩])+|([أ-ى-آ])/g).join(" ")}`,
          sortable: true
        },
        {
          name: "Country",
          label: this.$t("Country"),
          field: row => row.country,
          align: "center",
          sortable: true
        },
        {
          name: "Date_Time",
          label: this.$t("Time"),
          field: row => row.date_time.split(",")[1],
          align: "center",
          sortable: true
        },
        {
          name: "Speed",
          label: this.$t("Speed"),
          field: row => row.speed / 100,
          format: val => (val ? val + " km/h" : null),
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
          format: val => (val != "MODEL" ? val : null),
          align: "center",
          sortable: true
        },
        {
          name: "Color",
          label: this.$t("Color"),
          field: row => row.color.toLowerCase(),
          align: "center",
          sortable: true
        },
        {
          name: "actionButtons",
          align: "center"
        }
      ],
      progress: 0,
      generatingPdf: false,
      pdfDownloaded: false,

      controlValue: {
        floatLayout: true,
        floatLayoutt: false,
        previewModal: false,
        previewModall: false,
        showLayout: false,
        enableDownload: false,
        paginateElementsByHeight: 1100,
        manualPagination: false,
        filename: "IndexFile",
        pdfQuality: 2,
        pdfFormat: "a4",
        pdfOrientation: "portrait",
        pdfContentWidth: "800px"
      }
    };
  },

  components: {
    PrintModal: require("components/Reporting/Modals/Shared/ModalViolationContent")
      .default,
    VueHtml2pdf
  },

  methods: {
    getSelectedString() {
      return this.selection.length === 0
        ? ""
        : `${this.selection.length} record${
            this.selection.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },
    ...mapActions("reporting", [
      "setSelectedData",
      "setViolationToPrint",
      "setPrintViolationDialog",
      "clearViolationToPrint"
    ]),

    // PDF Options (Download Or View)
    PDF_Options(download = false, view = true) {
      this.controlValue.previewModal = view;
      this.controlValue.enableDownload = download;
    },

    // PDF Viewer/Downloader
    async PDF(report, download = false, view = true) {
      await this.PDF_Options(download, view);
      if (report == "MultiplePages") {
        console.log("multiii");
        // Add Selected Reports to State
        this.selection.map(selected => {
          this.setViolationToPrint(selected.id);
        });

        // PDF View
        this.controlValue.filename = "MultiplePages";
      } else {
        console.log("report.id:", report.id);
        this.controlValue.filename =
          report.date_time + report.id + report.plate_number;
        this.setViolationToPrint(report.id);
      }
      await this.$refs.html2Pdf.generatePdf();
      // this.setSelectedData({ action: "removeAll" });
    },

    /* Printing Actions */
    onProgress(progress) {
      this.progress = progress;
      // console.log(`PDF generation progress: ${progress}%`);
    },
    startPagination() {
      // console.log(`PDF has started pagination`);
    },
    hasPaginated() {
      // console.log(`PDF has been paginated`);
    },
    async beforeDownload() {
      // console.log(`On Before PDF Generation`);
    },
    hasDownloaded(blobPdf) {
      // console.log(`PDF has downloaded`);
      this.pdfDownloaded = true;

      // console.log(blobPdf);
      // todo: find suitable place
      this.clearViolationToPrint();
      this.PDF_Options(false, false);
    }
  },
  watch: {
    // selection: function() {
    //   this.setSelectedData({ action: "removeAll" });
    //   this.selection.map(selected => {
    //     this.select(selected.id);
    //   });
    // },
    // selectedData: function() {
    //   if (this.selectedData.length == 0 && this.selection.length > 0) {
    //     this.selection = [];
    //   }
    // }
  },
  computed: {
    ...mapState("reporting", [
      "reportingData",
      // "selectedData",
      "violationToPrint",
      "downloadAll"
    ]),
    ...mapGetters("reporting", ["selectedData_id"])
  }
};
</script>
