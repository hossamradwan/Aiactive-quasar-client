<template>
  <div>
    <q-select
      :label="$t('SelectLanguage')"
      v-model="lang"
      :options="langOptions"
      dense
      borderless
      map-options
      options-dense
      style="max-width: 150px"
    />
  </div>
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
      console.log("this.$i18n.locale", this.$i18n.locale);
      this.$i18n.locale = lang.value;
      console.log("langvalue", lang.value);
      console.log("this.$i18n.locale", this.$i18n.locale);
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
