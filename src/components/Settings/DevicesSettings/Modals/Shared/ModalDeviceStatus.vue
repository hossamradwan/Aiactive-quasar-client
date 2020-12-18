<template>
	<div class="q-mr-sm permission">
		<q-select
		  outlined
		  @input="$emit('update:deviceStatus', $event.value)"
		  v-model="model"
		  :options="options"
		  label="Device Status"
		  stack-label=""
		  class="col" />

	</div>
</template>

<script>

	export default {
		props: ['deviceStatus'],
		data() {
			return {
				model: {
						label: 'Enabled',
						value: 1
					},
				options: [
					{
						label: 'Enabled',
						value: 1
					},
					{
						label: 'Disabled',
						value: 0
					}
				]
			}
		},
		methods: {

		},
		mounted() {
			if(this.deviceStatus != '') {
				if (this.deviceStatus == 1) this.model = this.options[0]
				if (this.deviceStatus == 0) this.model = this.options[1]
				//this.model = this.devicePort
			}
			//this.$emit('update:devicePort', this.model)
			this.$emit('update:deviceStatus', this.model.value)
		},
		computed: {

		}
	}
</script>
<style scoped>
.permission {
	min-width: 170px;
}

</style>