export default {
  install (Vue) {
    Vue.directive('focus', {
      inserted: function (el) {
        const input = el.tagName === 'input' ? el : el.querySelector('input')
        if (input) {
          input.focus()
        }
      }
    })
  }
}
