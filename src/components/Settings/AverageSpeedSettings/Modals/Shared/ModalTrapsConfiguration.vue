<template>
  <div class="q-mr-sm permission">
    <q-btn
      outline
      rounded
      class="q-ml-md q-mt-sm"
      label="Add New Trap"
      icon="add"
      @click="addNewTrap"
    />

    <div v-for="(trap, key) in traps" :key="trap.trap_number" class="row q-ma-md text-h4 text-bold">
      <div class="coulmn q-mt-xl">
        <q-chip>Trap {{ trap.trap_number }}</q-chip>
      </div>

      <q-space />

      <div class="coulmn distance q-mt-xl">
        <q-slider
          :value="parseInt(trap.distance)"
          :min="0"
          :max="50000"
          @input="updateTrap($event, trap.trap_number)"
          color="green"
          label
          :label-value="parseInt(trap.distance) + ' meter'"
          label-always
        />
      </div>

      <q-space />

      <div class="coulmn q-mt-xl">
        <q-btn
          class="q-ma-sm"
          size="sm"
          color="accent"
          round
          dense
          icon="remove"
		  @click="removeTrap(key)"
        />
      </div>
    </div>
    <!-- <q-input
			v-model.number="model"
			@input="update"
			type="number"
			outlined
			label="Number of Traps"
			stack-label
			/> -->
  </div>
</template>

<script>
export default {
  props: ["trapsConfiguration"],
  data() {
    return {
      model: 1,
      count: 0,
      distance: 2000,
      traps: []
    };
  },
  methods: {
	  addNewTrap() {
		  this.count ++
		  this.traps.push({trap_number: this.count, point_one: [], point_two: [], distance: 3000});
		  this.updateTrapsConfiguration();
    },
    updateTrap(value, trapNumber) {
      let clonedTraps = []

      this.traps.forEach(trap => {
        clonedTraps.push(trap)
      })
      // get trapObject
      let found = clonedTraps.find(trap => trap.trap_number === trapNumber);
          delete found['distance'];
          found['distance'] = value;

      // replace trap from traps
      this.traps = clonedTraps;

      this.updateTrapsConfiguration()
      //console.log('updating', value, trapNumber, found, this.traps)
    },
	  removeTrap(trapIndex) {
		  let trap_number = 1; 
		  this.count --

		  // remove trap from array
		  this.traps.splice(trapIndex, 1);
		  // re arrange traps id
		  this.traps.forEach(trap => {
			  trap.trap_number = trap_number;
			  trap_number ++;
		  });

		  this.updateTrapsConfiguration();
	  },
	  updateTrapsConfiguration() {
		  this.$emit('update:trapsConfiguration', this.traps)
	  }
  },
  mounted() {
    this.traps = this.trapsConfiguration;
    if(this.trapsConfiguration.length > 0){
      this.count = this.trapsConfiguration[this.trapsConfiguration.length - 1].trap_number;
    }
  },
  computed: {}
};
</script>
<style scoped>
.permission {
  min-width: 170px;
}
.distance {
  min-width: 200px;
}
</style>
