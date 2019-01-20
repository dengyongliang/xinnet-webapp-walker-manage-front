<template lang="pug">
  div
    FormItem(:label="label1",class="compInput")
      slot(name="left1")
      Input(
        type="text",
        :name="name1",
        :placeholder="placeholder1",
        :style="styles1",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="money",
        :maxlength = "maxLength",
        v-model = "value1",
        validate="money",
        :class="{ 'error': showMoneyError }"
      )
      slot(name="right1")
      Alert(type="error",show-icon, style="display:inline-block;max-width:350px;",v-show="showMoneyError",ref="msgErrorMoney") {{errorTextMoney}}
    FormItem(:label="label2",class="compInput")
      slot(name="left2")
      Input(
        type="text",
        :name="name2",
        :placeholder="placeholder2",
        :style="styles2",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="reMoney",
        :maxlength = "maxLength",
        v-model = "value2",
        validate="money",
        :class="{ 'error': showReMoneyError }"
      )
      slot(name="right2")
      Alert(type="error",show-icon, style="display:inline-block;max-width:350px;",v-show="showReMoneyError",ref="msgErrorReMoney") {{errorTextReMoney}}
</template>

<script>
import mixinsReMoney from '@/mixins/mixinsReMoney'
export default {
  mixins: [mixinsReMoney],
  name: 'mixinsReMoney',
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
<style scoped>
.ok{
  color:#7aca33;
}
</style>
