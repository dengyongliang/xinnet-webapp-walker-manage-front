<template lang="pug">
    FormItem(:label="label" :status="leaveInput")
      slot(name="left")
      Input(
        type="text",
        v-if="type === 'text' && show",
        :name="name",
        :placeholder="placeholder",
        style="width:240px",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="input",
        :maxlength = "maxLength",
        :value = "defaultValue",
        :v-focus = "focus",
        :class="{ 'error': showError && show }"
      )
      Input(
        type="text",
        v-if="type === 'password' && show",
        :name="name",
        :placeholder="placeholder",
        style="width:240px",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="input",
        :maxlength = "maxLength",
        :value = "defaultValue",
        :class="{ 'error': showError && show }"
      )
      slot(name="right")
      Alert(type="error",show-icon, style="display:inline-block",v-show="showError && show",ref="msgError") {{errorText}}
</template>

<script>
import mixinsInput from '@/mixins/mixinsInput'
export default {
  mixins: [mixinsInput],
  name: 'compInput',
  props: {

  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    // 如果输入框不在显示范围，清除错误的相关标注
    leaveInput () {
      if (!this.show) {
        this.showError = false
        return false
      }
    }
  }
}
</script>
