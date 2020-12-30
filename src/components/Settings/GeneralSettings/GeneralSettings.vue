<template>
  <q-select
    label="Select Language"
    v-model="lang"
    :options="langOptions"
    dense
    borderless
    map-options
    options-dense
    style="max-width: 150px"
  />
</template>

<script>
import languages from "quasar/lang/index.json";
const appLanguages = languages.filter(lang =>
  ["ar", "en-us"].includes(lang.isoName)
);
export default {
  data() {
    return {
      lang: this.$i18n.locale
    };
  },

  watch: {
    lang(lang) {
      this.$i18n.locale = lang.value;
      // set quasar's language too!!
      import(`quasar/lang/${lang.value}`).then(language => {
        this.$q.lang.set(language.default);
      });
    }
  },
  created() {
    this.langOptions = appLanguages.map(lang => ({
      label: lang.nativeName,
      value: lang.isoName
    }));
  }
};
</script>
