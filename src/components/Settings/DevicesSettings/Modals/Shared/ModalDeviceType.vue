<template>
  <div class="q-mr-sm permission">
    <q-select
      outlined
      @input="$emit('update:deviceType', $event.value)"
      v-model="model"
      :options="options"
      label="Device Type"
      stack-label=""
      class="col"
    />
  </div>
</template>

<script>
export default {
  props: ['deviceType'],
  data() {
    return {
      model: {
        label: 'Tattile Smart TL',
        value: 'tattile-TL'
      },
      options: [
        {
          label: 'Tattile Smart TL',
          value: 'tattile-TL'
        },
        {
          label: 'Tattile Smart 2HD',
          value: 'tattile-smart-2HD'
        },
        {
          label: 'Tattile Generic LPR',
          value: 'tattile-generic-LPR'
        },
        {
          label: 'ARH Generic LPR',
          value: 'arh-generic-LPR'
        },
        {
          label: 'Vaxtor LPR',
          value: 'vaxtor-LPR'
        },
        {
          label: 'Hanwha Face Detection',
          value: 'hanwha-face-detection'
        },
        {
          label: 'AiActive LPR',
          value: 'aiactive-lpr'
        },
        {
          label: 'ONVIF',
          value: 'onvif'
        }
      ]
    };
  },
  methods: {},
  mounted() {
    if (this.deviceType != '') {
      this.model = this.options.find(x => x.value == this.deviceType);
      //console.log(rxType);
    }
    this.$emit('update:deviceType', this.model.value);
  },
  computed: {
    // model: {
    // // 	get() {
    // // 		if(this.isAdmin)
    // // 			return {
    // // 				label: 'admin',
    // // 				value: 1
    // // 			}
    // // 		else return {
    // // 			label: 'user',
    // // 			value: 0
    // // 		}
    // // 	},
    // // 	set(value) {
    // // 		//console.log(value);
    // // 	}
    // // }
  }
};
</script>
<style scoped>
.permission {
  min-width: 170px;
}
</style>
