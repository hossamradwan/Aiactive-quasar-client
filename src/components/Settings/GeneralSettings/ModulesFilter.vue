<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered padding>
      <q-item-label header>Modules Filter</q-item-label>

      <q-item tag="label" v-ripple v-for="(nav, i) in navigations" :key="i">
        <q-item-section>
          <q-item-label>{{ nav.label }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="nav.status" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: ['navs'],

  computed: {
    navigations() {
      return this.navs.filter(nav => nav.label != 'Settings');
    }
  }
};
</script>
