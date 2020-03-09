<template lang="pug">
.compFocusDomainAdd
  Form(:label-width="80")
    comp-input(name='domain',label="域名：",ref="domain",type="textarea",placeholder="每行一个域名，最多一次添加500个",styles="width:400px")
    FormItem(label="")
      Button(type="primary",@click="submitForm",:loading="loadingBtn") 保存
</template>

<script>
import compInput from './compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  props: {
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    submitForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.domain
      ])
      let domains = this.GLOBALS.TRIM_ALL(this.$refs.domain.value.replace(/[\n\r]/g, ',')).split(',')
      if (result) {
        // 清除空项
        domains = domains.filter((v) => {
          return v.length > 0
        })
        this.$refs.domain.value = domains.join(',').replace(/,/gm, '\n')
        if (domains.length > 500) {
          this.$refs.domain.showValidateResult({text: '最多允许一次提交500个域名！'})
          result = false
        } else {
          for (var i = 0; i < domains.length; i++) {
            if (!this.GLOBALS.IS_DOMAIN_AVAILABLE(domains[i])) {
              result = false
              this.$refs.domain.showValidateResult({text: '域名格式错误！'})
              break
            }
          }
        }
      }
      if (result) {
        var params = {
          domainNames: domains.join(',')
        }
        this.$store.dispatch('FOLLOW_DOMAIN_CREATE', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success(`添加成功：${response.data.countSuccess}个，失败：${response.data.countFaild}个`)
            // close
            this.$emit('closeDrawer')
            // 添加成功，重新加载列表数据
            this.$emit('refreshData')
          } else {
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    }
  },
  computed: {
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>
<style>
.compFocusDomainAdd{
  padding: 0 30px 30px 30px;
}
.compFocusDomainAdd .ivu-input-wrapper textarea{
  height: 200px;
}
.compFocusDomainAdd .ivu-btn{
  margin-top: 30px;
}
</style>
