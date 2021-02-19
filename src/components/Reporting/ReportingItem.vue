<template>
  <div :key="renderComponent" class="q-mt-lg">
    <q-list
      bordered
      v-for="lpr in reportingData"
      :key="lpr.id"
      class="q-ma-md card-style"
    >
      <q-item class="card-style">
        <!-- Select Checkbox -->
        <q-item-section avatar>
          <q-checkbox v-model="selection" :val="lpr.id" />
        </q-item-section>

        <!-- Module Icon -->
        <q-item-section avatar> </q-item-section>
        <q-item-section avatar>
          <q-icon name="speed" color="teal" size="34px" />
        </q-item-section>

        <!-- Item Data -->
        <q-item-section>
          <q-item-label lines="1" class="text-weight-bold">
            <span class="q-pa-lg">{{ lpr.id }}</span>
            <span class="q-pa-lg">{{ lpr.plate_number }}</span>
            <span class="q-pa-lg">{{ lpr.country }}</span>
            <span class="q-pa-lg">{{ lpr.date_time }}</span>
            <span class="q-pa-lg"> {{ lpr.speed / 100 }} KM/h </span>
          </q-item-label>
        </q-item-section>

        <!-- Violation Type -->
        <q-item-section side>
          <q-item-label lines="1" class="text-weight-bold text-teal">
            <span class="q-pa-lg">Speed Violation</span>
          </q-item-label>
        </q-item-section>

        <!-- Action Buttons -->
        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <!-- Print Button -->
            <q-btn
              class=""
              size="12px"
              flat
              dense
              round
              icon="print"
              @click="PDF(lpr, false, true)"
            />

            <!-- Download Button -->
            <q-btn
              class=""
              size="12px"
              flat
              dense
              round
              icon="get_app"
              @click="PDF(lpr, true, false)"
            />

            <!-- Unconfirm Button -->
            <!-- <q-btn class="" size="12px" flat dense round icon="undo" /> -->
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- PDF Modal -->
    <vue-html2pdf
      :show-layout="controlValue.showLayout"
      :float-layout="controlValue.floatLayout"
      :enable-download="controlValue.enableDownload"
      :preview-modal="controlValue.previewModal"
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
          sortable: true,
          style: "background-color:#ddd ; font-weight: bold;"
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
          label: this.$t("Date"),
          field: row => row.date_time,
          align: "center",
          sortable: true
        },
        {
          name: "Speed",
          label: this.$t("Speed"),
          field: row => row.speed,
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
      progress: 0,
      generatingPdf: false,
      pdfDownloaded: false,
      controlValue: {
        showLayout: false,
        floatLayout: true,
        enableDownload: false,
        previewModal: false,
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
    ...mapActions("reporting", [
      "setSelectedData",
      "setViolationToPrint",
      "setPrintViolationDialog",
      "clearViolationToPrint"
    ]),

    select(reportId) {
      let action = this.selectedData_id.includes(reportId) ? "remove" : "add";

      this.setSelectedData({
        action,
        id: reportId
      });
    },

    // PDF Options (Download Or View)
    PDF_Options(download = false, view = true) {
      this.controlValue.previewModal = view;
      this.controlValue.enableDownload = download;
    },

    // PDF Viewer/Downloader
    async PDF(report, download = false, view = true) {
      await this.PDF_Options(download, view);
      if (report != "MultiplePages") {
        this.controlValue.filename =
          report.date_time + report.id + report.plate_number;

        this.setViolationToPrint(report.id);
      }

      this.$refs.html2Pdf.generatePdf();
    },

    printAll(download = false, view = true) {
      // Add Selected Reports to State
      this.selection.map(id => {
        this.setViolationToPrint(id);
      });

      // PDF View
      this.controlValue.filename = "MultiplePages";
      this.PDF("MultiplePages", download, view);
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
    selection: function() {
      this.setSelectedData({ action: "removeAll" });
      this.selection.map(id => {
        this.select(id);
      });
    },
    violationToPrint: async function() {
      if (this.violationToPrint.length > 1) {
        if (this.downloadAll) {
          await this.PDF_Options(true, false);
        } else {
          await this.PDF_Options(false, true);
        }
        this.$refs.html2Pdf.generatePdf();
      }
    },
    selectedData: function() {
      if (this.selectedData.length == 0 && this.selection.length > 0) {
        this.selection = [];
      }
    }
  },
  computed: {
    ...mapState("reporting", [
      "reportingData",
      "selectedData",
      "violationToPrint",
      "downloadAll"
    ]),
    ...mapGetters("reporting", ["selectedData_id"])
  }
};
</script>
