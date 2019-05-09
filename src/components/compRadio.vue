<template lang="pug">
  div(style="display:inline-block")
    RadioGroup(v-model="value",@on-change="onChange",ref="radio",:name="name")
      Radio(v-for="item in list",:label="item.label.toString()",:key="item.label",@click.native="getMoreParams(item)") {{item.value}}
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
      default: function () {
        return []
      }
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
      errorText: `请选择${this.label}！`,
      param: {}// 向外部提供更多数据
    }
  },
  methods: {
    showValidateResult (v) {
      this.showError = true
    },
    onChange () {
      this.showError = false
    },
    getMoreParams (param) {
      this.param = param
      console.log(param)
    }
  },
  beforeMount () {
    if (this.defaultValue !== '') {
      this.value = this.defaultValue
      this.param = this.list.filter((v) => {
        if (this.defaultValue === v.label.toString()) {
          console.log(v)
          return v
        }
      })[0]
      console.log(this.param)
    }
  },
  mounted () {
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
