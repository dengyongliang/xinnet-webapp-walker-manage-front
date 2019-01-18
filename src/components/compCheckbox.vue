<template lang="pug">
div.compCheckbox(style="display:inline-block")
  CheckboxGroup(v-model="value", @on-change="onChange",)
    Checkbox(v-for="item in list", :label="item.label")
      span {{item.value}}
</template>

<script>
export default {
  name: 'compCheckbox',
  props: {
    onParentmethod: {
      type: Function
    },
    name: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 99999
    },
    list: {
      type: Array,
      default: function () {
        return {
          data: [
          ]
        }
      }
    },
    type: {
      type: String,
      default: 'checkbox'
    },
    defaultValue: {
      type: Array,
      default: function () {
        return {
          data: [
          ]
        }
      }
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
    onChange (v) {
      this.showError = false
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {

        this.onParentmethod({from: this.from, value: this.value, index: this.index})
      }
    }
  },
  beforeMount () {
    if (this.defaultValue.length) {
      this.value = this.defaultValue.map((v)=>{
        return v.label
      })
    }
  },
  mounted () {

  },
  computed: {
  },
  watch: {
    defaultValue (val) {
      this.value = val.map((v)=>{
        return v.label
      })
    }
  }
}
</script>
