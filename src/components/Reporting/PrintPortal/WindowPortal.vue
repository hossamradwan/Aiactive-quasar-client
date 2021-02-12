<template>
  <div v-if="open">
    <slot />
  </div>
</template>

<script>
function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) {
      // for <style> elements
      const newStyleEl = sourceDoc.createElement("style");

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) {
      // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement("link");

      newLinkEl.rel = "stylesheet";
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

export default {
  name: "window-portal",
  model: {
    prop: "open",
    event: "close"
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      windowRef: null
    };
  },
  watch: {
    open(newOpen) {
      if (newOpen) {
        this.openPortal();
      } else {
        this.closePortal();
      }
    }
  },
  methods: {
    openPortal() {
      var windowFeatures =
        "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

      this.windowRef = window.open();
      this.windowRef.document.title = "good to go";
      this.windowRef.document.body.appendChild(this.$el);
      copyStyles(window.document, this.windowRef.document);
      setTimeout(this.print, 1);
    },

    print() {
      this.windowRef.print();
      window.onfocus = this.closePortal();
    },

    closePortal() {
      if (this.windowRef) {
        this.windowRef.close();
        this.$emit("close");
      }
    }
  },
  mounted() {
    if (this.open) {
      this.openPortal();
    }
  },
  beforeDestroy() {
    if (this.windowRef) {
      this.closePortal();
    }
  }
};
</script>
