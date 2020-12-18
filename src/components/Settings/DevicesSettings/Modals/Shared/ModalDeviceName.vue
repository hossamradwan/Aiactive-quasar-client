<template>
	<div class="row q-mb-sm">
	<q-input
		outlined
		:value="deviceName"
		@input="$emit('update:deviceName', $event)"
		:rules="[val => val.length >= 5 || 'Minimum (5) charcater(s) required']"
		lazy-rules
		autofocus
		v-select-all
		ref="modalDeviceName"
		label="Device Name"
		stack-label
		class="col">
			<template v-slot:append>
		<q-icon
			v-if="deviceName"
			@click="$emit('update:deviceName', '')"
			name="close"
			class="cursor-pointer" />
	  </template>
	</q-input>
	</div>
</template>

<script>
	import { selectAll } from 'src/directives/directive-select-all'

	export default {
		props: ['deviceName'],
		directives: {
			selectAll
		}
	}
</script>