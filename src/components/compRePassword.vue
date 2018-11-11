<template lang="pug">
  div
    FormItem(:label="label1")
      Input(
        type="text",
        v-if="type === 'text'",
        :name="name1",
        :placeholder="placeholder",
        style="width:240px",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="password",
        :maxlength = "maxLength",
        v-model = "value1",
        :class="{ 'error': showPasswordError }"
      )
      Alert(type="error",show-icon, style="display:inline-block",v-show="showPasswordError",ref="msgErrorPw") {{errorTextPassword}}
    FormItem(:label="label2")
      Input(
        type="text",
        v-if="type === 'text'",
        :name="name2",
        :placeholder="placeholder",
        style="width:240px",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="rePassword",
        :maxlength = "maxLength",
        v-model = "value2",
        :class="{ 'error': showRePasswordError }"
      )
      Alert(type="error",show-icon, style="display:inline-block",v-show="showRePasswordError",ref="msgErrorRePw") {{errorTextRePassword}}
</template>

<script>
import mixinsRePassword from '@/mixins/mixinsRePassword'
export default {
  mixins: [mixinsRePassword],
  name: 'compRePassword',
  props: {

  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {

  }
}
</script>
