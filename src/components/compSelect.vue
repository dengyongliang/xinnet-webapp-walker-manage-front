<template lang="pug">
  div(style="display:inline-block")
    slot(name="left")
    Select(v-model="value",style="width:240px",:name="name",@on-change="selectChange")
      Option(v-for="item in list",:value="item.value.toString()", @click.native="getMoreParams(item)") {{ item.label }}
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
    }
  },
  data () {
    return {
      value: '1',
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
  },
  mounted () {
    if (this.defaultValue !== '') {
      this.value = this.defaultValue
    }
  },
  computed: {
  },
  watch: {
    defaultValue (val) {
      if (val !== '') {
        this.value = val
      }
    }
  }
}
</script>
