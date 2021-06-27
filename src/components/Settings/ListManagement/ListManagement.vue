<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="lpr" :label="$t('CarPlates')" />

      <q-tab name="faces" :label="$t('Faces')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="lpr">
        <lpr-list />
      </q-tab-panel>

      <q-tab-panel name="faces">
        <faces-list />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "lpr"
    };
  },
  components: {
    "lpr-list": require("components/Settings/ListManagement/Modules/LprList")
      .default,
    "faces-list": require("components/Settings/ListManagement/Modules/FacesList")
      .default
  }
};
</script>
