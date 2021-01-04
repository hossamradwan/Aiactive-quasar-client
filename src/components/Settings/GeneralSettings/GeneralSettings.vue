<template>
  <form @submit="onSubmit" class="q-pa-md">
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

    <div class="row justify-end">
      <q-btn type="submit" :label="$t('Apply')" class="q-mt-md" color="blue">
      </q-btn>
    </div>
  </form>
</template>

<script>
import languages from "quasar/lang/index.json";
import { Loading } from 'quasar'
const appLanguages = languages.filter(lang =>
  ["ar", "en-us"].includes(lang.isoName)
);
export default {
  data() {
    return {
      lang: this.$i18n.locale
    };
  },
  methods: {
    onSubmit() {
      Loading.show()
      setTimeout(() => {
        //Change Language
        this.$i18n.locale = this.lang.value;
        //Change RTL direction
        import(`quasar/lang/${this.lang.value}`)
           .then(language => {this.$q.lang.set(language.default);
          });
        Loading.hide();
      }, 300);
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
