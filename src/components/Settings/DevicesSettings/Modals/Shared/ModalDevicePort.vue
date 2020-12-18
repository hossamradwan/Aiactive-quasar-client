<template>
	<div class="q-mr-sm permission">
		<q-input
			v-model.number="model"
			@input="update"
			type="number"
			outlined
			label="Port Number"
			stack-label
			/>

	</div>
</template>

<script>

	export default {
		props: ['devicePort'],
		data() {
			return {
				model: 80
			}
		},
		methods: {
			update() {
				this.$emit('update:devicePort', this.model)
			}
		},
		mounted() {
			if(this.devicePort != '') {
				this.model = this.devicePort
			}
			this.$emit('update:devicePort', this.model)
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