<template lang="pug">
    FormItem(:label="label")
      slot(name="left")
      Input(
        type="text",
        v-if="type === 'text' && show",
        :name="name",
        :placeholder="placeholder",
        :style="styles",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="input",
        :maxlength = "maxLength",
        v-model = "value",
        :required = "required",
        :disabled = "disabled",
        :number = "number",
        :class="{ 'error': showError }",
        :validate="validate"
      )
      Input(
        type="text",
        v-if="type === 'password' && show",
        :name="name",
        :placeholder="placeholder",
        :style="styles",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="input",
        :maxlength = "maxLength",
        v-model = "value",
        :required = "required",
        :disabled = "disabled",
        :number = "number",
        :class="{ 'error': showError }",
        :validate="validate"
      )
      Input(
        type="textarea",
        v-if="type === 'textarea' && show",
        :name="name",
        :placeholder="placeholder",
        :style="styles",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="input",
        :maxlength = "maxLength",
        v-model = "value",
        :required = "required",
        :disabled = "disabled",
        :class="{ 'error': showError }",
        :validate="validate"
      )
      slot(name="right")
      Alert(type="error",show-icon, style="display:inline-block",v-show="showError",ref="msgError") {{errorText}}
</template>

<script>
import mixinsInput from '@/mixins/mixinsInput'
export default {
  mixins: [mixinsInput],
  name: 'compInput',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    styles: {
      type: String,
      default: 'width: 240px'
    },
    validate: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>
