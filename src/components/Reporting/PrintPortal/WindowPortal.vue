<template>
  <div>
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
import VueHtml2pdf from "vue-html2pdf";
export default {
  props: ["controlValue"],
  data() {
    return {
      progress: 0,
      generatingPdf: false,
      pdfDownloaded: false
      // controlValue: {
      //   showLayout: false,
      //   floatLayout: true,
      //   enableDownload: false,
      //   previewModal: false,
      //   paginateElementsByHeight: 1100,
      //   manualPagination: false,
      //   filename: "Hee Hee",
      //   pdfQuality: 2,
      //   pdfFormat: "a4",
      //   pdfOrientation: "portrait",
      //   pdfContentWidth: "800px"
      // }
    };
  },
  components: {
    VueHtml2pdf,
    PrintModal: require("components/Reporting/Modals/Shared/ModalViolationContent")
      .default
  },

  methods: {
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
