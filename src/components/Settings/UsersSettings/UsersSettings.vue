<template>
  <div class="q-pa-md">
    <q-table
      title="Users"
      row-key="id"
      class="users-table"
      :data="users"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      :pagination="pagination"
      bordered
      flat
      hide-bottom
    >

      <template v-slot:top>
        <q-btn
          outline
          rounded
          label="Add User"
          :disable="loading"
          icon="add"
          @click="addUserModal=true" />

        <q-space />

        <q-input
          bordered
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          placeholder="Search">
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
            <q-td
              key="userName"
              :props="props"
              class="text-subtitle2">
                {{ props.row.name }}
            </q-td>
            <q-td key="email" :props="props">
                {{ props.row.email }}
            </q-td>
            <q-td key="permissions" :props="props">
                <q-badge :color="props.row.is_admin ? 'primary' : 'green-5'">
                  {{ props.row.is_admin | isAdmin }}
                </q-badge>
            </q-td>
            <q-td key="status" :props="props">
                <q-badge :color="props.row.is_active ? 'primary' : 'accent'">
                    {{ props.row.is_active | isActive }}
                </q-badge>
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
                  icon="edit" />
                <q-btn
                  class="q-ma-sm"
                  size="sm"
                  color="accent"
                  round
                  dense
                  @click="removeUser(props.row.id)"
                  icon="remove" />
            </q-td>          
          </q-tr>
      </template>
    </q-table>

    <!-- Add User Modal -->
    <q-dialog
      v-model="addUserModal">
      <add-user
        @close="addUserModal=false" />
    </q-dialog>

    <!-- Edit User Modal -->
    <q-dialog
      v-model="editUserModal"
      @hide="closeEditUser" >
      <edit-user
        @close="closeEditUser"
        :user="modals.editUserData" />
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      modals: {
        editUserData: {}
      },
      loading: false,
      filter: '',
      pagination: {
        sortBy: 'desc',
        descending: false,
        //page: 2,
        rowsPerPage: 0
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
        { name: 'userName', align: 'center', label: 'User Name', field: 'userName', sortable: true },
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
        { name: 'permissions', align: 'center', label: 'Permission', field: 'isAdmin' },
        { name: 'status', align: 'center', label: 'Status', field: 'isActive' },
        { name: 'actions', align: 'center', label: 'Actions'}
      ],
      data: [
        {
          id: 1,
          userName: 'Baher Elnaggar',
          email: 'baher@aiactive.com',
          isAdmin: 'admin',
          isActive: 'enabled'
        },        {
          id: 2,
          userName: 'Ahmed Helmy',
          email: 'ahme@aiactive.com',
          isAdmin: 'admin',
          isActive: 'enabled'
        },        {
          id: 3,
          userName: 'Sara H.',
          email: 'sara@aiactive.com',
          isAdmin: 'user',
          isActive: 'disabled'
        }
      ]
    }
  },
  components: {
    'add-user': require('components/Settings/UsersSettings/Modals/AddUser').default,
    'edit-user': require('components/Settings/UsersSettings/Modals/EditUser').default
  },
  methods: {
    ...mapActions('users', ['getUsers', 'deleteUser', 'setAddUserModal', 'setEditUserModal']),
    editUser(userId) {
      let selectedUser = this.users.find(x => x.id === userId)
      this.modals.editUserData = Object.assign({}, selectedUser)            
      this.editUserModal = true
    },
    removeUser(userId) {
        this.$q.dialog({
            title: 'Confirm',
            message: 'Would you like to Delete this User?',
            cancel: true,
            //persistent: true
        }).onOk(() => {
            this.deleteUser(userId)
        })
    },
    closeEditUser() {
      this.editUserModal = false
      this.modals.editUserData = {}
    }
  },
  mounted() {
    this.getUsers()
  },
  computed: {
    ...mapState('users', ['users']),
    ...mapGetters('users', ['showAddUserModal', 'showEditUserModal']),
    addUserModal: {
      get() {
        return this.showAddUserModal
      },
      set(value) {
        this.setAddUserModal(value)
      }
    },
    editUserModal: {
      get() {
        return this.showEditUserModal
      },
      set(value) {
        this.setEditUserModal(value)
      }
    }

  },
  filters: {
    isAdmin(value) {
      if(value) return 'admin'
      else return 'user'
    },
    isActive(value) {
      if(value) return 'enabled'
      else return 'disabled'
    }
  }
}
</script>
<style lang="scss">
    .users-table thead, tr {
        background-color: #adadad2b;
    }
</style>