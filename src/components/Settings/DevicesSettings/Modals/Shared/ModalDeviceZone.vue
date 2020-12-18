<template>
<div class="row">

	<template v-if="!showAddZone">
		<div class="permission">
			<q-select
			outlined
			@input="$emit('update:deviceZone', $event)"
			v-model="model"
			:options="deviceZone"
			label="Device Zone"
			stack-label=""
			class="col" />

		</div>

		<div class="q-ma-md">
			<q-btn
			outline
			round
			dense
			@click="showAddZone=true"
			color="primary"
			icon="add" />
			<q-tooltip>
				Add New Zone
			</q-tooltip>
		</div>
	</template>

	<template v-if="showAddZone">
		<div class="permission">
			<q-input
				outlined
				v-model="newZoneValue"
				:rules="[val => val.length >= 5 || 'Min Length of (5) is required']"
				lazy-rules
				ref="newZoneName"
				autofocus
				label="New zone name"
				stack-label
				class="col" />
		</div>

		<div class="q-ma-md">
			<q-btn
			outline
			round
			dense
			@click="addNewZone"
			color="primary"
			icon="check" />
			<q-tooltip>
				Save New Zone
			</q-tooltip>
		</div>
	</template>

</div>
</template>

<script>

	export default {
		props: ['deviceZone'],
		data() {
			return {
				model: {},
				showAddZone: false,
				newZoneValue: ''
			}
		},
		methods: {
			addNewZone() {
				let newZoneValidation = this.$refs.newZoneName
					newZoneValidation.validate()

				if(!newZoneValidation.hasError) {
					this.model = this.newZoneValue
					this.$emit('update:deviceZone', this.model)
					this.showAddZone = false
				}
			}
		},
		mounted() {
			//console.log('prop devices', this.deviceZone);
			this.model = this.deviceZone[0]
			this.$emit('update:deviceZone', this.model)
		},
		computed: {
		}
	}
</script>
<style scoped>
.permission {
	min-width: 215px;
}

</style>