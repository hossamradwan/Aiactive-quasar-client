<template>
  <div class="q-pa-md">
    <q-table
      title="Devices"
      row-key="id"
      class="devices-table"
      :data="devicesList"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      :pagination="pagination"
      bordered
      flat
    >
      <!-- Button Add Device -->
      <template v-slot:top>
        <q-btn
          outline
          rounded
          :label="$t('AddDevice')"
          :disable="loading"
          icon="add"
          @click="addDeviceModal = true"
        />

        <q-space />

        <!-- Search Bar -->
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
          <q-td key="deviceName" :props="props" class="text-subtitle2">
            {{ props.row.deviceName }}
          </q-td>
          <q-td key="deviceType" :props="props">
            {{ props.row.deviceType }}
          </q-td>
          <q-td key="deviceZone" :props="props">
            {{ props.row.deviceZone }}
          </q-td>
          <q-td key="deviceUrl" :props="props">
            {{ props.row.device_streamUrl }}
          </q-td>
          <q-td key="device_ip" :props="props">
            {{ props.row.device_ip }}
          </q-td>
          <q-td auto-width>
            <q-btn
              class="q-ma-sm"
              flat
              size="sm"
              color="primary"
              round
              dense
              @click="editDevice(props.row.id)"
              icon="edit"
            />
            <q-btn
              class="q-ma-sm"
              size="sm"
              color="accent"
              round
              dense
              @click="removeDevice(props.row.id)"
              icon="remove"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Add Device Modal -->
    <q-dialog v-model="addDeviceModal">
      <add-device @close="addDeviceModal = false" />
    </q-dialog>

    <!-- Edit Device Modal -->
    <q-dialog v-model="editDeviceModal" @hide="closeEditDevice">
      <edit-device
        @close="closeEditDevice"
        :deviceData="modals.editDeviceData"
      />
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      modals: {
        editDeviceData: {}
      },
      loading: false,
      filter: '',
      pagination: {
        sortBy: 'desc',
        descending: false,
        // page: 2,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: row => row.id,
          sortable: true
        },
        {
          name: 'deviceName',
          align: 'center',
          label: this.$t('DeviceName'),
          field: 'deviceName',
          sortable: true
        },
        {
          name: 'deviceType',
          align: 'center',
          label: this.$t('Type'),
          field: 'deviceType',
          sortable: true
        },
        {
          name: 'deviceZone',
          align: 'center',
          label: this.$t('Zone'),
          field: 'deviceZone'
        },
        {
          name: 'deviceUrl',
          align: 'center',
          label: this.$t('Url'),
          field: 'deviceUrl'
        },
        { name: 'device_ip', align: 'center', label: 'IP', field: 'device_ip' },
        { name: 'actions', align: 'center', label: this.$t('Actions') }
      ],
      data: [
        {
          id: 1,
          DeviceName: 'Baher Elnaggar',
          Type: 'Tattile',
          Zone: 'street',
          IP: '192.168.1.100'
        }
      ]
    };
  },
  components: {
    'add-device': require('components/Settings/DevicesSettings/Modals/AddDevice')
      .default,
    'edit-device': require('components/Settings/DevicesSettings/Modals/EditDevice')
      .default
  },

  methods: {
    ...mapActions('devices', [
      'getDevices',
      'deleteDevice',
      'setAddDeviceModal',
      'setEditDeviceModal'
    ]),
    ...mapActions('shinobi', ['deleteMonitor']),
    editDevice(deviceId) {
      let selectedDevice = this.devicesList.find(x => x.id === deviceId);
      this.modals.editDeviceData = Object.assign({}, selectedDevice);
      //this.modals.editDeviceData = selectedDevice
      this.editDeviceModal = true;
      //console.log('edited data',selectedDevice);
    },

    removeDevice(deviceId) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Would you like to Delete this Device?',
          cancel: true
          //persistent: true
        })
        .onOk(() => {
          this.deleteMonitor(deviceId).then(() => this.deleteDevice(deviceId));
        });
    },

    closeEditDevice() {
      this.editDeviceModal = false;
      this.modals.editDeviceData = {};
    }
  },

  mounted() {
    this.getDevices();
    //console.log('devices', this.devicesList);
  },

  computed: {
    ...mapState('devices', ['devicesList']),
    ...mapGetters('devices', ['showAddDeviceModal', 'showEditDeviceModal']),
    addDeviceModal: {
      get() {
        return this.showAddDeviceModal;
      },
      set(value) {
        this.setAddDeviceModal(value);
      }
    },
    editDeviceModal: {
      get() {
        return this.showEditDeviceModal;
      },
      set(value) {
        this.setEditDeviceModal(value);
      }
    }
  },
  filters: {}
};
</script>
<style lang="scss">
.devices-table thead,
tr {
  background-color: #adadad2b;
}
</style>
