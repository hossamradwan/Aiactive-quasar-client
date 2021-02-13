<template>
  <div :key="renderComponent" class="q-mt-lg">
    <q-list
      bordered
      v-for="lpr in reportingData"
      :key="lpr.id"
      class="q-ma-md card-style"
    >
      <q-item class="card-style">
        <q-item-section avatar>
          <q-icon name="speed" color="teal" size="34px" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="text-weight-bold">
            <span class="q-pa-lg">{{ lpr.id }}</span>
            <span class="q-pa-lg">{{ lpr.plate_number }}</span>
            <span class="q-pa-lg">{{ lpr.country }}</span>
            <span class="q-pa-lg">{{ lpr.date_time }}</span>
            <span class="q-pa-lg"> {{ lpr.speed / 100 }} KM/h </span>
          </q-item-label>
        </q-item-section>

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
              @click="PDF(lpr.id, 0, 1)"
            />
            <q-btn
              class=""
              size="12px"
              flat
              dense
              round
              icon="get_app"
              @click="PDF(lpr.id, 1, 0)"
            />

            <!-- Select Button -->
            <q-btn
              class=""
              size="12px"
              flat
              dense
              round
              :color="selectedData_id.includes(lpr.id) ? 'teal' : ''"
              icon="done"
              @click="select(lpr.id)"
            />

            <!-- Unconfirm Button -->
            <q-btn class="" size="12px" flat dense round icon="undo" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- <PrintPortal v-model="printViolationDialog" @close="closePortal">
      <print-violation />
    </PrintPortal> -->

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
      :html-to-pdf-options="htmlToPdfOptions"
      @progress="onProgress($event)"
      @startPagination="startPagination()"
      @hasPaginated="hasPaginated()"
      @beforeDownload="beforeDownload($event)"
      @hasDownloaded="hasDownloaded($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content" class="pdf-content">
        <PrintModal />
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import VueHtml2pdf from "vue-html2pdf";
export default {
  data() {
    return {
      //selected: [],
      //showPrintViolationDialog: false,
      renderComponent: 0,
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
        filename: "Hee Hee",
        pdfQuality: 2,
        pdfFormat: "a4",
        pdfOrientation: "portrait",
        pdfContentWidth: "800px"
      }
    };
  },

  components: {
    "print-violation": require("components/Reporting/Modals/PrintViolation")
      .default,
    PrintPortal: require("components/Reporting/PrintPortal/WindowPortal")
      .default,
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

    closePortal() {
      // re render component to fix issue of remove q-list element
      /**
       * The horrible way: reloading the entire page
        The terrible way: using the v-if hack
        The better way: using Vue’s built-in forceUpdate method
        The best way: key-changing on your component
       */

      this.printViolationDialog = false;
      this.renderComponent += 1;

      // Clear All Selected Data
      this.setSelectedData({
        action: "removeAll"
      });
    },

    select(reportId) {
      let action = this.selectedData_id.includes(reportId) ? "remove" : "add";

      this.setSelectedData({
        action,
        id: reportId
      });
    },

    printViolation(reportId) {
      //this.printViolationDialog = true;
      this.setViolationToPrint(reportId);
    },
    PDF(reportId, download = 0, view = 1) {
      this.controlValue.enableDownload = download;
      this.controlValue.previewModal = view;
      this.setViolationToPrint(reportId);

      this.$refs.html2Pdf.generatePdf();
    },
    onProgress(progress) {
      this.progress = progress;
      console.log(`PDF generation progress: ${progress}%`);
    },
    startPagination() {
      console.log(`PDF has started pagination`);
    },
    hasPaginated() {
      console.log(`PDF has been paginated`);
    },
    async beforeDownload() {
      console.log(`On Before PDF Generation`);
    },
    hasDownloaded(blobPdf) {
      console.log(`PDF has downloaded yehey`);
      this.pdfDownloaded = true;
      console.log(blobPdf);
      // todo: find suitable place
      this.clearViolationToPrint();
    }
  },
  computed: {
    ...mapState("reporting", [
      "reportingData",
      "selectedData",
      "showPrintViolationDialog",
      "violationToPrint"
    ]),
    ...mapGetters("reporting", ["selectedData_id"]),

    printViolationDialog: {
      get() {
        return this.showPrintViolationDialog;
      },
      set(value) {
        return this.setPrintViolationDialog(value);
      }
    },
    htmlToPdfOptions() {
      return {
        margin: 0,

        filename: "hee hee.pdf",

        image: {
          type: "jpeg",
          quality: 0.98
        },

        enableLinks: true,

        html2canvas: {
          scale: this.controlValue.pdfQuality,
          useCORS: true
        },

        jsPDF: {
          unit: "in",
          format: this.controlValue.pdfFormat,
          orientation: this.controlValue.pdfOrientation
        }
      };
    }
  }
};
</script>
//<style lang="scss" scoped>
// .card-style {
//   background-color: #adadad2b !important;
// }
//
</style>
<style lang="css">
@media print {
  #printed-form {
    page-break-after: always;
  }
}

.A4 {
  width: 21cm;
  max-height: 29.7cm;
  padding: 10px;
  font-family: "Times New Roman", Times, serif;
}
.logo {
  text-align: left;
  margin-left: 7%;
  margin-top: 5px;
}
.lable {
  text-align: center;
}
.titles {
  font-size: 12pt;
  font-weight: bold;
  margin-bottom: 2pt;
}
.receipt-container {
  display: flex;
  width: 100%;
}
.columnn {
  display: flex;
  width: 100%;
  border-style: solid;
  border-width: 2px;
  padding: 10px;
}
div {
  margin-bottom: 0px;
}

.textt {
  font-size: 12pt;
  font-weight: normal;
  margin: 1pt;
  border: 4;
  border-color: red;
}
.center {
  text-align: center;
  float: inline-end;
  margin-left: auto;
  margin-right: auto;
}
.lefttt {
  float: left;
}
.righttt {
  text-align: right;
  float: right;
}

.img {
  max-height: 50%;
  width: auto;
  align-content: center;
}
</style>
