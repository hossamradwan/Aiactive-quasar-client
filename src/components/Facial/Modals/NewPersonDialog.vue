<template>
  <q-item>
    <q-item-section>
      <div class="text-h6">Add New Person</div>
    </q-item-section>

    <q-item-section style="max-height: 50vh" class="scroll">
      <q-uploader
        url="http://localhost:4444/upload"
        label="Attach Images"
        multiple
        batch
        style="max-width: 300px"
        accept=".jpg, image/*"
        @rejected="onRejected"
        auto-upload
      />
    </q-item-section>
    <form @submit.prevent="submitForm">
      <q-item-section>
        <facial-new-person-Id :id.sync="userData.id" :label="'ID'" />
        <facial-new-person-name :name.sync="userData.name" :label="'Name'" />
        <facial-new-person-email
          :email.sync="userData.email"
          :label="'Email'"
        />
        <facial-new-person-phone
          :phone.sync="userData.phone"
          :label="'Phone'"
        />
      </q-item-section>

      <q-item-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Submit" color="primary" v-close-popup />
      </q-item-actions>
    </form>
  </q-item>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        name: "",
        email: "",
        phone: ""
      }
    };
  },
  methods: {
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) are not Images Format`
      });
    }
  },
  components: {
    FacialNewPersonId: require("components/Facial/Modals/Shared/FacialNewPersonId")
      .default,
    FacialNewPersonName: require("components/Facial/Modals/Shared/FacialNewPersonName")
      .default,
    FacialNewPersonEmail: require("components/Facial/Modals/Shared/FacialNewPersonEmail")
      .default,
    FacialNewPersonPhone: require("components/Facial/Modals/Shared/FacialNewPersonPhone")
      .default
  }
};
</script>
