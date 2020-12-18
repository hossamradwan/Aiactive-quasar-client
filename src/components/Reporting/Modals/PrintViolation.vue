<template>
	<q-card class="print-violation">
    
        <modal-header
          class="print-hide">
		  Violation Preview
		</modal-header>

        <modal-violation-content
           :violationToPrint="violationToPrint" />


  </q-card>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		data() {
			return {
			}
		},
		watch: {

		},
    components: {
        'modal-header': require('./Shared/ModalHeader').default,
        'modal-violation-content': require('./Shared/ModalViolationContent').default
    },
		methods: {

		},
		mounted() {
		},
		computed: {
			...mapState('reporting', ['violationToPrint'])
		}
	}
</script>
<style scoped>
	.print-violation {
		justify-content: center;
		min-width: 21.5cm;
	}
</style>