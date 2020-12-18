<template>
  <div class="q-mr-sm permission">

    <!-- <h1>{{traps}}</h1> -->
    <div v-for="(trap) in traps" :key="trap.trap_number" class="q-ma-md text-h4 text-bold">
      <div class="q-mt-xl text-center">
        <q-chip>Trap {{ trap.trap_number }} - Distance: {{trap.distance}} Meter</q-chip>
      </div>

      <div class="row justify-center q-ma-md">

      <div class="coulmn points col">
        <q-select
          dense
          outlined
          v-model="trap.point_one" 
          @input="update"
          :options="point_one"
          use-chips
          multiple
          emit-value
          map-options
          :label="`point One Devices`"
          class="q-ml-md col-md-3 devices"
        />
      </div>

      <div class="coulmn points col">
        <q-select
          dense
          outlined
          v-model="trap.point_two"    
          :options="point_two"
          use-chips
          multiple
          emit-value
          map-options
          label="Point Two Devices"
          class="q-ml-md col-md-3 devices"
        />
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { types } from 'util';
export default {
  props: ["trapsConfiguration", "moduleDevices", "operation"],
  data() {
    return {
      model: [],
	    traps: []
    };
  },
  methods: {
    update() {
      this.$emit('update:trapsConfiguration', this.traps)
    }
  },
  mounted() {
    if(typeof this.operation == 'undefined') {
      this.traps = this.trapsConfiguration;
    }

    if(this.operation == 'edit') {
      let clonedTraps = new Array(0)

      this.trapsConfiguration.forEach(trap => {
        let cloneObj = {id: trap.id, trap_number: trap.trap_number,
                        point_one: [], point_two: [], distance: trap.distance}

        clonedTraps.push(cloneObj)
      })

      this.traps = Array.from(clonedTraps);
    }

    this.update();
    // console.log('devices', this.moduleDevices);
  },
  computed: {
    point_one() {
      let pointOne = this.moduleDevices;
      this.traps.forEach(trap => {
        pointOne = pointOne.filter( function( el ) {
          return !trap.point_two.includes( el );
        });

        pointOne = pointOne.filter( function( el ) {
          return !trap.point_one.includes( el );
        });
      });
      //console.log('cleared', pointOne)
      return pointOne;
    },
    point_two() {
      let pointTwo = this.moduleDevices;
      this.traps.forEach(trap => {
        pointTwo = pointTwo.filter( function( el ) {
          return !trap.point_two.includes( el );
        });

        pointTwo = pointTwo.filter( function( el ) {
          return !trap.point_one.includes( el );
        });
      });
      //console.log('cleared', pointTwo)
      return pointTwo;
    }
  }
 };
</script>
<style scoped>
.permission {
  min-width: 170px;
}
.distance {
  min-width: 200px;
}
.points {
  min-width: 150px;
}
</style>
