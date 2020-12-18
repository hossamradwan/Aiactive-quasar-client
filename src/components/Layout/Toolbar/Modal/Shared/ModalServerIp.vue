<template>
	<div class="row q-mb-sm">
	<q-input
		outlined
		:value="serverIpToSubmit"
		@input="$emit('update:serverIpToSubmit', $event)"
		:rules="[val => !!val || 'Field is required']"
		autofocus
		v-select-all
		ref="serverIp"
		label="server ip"
		class="col">
			<template v-slot:append>
		<q-icon
			v-if="serverIpToSubmit"
			@click="$emit('update:serverIpToSubmit', '')"
			name="close"
			class="cursor-pointer" />
	  </template>
	</q-input>
	</div>
</template>

<script>
	import { selectAll } from 'src/directives/directive-select-all'

	export default {
		props: ['serverIpToSubmit'],
		data() {
			return {
			}
		},
		directives: {
			selectAll
		}
	}
</script>