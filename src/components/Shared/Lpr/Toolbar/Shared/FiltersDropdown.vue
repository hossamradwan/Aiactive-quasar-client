<template>
  <q-btn-dropdown flat round dense class="options-dropdown" icon="more_vert">
    <div class="row no-wrap q-pa-md">
      <!-- <dateTime-filter v-if="openFilter == 'dateTime'" /> -->


      <!-- Devices Filter Data -->
      <device-filter
        v-if="openFilter == 'devices'"
        :moduleName='moduleName' />



      <!-- Confidence Filter Data -->
      <confidence-filter
        v-if="openFilter == 'confidence'"
        :confidence='filtersByConfidenceData'
        v-show = "!(moduleName == 'average-speed-module')"
        @applyConfidenceFilter="applyConfidenceFilter" />


      <!-- Speed Filter Data -->
      <speed-filter
        v-if="openFilter == 'speed'"
        :speed='filtersBySpeedData'
        @applySpeedFilter="applySpeedFilter" />



      <!-- ID Sorter Data -->
      <id-sorter
        v-if="openFilter == 'sorterId'"
        :sorterId='sortersByIdData'
        @applyIdSorter="applyIdSorter" />



      <!-- Confidence Sorter Data -->
      <confidence-sorter
        v-if="openFilter == 'sorterConfidence'"
        v-show = "!(moduleName == 'average-speed-module')"
        :sorterConfidence='sortersByConfidenceData'
        @applyConfidenceSorter="applyConfidenceSorter" />
      



      <!-- Speed Sorter Data -->
      <speed-sorter
        v-if="openFilter == 'sorterSpeed'"
        :sorterSpeed='sortersBySpeedData'
        @applySpeedSorter="applySpeedSorter" />



      <!-- Pagination Data -->
      <pagination-settings
        v-if="openFilter == 'pagination'"
        :paginationLimit='paginationData'
        @applyPaginationLimit="applyPaginationLimit" />


      <q-separator vertical inset class="q-mx-lg" />



      <div class="column items-left">
        <div class="text-h6 text-center q-mt-sm">Filters</div>

        <!-- Devices Filter Button -->
        <q-chip
          clickable
          @click="openFilter = 'devices'"
          :color="openFilter=='devices' ? 'secondary' : ''"
          text-color="black"
          class="q-ma-sm q-pa-md">
          <q-toggle
            :value="true"
            disable
            color="primary"
            class="active-toggels" />
          Devices
        </q-chip>



        <!-- Confidence Filter Button -->
        <q-chip
          clickable
          @click="openFilter = 'confidence'"
          :color="openFilter=='confidence' ? 'secondary' : ''"
          v-show = "!(moduleName == 'average-speed-module')"
          text-color="black"
          class="q-ma-sm q-pa-md">
          <q-toggle
            v-model="filtersByConfidence"
            color="primary"
            class="active-toggels" />
          confidence
        </q-chip>


        <!-- Speed Filter Button -->
        <q-chip
          clickable
          @click="openFilter = 'speed'"
          :color="openFilter=='speed' ? 'secondary' : ''"
          text-color="black"
          class="q-ma-sm q-pa-md">
          <q-toggle color="primary" class="active-toggels" v-model="filtersBySpeed" />
          speed
        </q-chip>


        <!-- Confirmed Filter Button -->
        <q-chip
          clickable
          text-color="black"
          class="q-ma-sm q-pa-md">
          <q-toggle color="primary" class="active-toggels" v-model="filtersByConfirmed" />
          <q-avatar
            size="37px"
            class="filters-avatar"
            :text-color="filtersByConfirmed ? 'red' : 'teal'"
            :icon="filtersByConfirmed ? 'visibility_off' : 'visibility'" />
          Confirmed
        </q-chip>



        <q-separator inset size='1px' color="teal" class="q-mt-md q-mx-lg" />



        <!-- ID Sorter Button -->
        <div class="text-h6 text-center q-mt-sm">Sorters</div>
        <q-chip
          clickable
          @click="openFilter = 'sorterId'"
          :color="openFilter=='sorterId' ? 'secondary' : ''"
          text-color="black"
          class="q-ma-sm q-pa-md">
          <q-toggle
            v-model="sortersById"
            color="primary" />
          ID
        </q-chip>


        <!--  Confidence Sorter Button  -->
        <q-chip
          clickable
          @click="openFilter = 'sorterConfidence'"
          :color="openFilter=='sorterConfidence' ? 'secondary' : ''"
          v-show = "!(moduleName == 'average-speed-module')"
          text-color="black"
          class="q-ma-sm q-pa-md">
          <q-toggle
            v-model="sortersByConfidence"
            color="primary" />
          confidence
        </q-chip>


        <!-- Speed Sorter Button -->
        <q-chip
          clickable
          @click="openFilter = 'sorterSpeed'"
          :color="openFilter=='sorterSpeed' ? 'secondary' : ''"
          text-color="black"
          class="q-ma-sm q-pa-md">
          <q-toggle
            color="primary"
            v-model="sortersBySpeed" />
          speed
        </q-chip>

        
        <q-separator inset size='1px' color="teal" class="q-mt-md q-mx-lg" />

        <!-- Pagination Sorter Button -->
        <q-chip
          clickable
          @click="openFilter = 'pagination'"
          :color="openFilter=='pagination' ? 'secondary' : ''"
          text-color="black"
          class="q-ma-sm q-pa-md q-pl-xl">
          
          Pagination
        </q-chip>
      </div>

          
    </div>
  </q-btn-dropdown>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  props: ['moduleName'],
  data() {
    return {
      openFilter: 'devices',
      dateTime: true,
      //confidence: 60,
      speed: 10      
    };
  },
  components: {
    'device-filter': require("./Filters/DeviceFilter").default,
    'confidence-filter': require("./Filters/ConfidenceFilter").default,
    'dateTime-filter': require("./Filters/DateTimeFilter").default,
    'speed-filter': require("./Filters/SpeedFilter").default,
    'id-sorter': require("./Filters/IdSorter").default,
    'confidence-sorter': require("./Filters/ConfidenceSorter").default,
    'speed-sorter': require("./Filters/SpeedSorter").default,
    'pagination-settings': require("./Filters/PaginationSettings").default
  },
  methods: {
    ...mapActions('lpr', ['setFilter', 'setSorter', 'setPagination']),
    ...mapActions('averageSpeedResult', ['setAverageSpeedPagination',
                                         'setAverageSpeedSorter', 'setAverageSpeedFilter']),

    applyConfidenceFilter(filterNum, filterStatus) {
      /**
       * if filter status is undefined it means that user apply filter
       * if filter status is true or false it means that user changes filterstatus
       * Validating filter data
       */

      filterStatus = typeof filterStatus == 'undefined' ? true : filterStatus
      filterNum = filterNum == '' ? this.filters.confidence_number.data : filterNum

      let filterData = {filterName: 'confidence_number', filterData: {isActive: filterStatus, data: filterNum}}

      if(this.moduleName == 'average-speed-module')
        this.setAverageSpeedFilter(filterData);

      else
        this.setFilter(filterData)
    },

    applySpeedFilter(filterNum, filterStatus) {
      /**
       * if filter status is undefined it means that user apply filter
       * if filter status is true or false it means that user changes filterstatus
       * Validating filter data
       */

      filterStatus = typeof filterStatus == 'undefined' ? true : filterStatus
      filterNum = filterNum == '' ? this.filters.speed.data : filterNum

      let filterData = {filterName: 'speed', filterData: {isActive: filterStatus, data: filterNum}}

      if(this.moduleName == 'average-speed-module')
        this.setAverageSpeedFilter(filterData);

      else
        this.setFilter(filterData)
    },

    applyConfirmedFilter(filterNum, filterStatus) {
      /**
       * if filter status is undefined it means that user apply filter
       * if filter status is true or false it means that user changes filterstatus
       * Validating filter data
       */

      filterStatus = typeof filterStatus == 'undefined' ? true : filterStatus
      filterNum = filterNum == '' ? this.filters.confirmed.data : filterNum

      let filterData = {filterName: 'confirmed', filterData: {isActive: filterStatus, data: filterNum}}

      if(this.moduleName == 'average-speed-module')
        this.setAverageSpeedFilter(filterData);

      else
        this.setFilter(filterData)
    },

    applyIdSorter(sorterType, sorterStatus) {
      sorterStatus = typeof sorterStatus == 'undefined' ? true : sorterStatus
      sorterType = sorterType == '' ? this.sorters.id.type : sorterType

      let sorterData = {sorterName: 'id', sorterData: {isActive: sorterStatus, type: sorterType}}
      
      if(this.moduleName == 'average-speed-module')
        this.setAverageSpeedSorter(sorterData);

      else
        this.setSorter(sorterData)
    },

    applyConfidenceSorter(sorterType, sorterStatus) {
      sorterStatus = typeof sorterStatus == 'undefined' ? true : sorterStatus
      sorterType = sorterType == '' ? this.sorters.confidence_number.type : sorterType

      let sorterData = {sorterName: 'confidence_number', sorterData: {isActive: sorterStatus, type: sorterType}}

      if(this.moduleName == 'average-speed-module')
        this.setAverageSpeedSorter(sorterData);

      else
        this.setSorter(sorterData)
    },

    applySpeedSorter(sorterType, sorterStatus) {
      sorterStatus = typeof sorterStatus == 'undefined' ? true : sorterStatus
      sorterType = sorterType == '' ? this.sorters.speed.type : sorterType

      let sorterData = {sorterName: 'speed', sorterData: {isActive: sorterStatus, type: sorterType}}

      if(this.moduleName == 'average-speed-module')
        this.setAverageSpeedSorter(sorterData);

      else
        this.setSorter(sorterData)
    },

    applyPaginationLimit(pageLimit) {
      console.log('apply pagination limit', pageLimit);
      
      if(this.moduleName == 'average-speed-module')
        this.setAverageSpeedPagination({ limit: pageLimit });

      else
        this.setPagination({limit: pageLimit})
    }
  },
  mounted() {
  },
  computed: {
    ...mapState('lpr', ['filters', 'sorters', 'pagination']),
    ...mapState('averageSpeedResult', {
      averageSpeedSorters: state => state.sorters,
      averageSpeedFilters: state => state.filters,
      averageSpeedPagination: state => state.pagination
    }),

    filtersByDateTime: {
      get() {
        return this.filters.dateTime.isActive
      }, 
      set(value) {
        console.log('filtering date time', value);
        console.log('apply date time filter then set filter');
        //this.setFilter(value)
      }
    },
    

    filtersByConfidence: {
      get() {
        if(this.moduleName == 'average-speed-module')
          return this.averageSpeedFilters.confidence_number.isActive;

        return this.filters.confidence_number.isActive
      }, 
      set(value) {
        this.applyConfidenceFilter('', value)
      }
    },

    filtersByConfidenceData() {
      if(this.moduleName == 'average-speed-module')
        return this.averageSpeedFilters.confidence_number;

      return this.filters.confidence_number;
    },

    filtersBySpeed: {
      get() {
        if(this.moduleName == 'average-speed-module')
          return this.averageSpeedFilters.speed.isActive;
        return this.filters.speed.isActive
      }, 
      set(value) {
        this.applySpeedFilter('', value)
      }
    },

    filtersByConfirmed: {
      get() {
        if(this.moduleName == 'average-speed-module')
          return this.averageSpeedFilters.confirmed.isActive;

        return this.filters.confirmed.isActive
      }, 
      set(value) {
        this.applyConfirmedFilter('', value)
      }
    },

    filtersBySpeedData() {
      if(this.moduleName == 'average-speed-module')
        return this.averageSpeedFilters.speed;

      return this.filters.speed;
    },

    sortersById: {
      get() {
        if(this.moduleName == 'average-speed-module')
          return this.averageSpeedSorters.id.isActive;

        return this.sorters.id.isActive
      },
      set(value) {
        this.applyIdSorter('', value)
      }
    },

    sortersByIdData() {
      if(this.moduleName == 'average-speed-module')
        return this.averageSpeedSorters.id;

      return this.sorters.id;
    },

    sortersByConfidence: {
      get() {
        if(this.moduleName == 'average-speed-module')
          return this.averageSpeedSorters.confidence_number.isActive;

        return this.sorters.confidence_number.isActive
      },
      set(value) {
        this.applyConfidenceSorter('', value)
      }
    },

    sortersByConfidenceData() {
      if(this.moduleName == 'average-speed-module')
        return this.averageSpeedSorters.confidence_number;

      return this.sorters.confidence_number;
    },

    sortersBySpeed: {
      get() {
        if(this.moduleName == 'average-speed-module')
          return this.averageSpeedSorters.speed.isActive;

        return this.sorters.speed.isActive;
      },
      set(value) {
        this.applySpeedSorter('', value)
      }
    },

    sortersBySpeedData() {
      if(this.moduleName == 'average-speed-module')
        return this.averageSpeedSorters.speed;

      return this.sorters.speed;
    },

    paginationData() {
      if(this.moduleName == 'average-speed-module')
        return this.averageSpeedPagination.limit;

      return this.pagination.limit;
    }
  }
};
</script>

<style lang="scss" scoped>
.active-toggels {
  margin-right: 20px;
}

.filters-avatar {
  margin-left: -35px;
  margin-right: 0px;
}
</style>
