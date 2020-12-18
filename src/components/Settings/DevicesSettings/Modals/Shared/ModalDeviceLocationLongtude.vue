<template>
	<div class="q-mb-sm location-name">
		<q-input
			outlined
			:value="locationLongtude"
			@input="$emit('update:locationLongtude', $event)"
			v-select-all
			ref="modalDeviceLocationLongtude"
			label="Location Longtude"
			stack-label
			mask="##.######"
			fill-mask="0"
			/>
	</div>
</template>

<script>
	import { selectAll } from 'src/directives/directive-select-all'

	export default {
		props: ['locationLongtude'],
		directives: {
			selectAll
		}
	}
</script>

<style scoped>
.location-name {
	max-width: 25%;
	/* margin: 0 5% 0 0; */
}
</style>
