<template>
  <div @click="resetComponent">
    <div class="app-head">
      <div class="app-head-inner">
        <router-link to="/">
          <img src="../assets/logo.png" alt="">
        </router-link>
        <div class="head-nav">
          <ul class="nav-list">
            <li>{{username}}</li>
            <li v-if="username !== ''" class="nav-pile">|</li>
            <li v-if="username !== ''" @click="logoutClick">退出</li>
            <li v-if="username === ''" @click="logClick">登录</li>
            <li class="nav-pile">|</li>
            <li v-if="username === ''" @click="regClick">注册</li>
            <li v-if="username === ''" class="nav-pile">|</li>
            <li @click="aboutClick">关于</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-foot">
      <p>© 2018 yixiao</p>
    </div>
    <myDialog :is-show="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
      <logForm @has-login="successLog"></logForm>
    </myDialog>
    <myDialog :is-show="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
      <regForm></regForm>
    </myDialog>
    <myDialog :is-show="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <p>关于我们拉萨的积分拉三等奖阿斯顿浪费爱上了贷款数量肯定积分撒旦法撒旦法撒旦法撒旦法撒旦法第三方娄底市科技法拉多少积分拉萨的积分撒旦法大</p>
    </myDialog>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus'
import Dialog from '@/components/base/dialog'
import logForm from '@/components/logForm'
import regForm from '@/components/regForm'
export default {
  data () {
    return {
      isShowLogDialog: false,
      isShowRegDialog: false,
      isShowAboutDialog: false,
      username: ''
    }
  },
  components: {
    myDialog: Dialog,
    logForm,
    regForm
  },
  created () {
    let name = localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : ''
    this.username = name
  },
  methods: {
    logClick () {
      this.isShowLogDialog = true
    },
    regClick () {
      this.isShowRegDialog = true
    },
    aboutClick () {
      this.isShowAboutDialog = true
    },
    closeDialog (attr) {
      this[attr] = false
    },
    successLog (data) {
      console.log(data)
      this.closeDialog('isShowLogDialog')
      this.username = data
    },
    logoutClick () {
      this.username = ''
      localStorage.removeItem('isLogin')
    },
    resetComponent () {
      eventBus.$emit('reset-component')
    }
  }
}
</script>

<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
html{
  height: 100%;
}
body {
  position: relative;
  padding-bottom: 110px;
  min-width: 1280px;
  min-height: 100%;
  background: #f0f0f0;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 16px;
  color: #333;
}
.app-head{
  width: 100%;
  min-width: 1280px;
  height: 90px;
  background: #363636;
  line-height: 90px;
  color: #b2b2b2;
}
.app-head-inner{
  width: 1200px;
  margin: 0 auto;
}
.head-logo{
  float: left;
}
.app-head-inner img{
  margin-top: 20px;
  width: 50px;
}
.head-nav{
  float: right;
}
.head-nav ul{
  overflow: hidden;
}
.head-nav li{
  float: left;
  cursor: pointer;
}
.nav-pile{
  padding: 0 10px;
}
.app-foot{
  position: absolute;
  bottom: 0;
  width: 100%;
  min-width: 1280px;
  height: 80px;
  background: #e3e5ef;
  text-align: center;
  line-height: 80px;
  clear: both;
}
/*登录相关*/
.g-form-line{
  padding: 15px 0;
  line-height: 30px;
}
.g-form-label{
  display: inline-block;
  width: 80px;
}
.g-form-input{
  display: inline-block;
}
.g-form-input input{
  padding: 0 10px;
  width: 200px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.g-form-btn{
  padding-left: 80px;
  display: inline-block;
  cursor: pointer;
}
.g-form-btn .button{
  display: block;
  width: 70px;
  height: 30px;
  background: #4fc08d;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  color: #fff;
}
.g-form-error{
  padding-left: 15px;
  color: #f30;
}
</style>
