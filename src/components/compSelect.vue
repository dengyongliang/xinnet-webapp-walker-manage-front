<template lang="pug">
  div(style="display:inline-block")
    slot(name="left")
    Select(v-model="value",style="width:240px",:name="name",@on-change="selectChange")
      Option(v-for="item in list",:value="item.value") {{ item.label }}
    slot(name="right")
    Alert(type="error",show-icon, style="display:inline-block",v-show="showError") 请选择！
</template>

<script>
export default {
  name: 'compSelect',
  props: {
    name: {
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
  },
  data () {
    return {
      value: '',
      showError: false,
      errorText: ''
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    selectChange () {
      this.showError = false
    }
  },
  computed: {
  }
}
</script>
