<template>
  <div>
    <q-btn
      outline
      dense
      :color="'primary'"
      :label="`Add`"
      @click="addPlateModal = true"
    />
    <q-dialog v-model="addPlateModal">
      <q-card>
        <form @submit.prevent="submitForm">
          <div class="text-title text-center text-bold q-pa-md">
            Add Black/White List
          </div>
          <q-card-section class="row q-pb-none">
            <div class="col q-mb-xl">
              <q-input
                outlined
                :value="Name"
                autofocus
                v-select-all
                ref="name"
                label="Name"
                stack-label
                class="col q-pa-sm"
              />
              <q-input
                outlined
                :value="plateNo"
                autofocus
                v-select-all
                ref="plateNo"
                label="Plate Number"
                stack-label
                class="col q-pa-sm"
              />
              <q-btn-dropdown
                class="col q-ml-lg"
                color="primary"
                :label="lists.find(l => l.id == selectedList).value"
              >
                <q-list>
                  <q-item
                    clickable
                    v-close-popup
                    v-for="list in lists"
                    :key="list.id"
                    @click="selectedList = list.id"
                  >
                    <q-item-section>
                      <q-item-label>{{ list.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="Save" color="primary" type="submit" />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addPlateModal: false,
      Name: '',
      plateNo: '',
      lists: [
        { id: 0, value: 'White List' },
        { id: 1, value: 'Black List' }
      ],
      selectedList: 0
    };
  },
  methods: {
    submitForm() {
      console.log('submited');
    }
  }
};
</script>
