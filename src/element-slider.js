var Main = {
    data() {
      return {
        value: [4, 8]
      }
    }
  }
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app') 
