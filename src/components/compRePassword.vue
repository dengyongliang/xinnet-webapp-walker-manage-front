<template lang="pug">
  div
    FormItem(:label="label1",:status="leaveInput")
      Input(
        type="text",
        v-if="type === 'text' && show",
        name="password",
        :placeholder="placeholder",
        style="width:240px",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="password",
        :maxlength = "maxLength",
        :value = "defaultValue",
        :class="{ 'error': showPasswordError && show }"
      )
      Alert(type="error",show-icon, style="display:inline-block",v-show="showPasswordError && show",ref="msgErrorPw") {{errorTextPassword}}
    FormItem(:label="label2" :status="leaveInput")
      Input(
        type="text",
        v-if="type === 'text' && show",
        name="rePassword",
        :placeholder="placeholder",
        style="width:240px",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="rePassword",
        :maxlength = "maxLength",
        :value = "defaultValue",
        :class="{ 'error': showRePasswordError && show }"
      )
      Alert(type="error",show-icon, style="display:inline-block",v-show="showRePasswordError && show",ref="msgErrorRePw") {{errorTextRePassword}}
</template>

<script>
import mixinsInput from '@/mixins/mixinsInput'
export default {
  mixins: [mixinsInput],
  name: 'compInput',
  props: {
    label1: {
      type: String,
      default: ''
    },
    label2: {
      type: String,
      default: ''
    }
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
        this.showPasswordError = false
        this.showRePasswordError = false
      } else {
      }
    }
  }
}
</script>
