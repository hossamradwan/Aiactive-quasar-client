<template>
  <q-page padding>
    <q-card class="settings-tabs">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="users-settings" icon="fas fa-users-cog" label="Users" />

        <q-tab name="devices-settings" icon="device_hub" label="Devices" />

        <q-tab
          name="average-speed-settings"
          icon="speed"
          label="Average Speed"
        />

        <q-tab
          name="database-settings"
          icon="fas fa-database"
          label="Database"
        />

        <q-tab
          name="notification-settings"
          icon="fas fa-bell"
          label="Notifications"
        />

        <q-tab name="general-settings" icon="fas fa-tools" label="General" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="users-settings">
          <users-settings />
        </q-tab-panel>

        <q-tab-panel name="devices-settings">
          <devices-settings />
        </q-tab-panel>

        <q-tab-panel name="average-speed-settings">
          <average-speed-settings />
        </q-tab-panel>

        <q-tab-panel name="general-settings">
          <general-settings />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "PageSettings",
  data() {
    return {
      tab: "users-settings"
    };
  },
  components: {
    "users-settings": require("components/Settings/UsersSettings/UsersSettings")
      .default,
    "devices-settings": require("components/Settings/DevicesSettings/DevicesSettings")
      .default,
    "average-speed-settings": require("components/Settings/AverageSpeedSettings/AverageSpeedSettings")
      .default,
    "general-settings": require("components/Settings/GeneralSettings/GeneralSettings")
      .default
  }
};
</script>
