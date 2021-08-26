<template>
  <div class="q-pa-md" style="min-width: 170px;">
    <q-input
      class="col"
      filled
      v-model="date"
      mask="date"
      :rules="['date']"
      :label="label"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['label'],
  data() {
    return {
      date: '2021/06/01'
    };
  }
};
</script>
