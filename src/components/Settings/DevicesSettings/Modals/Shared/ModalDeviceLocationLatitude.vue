<template>
	<div class="q-mb-sm location-name">
		<q-input
			outlined
			:value="locationLatitude"
			@input="$emit('update:locationLatitude', $event)"
			v-select-all
			ref="modalDeviceLocationLatitude"
			label="Location Latitude"
			stack-label
			mask="##.######"
			fill-mask="0"
			/>
			
	</div>
</template>

<script>
	import { selectAll } from 'src/directives/directive-select-all'

	export default {
		props: ['locationLatitude'],
		data() {
			return {
			}
		},
		directives: {
			selectAll
		}
	}
</script>

<style scoped>
.location-name {
	max-width: 25%;
	margin: 0 2% 0 0;
}
</style>
