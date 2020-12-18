<template>
	<div class="q-mb-sm userName">
		<q-input
			outlined
			:value="userName"
			@input="$emit('update:userName', $event)"
			lazy-rules
			ref="modalUserName"
			label="User Name"
			stack-label>
			<template v-slot:append>
				<q-icon
					v-if="userName"
					@click="$emit('update:userName', '')"
					name="close"
					class="cursor-pointer" />
		</template>
		</q-input>
	</div>
</template>

<script>

	export default {
		props: ['userName']
	}
</script>

<style scoped>
.userName {
	min-width: 215px;
}
</style>
