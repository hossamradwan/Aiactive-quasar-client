<template>
    <q-page-sticky
      position="bottom-right"
      :offset="[25, 0]"
      class="pagination">

      
      <!-- max = total pages
            max-pages = number of pages in line -->
      <q-pagination
        :value="paginationData.page"
        @input="updateCurrentPage"
        color="teal"
        :max="paginationData.totalPages" 
        :max-pages="6"
        :boundary-numbers="false"
      >
      </q-pagination>
      

    </q-page-sticky>
</template>

<script>
export default {
  props: ['paginationData'],
    data() {
      return {
        currentPage: 5
      }
    },
    methods: {
      updateCurrentPage(value) {
        //console.log('triggered pagination component');
        this.$emit('updateCurrentPage', {page: value})
      }
    },
    mounted() {
      //this.currentPage = this.paginationData.page
     // console.log('pagination data', this.paginationData);
    }
}
</script>

<style scoped>
  .pagination {
    background-color: #bdbdbd;
    border-radius: 5px;
  }
</style>
