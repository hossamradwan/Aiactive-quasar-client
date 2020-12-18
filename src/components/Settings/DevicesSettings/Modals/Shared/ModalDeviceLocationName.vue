<template>
	<div class="q-mb-sm location-name">
		<q-input
			outlined
			:value="locationName"
			@input="$emit('update:locationName', $event)"
			ref="modalDeviceLocationName"
			label="Location Name"
			stack-label
			class="col">
			<template v-slot:append>
				<q-icon
					v-if="locationName"
					@click="$emit('update:locationName', '')"
					name="close"
					class="cursor-pointer" />
			</template>
		</q-input>
	</div>
</template>

<script>

	export default {
		props: ['locationName']
	}
</script>

<style scoped>
.location-name {
	max-width: 33.33%;
	margin: 0 10% 0 0;
}
</style>
