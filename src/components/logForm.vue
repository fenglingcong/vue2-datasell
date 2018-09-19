<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input v-model="userName" type="text" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input v-model="password" type="password" placeholder="请输入1-6位数字字母组合密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
        <span class="g-form-error">{{ errorText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      password: '',
      errorText: ''
    }
  },
  computed: {
    userErrors () {
      let errorText, status
      if (!/@/g.test(this.userName)) {
        status = false
        errorText = '不包含@'
      } else {
        status = true
        errorText = ''
      }
      if (this.userName === '') {
        errorText = ''
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      let errorText, status
      if (!/^\w{1,6}$/g.test(this.password)) {
        status = false
        errorText = '密码不合规'
      } else {
        status = true
        errorText = ''
      }
      if (this.password === '') {
        errorText = ''
      };
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    onLogin () {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '用户名或密码不合规'
      } else {
        this.errorText = ''
        this.$http.get('api/login', {userName: this.userName, password: this.password})
          .then((res) => {
            let name = res.body.data.username
            let pow = res.body.data.userId + ''
            if (name === '123@123' && pow === '123123') {
              this.$emit('has-login', name)
              localStorage.setItem('isLogin', name)
            } else {
              this.errorText = '用户名或密码错误'
            }
          }, (err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
