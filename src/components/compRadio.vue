<template lang="pug">
  div(style="display:inline-block")
    RadioGroup(v-model="value",@on-change="onChange",ref="radio",:name="name")
      Radio(v-for="item in list",:label="item.label") {{item.value}}
    Alert(type="error",show-icon, style="display:inline-block",v-show="showError") {{errorText}}
</template>

<script>
export default {
  name: 'compSelect',
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: 'radio'
    },
    defaultValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: '',
      showError: false,
      errorText: '请选择' + this.label + "！"
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    onChange () {
      this.showError = false
    }
  },
  beforeMount () {
    if (this.defaultValue !== '') {
      this.value = this.defaultValue
    }
  },
  mounted () {

  },
  computed: {
  }
}
</script>
