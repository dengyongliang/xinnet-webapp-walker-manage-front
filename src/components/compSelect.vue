<template lang="pug">
  div(style="display:inline-block")
    slot(name="left")
    Select(v-model="value",style="width:240px",:name="name",@on-change="selectChange")
      Option(v-for="item in list",:value="item.value") {{ item.label }}
    slot(name="right")
    Alert(type="error",show-icon, style="display:inline-block",v-show="showError") {{errorText}}
</template>

<script>
export default {
  name: 'compSelect',
  props: {
    onParentmethod: {
      type: Function
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: 'select'
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
      errorText: '请选择'+ this.label +'！'
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    selectChange (val) {
      this.showError = false
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod(this.value)
      }
    },
  },
  beforeMount () {
  },
  mounted () {
    if (this.defaultValue !== '') {
      this.value = this.defaultValue
    }
  },
  computed: {
  }
}
</script>
