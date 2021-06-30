<template>
  <div class="q-pa-md">
    <q-table
      title="Lpr"
      row-key="id"
      class="lpr-table"
      :data="data"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      :pagination="pagination"
      bordered
      flat
    >
      <template v-slot:top>
        <q-btn
          outline
          rounded
          :label="$t('AddLpr')"
          :disable="loading"
          icon="add"
          @click="addUserModal = true"
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

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="plateNo" :props="props">
            {{ props.row.plateNo }}
          </q-td>
          <q-td key="dateCreated" :props="props">
            {{ props.row.dateCreated }}
          </q-td>
          <q-td key="carBrand" :props="props">
            {{ props.row.carBrand }}
          </q-td>
          <q-td key="carModel" :props="props">
            {{ props.row.carModel }}
          </q-td>
          <q-td key="carColor" :props="props">
            {{ props.row.carColor }}
          </q-td>
          <q-td key="carClass" :props="props">
            {{ props.row.carClass }}
          </q-td>
          <q-td key="driverName" :props="props">
            {{ props.row.driverName }}
          </q-td>

          <q-td auto-width>
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
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
      filter: "",
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 5
      },
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
      data: [
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
  components: {},
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
  }
};
</script>
<style lang="scss">
.lpr-table thead,
tr {
  background-color: #adadad2b;
}
</style>
