<template>
	<div class="q-mb-sm password">
		<q-input
		  outlined
		  :value="userPassword"
		  @input="$emit('update:userPassword', $event)"
		  :rules="[val => !!val || 'Field is required']"
		  lazy-rules
		  ref="modalUserPassword"
		  label="User Password"
		  stack-label
		  class="col"
		  :type="isPwd ? 'password' : 'text'">
			<template v-slot:append>
				<q-icon
					:name="isPwd ? 'visibility_off' : 'visibility'"
					class="cursor-pointer"
					@click="isPwd = !isPwd"
				/>
			</template>
		</q-input>
	</div>
</template>

<script>

	export default {
		props: ['userPassword'],
		data() {
			return {
				password: '',
				isPwd: true
			}
		}
	}
</script>

<style scoped>
.password {
	max-width: 185px;
}

</style>