<template>
    <q-img
        class="absolute-top"
        src="~/assets/new-logo12.png"
        style="height: 150px">
          <div
            @click="toUserProfilePage"
            class="cursor-pointer absolute-bottom bg-transparent">
            <q-avatar
              size="56px"
              class="q-mb-sm">
              <img src="~/assets/avatar.jpg">
            </q-avatar>

            <div class="text-weight-bold user-data">
              {{userData.userName}}
            </div>

            <div class="user-data">{{userData.email}}</div>
          </div>
    </q-img>
</template>

<script>
export default {
    props: ['userData'],
    methods: {
      toUserProfilePage() {
        if (this.$route.path !== '/userProfile')
            this.$router.push('/userProfile')
      }
    }
}
</script>

<style lang="scss" scoped>
  .user-data {
    color: #b6c7cf;
  }
</style>