<template lang="pug">
  div(style="display:inline-block")
    slot(name="left")
    Select(v-model="value",:style="styles",:name="name",@on-change="selectChange",:disabled="disabled")
      Option(v-for="item in list",:value="item.value.toString()", :key="item.value", @click.native="getMoreParams(item)") {{ item.label }}
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
      default: function () {
        return []
      }
    },
    type: {
      type: String,
      default: 'select'
    },
    defaultValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    styles: {
      type: String,
      default: 'width: 240px'
    }
  },
  data () {
    return {
      value: '',
      showError: false,
      errorText: `请选择${this.label}！`,
      param: {}
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    selectChange (val) {
      this.showError = false
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod({value: this.value, param: this.param})
      }
    },
    getMoreParams (param) {
      this.param = param
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
  },
  watch: {
    defaultValue (val) {
      this.value = val
    }
  }
}
</script>
