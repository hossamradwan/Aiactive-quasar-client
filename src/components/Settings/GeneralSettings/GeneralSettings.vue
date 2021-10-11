<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
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
      <q-color
        v-model="color"
        no-header
        no-footer
        class="my-picker"
        style="width: 200px; max-width: 100%;"
      />

      <ModulesFilter :navs="navs" />

      <div class="row justify-end">
        <q-btn
          type="submit"
          :label="$t('Apply')"
          class="q-mt-md"
          color="primary"
        >
        </q-btn>
      </div>
    </q-form>
  </div>
</template>
<script>
import languages from 'quasar/lang/index.json';
const appLanguages = languages.filter(lang =>
  ['ar', 'en-us'].includes(lang.isoName)
);
import { Loading } from 'quasar';
import { colors } from 'quasar';
import navs from 'src/router/navs';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      navs: Array.from(navs),
      lang: localStorage.getItem('Language') || 'ar',
      color: localStorage.getItem('ThemeColor') || '#005a7ee3',
      langOptions: [],
      submitResult: []
    };
  },

  methods: {
    ...mapActions('auth', ['setNavs']),
    setTheme() {
      const { setBrand } = colors;
      setBrand('primary', this.color);
      localStorage.setItem('ThemeColor', this.color);
    },
    setLanguage() {
      //Change Language
      // todo : remove this condition and handle undefined and null values
      if (this.lang.value != null && this.lang.value != 'undefined') {
        this.$i18n.locale = this.lang.value;

        console.log('this.lang:', this.lang);
        //Change RTL direction
        import(`quasar/lang/${this.lang.value}`).then(language => {
          this.$q.lang.set(language.default);
        });
        localStorage.setItem('Language', this.lang.value);
      }
    },
    setNavigations() {
      let values = navs.filter(nav => nav.status == true);
      this.setNavs(values);
    },
    onSubmit() {
      Loading.show();
      setTimeout(() => {
        this.setLanguage();
        this.setTheme();
        this.setNavigations();
        Loading.hide();
      }, 300);
    }
  },
  created() {
    this.langOptions = appLanguages.map(lang => ({
      label: lang.nativeName,
      value: lang.isoName
    }));
  },
  components: {
    ModulesFilter: require('components/Settings/GeneralSettings/ModulesFilter')
      .default
  }
};
</script>
