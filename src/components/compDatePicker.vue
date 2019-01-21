<template lang="pug">
  div.compDatePicker(style="display:inline-block")
    slot(name="left")
    DatePicker(:type="types",placeholder="",v-model="value", ref="time",:format="format", @on-change="dataChange",)
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
    type: {
      type: String,
      default: 'datePicker'
    },
    defaultValue: {
      type: Array,
      default: function () {
        return []
      }
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    types: {
      type: String,
      default: 'daterange'
    }
  },
  data () {
    return {
      value: [],
      showError: false,
      errorText: `请选择${this.label}！`
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    dataChange () {
      this.showError = false
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod(this.value)
      }
    }
  },
  beforeMount () {
  },
  mounted () {
    if (this.defaultValue.length > 0) {
      console.log(this.defaultValue)
      this.value = this.defaultValue
    }
  },
  computed: {
  },
  watch: {
    defaultValue (val) {
      if (val.length) {
        this.value = val
      } else {
        this.value = []
      }
    }
  }
}
</script>
