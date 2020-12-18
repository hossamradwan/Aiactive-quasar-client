<template>
	<div class="q-mr-sm text-center permission">
		<q-select
		  outlined
		  @input="$emit('update:deviceBelongTo', stringModel)"
		  v-model="model"
		  multiple
		  :options="filterSystemModules"
		  use-chips
		  label="Belong to"
		  stack-label=""
		  class="col" />

	</div>
</template>

<script>

import { mapState } from 'vuex'
	export default {
		props: ['deviceBelongTo'],
		data() {
			return {
				model: []
			}
		},
		methods: {

		},
		mounted() {
			// console.log('rx ', this.deviceBelongTo);
			// console.log('sys module', this.systemModules);
			if(typeof this.deviceBelongTo == 'string') {
				let joingModules = JSON.parse(this.deviceBelongTo)
				this.model = Array.from(joingModules)
				//console.log('joing module', joingModules);
			}
		},
		computed: {
			...mapState('devices', ['systemModules']),
			filterSystemModules() {
				let payload = []
				this.systemModules.forEach(module => {
					let temp = {
						label: module.label,
						value: module.value
					}
					payload.push(temp)
				})
				return payload
			},
			stringModel() {
				//console.log('converting model to string');
				return JSON.stringify(this.model)
			}
		}
	}
</script>
<style scoped>
.permission {
	min-width: 300px;
}

</style>