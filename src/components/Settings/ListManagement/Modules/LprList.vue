<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      :data="rows"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top>
        <q-btn
          outline
          rounded
          :label="$t('AddLpr')"
          :disable="loading"
          icon="add"
          @click="addLprModal = true"
        />

        <q-space />

        <q-input
          bordered
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          :placeholder="$t('Search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props" v-if="props.col.name != 'actions'">
          {{ props.value }}
        </q-td>

        <!-- Actions -->
        <q-td :props="props" v-if="props.col.name == 'actions'">
          <q-btn
            class="q-ma-sm"
            flat
            size="sm"
            color="primary"
            round
            dense
            @click="editUser(props.row.id)"
            icon="edit"
          />
          <q-btn
            class="q-ma-sm"
            size="sm"
            color="accent"
            round
            dense
            @click="removeUser(props.row.id)"
            icon="remove"
          />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="addLprModal">
      <add-lpr @close="addUserModal = false" />
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addLprModal: false,
      columns: [
        {
          name: "id",
          required: true,
          label: this.$t("ID"),
          align: "left",
          field: row => row.id,
          sortable: true
        },
        {
          name: "plateNo",
          required: true,
          label: this.$t("PlateNo"),
          align: "left",
          field: row => row.plateNo,
          sortable: true
        },
        {
          name: "dateCreated",
          align: "center",
          label: this.$t("DateCreated"),
          field: "dateCreated",
          sortable: true
        },
        {
          name: "carBrand",
          align: "center",
          label: this.$t("Brand"),
          field: "carBrand",
          sortable: true
        },
        {
          name: "carModel",
          align: "center",
          label: this.$t("Model"),
          field: "carModel"
        },
        {
          name: "carColor",
          align: "center",
          label: this.$t("Color"),
          field: "carColor"
        },
        {
          name: "carClass",
          align: "center",
          label: this.$t("Class"),
          field: "carClass"
        },
        {
          name: "driverName",
          align: "center",
          label: this.$t("DriverName"),
          field: "driverName"
        },
        { name: "actions", align: "center", label: this.$t("Actions") }
      ],
      rows: [
        {
          id: 1,
          plateNo: 123,
          dateCreated: "2/3/2021",
          carBrand: "Toyota",
          carModel: "Corolla",
          carColor: "Black",
          carClass: "Vehicle",
          driverName: "John Smith"
        }
      ]
    };
  },
  methods: {
    removeUser(userId) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to Delete this User?",
          cancel: true
        })
        .onOk(() => {
          //   this.deleteUser(userId);
        });
    }
  },
  components: {
    "add-lpr": require("components/Settings/ListManagement/Modules/Shared/Modal")
      .default
  }
};
</script>
