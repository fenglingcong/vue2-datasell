<template>
  <div class="reg-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">errorText</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" placeholder="请输入密码">
        </div>
        <span class="g-form-error">errorText</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">再次密码：</span>
        <div class="g-form-input">
          <input type="password" placeholder="请再次输入密码">
        </div>
        <span class="g-form-error">errorText</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button">注册</a>
        </div>
        <span class="g-form-error">errorText</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

</style>
