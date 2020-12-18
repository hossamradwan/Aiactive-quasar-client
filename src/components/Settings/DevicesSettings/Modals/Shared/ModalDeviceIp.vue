<template>
	<div class="q-mb-sm device-ip">
	<q-input
		outlined
		:value="deviceIp"
		@input="$emit('update:deviceIp', $event)"
		:rules="[val => idValidIpAddress(val) || 'Valid IP is required']"
		lazy-rules
		ref="modalDeviceIp"
		label="Device IP"
		stack-label
		class="col">
		<template v-slot:append>
			<q-icon
				v-if="deviceIp"
				@click="$emit('update:deviceIp', '')"
				name="close"
				class="cursor-pointer" />
	  </template>
	</q-input>
	</div>
</template>

<script>  

	export default {
		props: ['deviceIp'],

		methods: {
			idValidIpAddress(ipaddress) {
				if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
					return (true)  
				}  
				return (false)   
			}
		}
	}
</script>

<style scoped>
.device-ip {
	min-width: 170px;
}
</style>