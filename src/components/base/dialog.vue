<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content" v-if="isShow">
          <p class="dialog-close" @click.stop="closeMyself">x</p>
          <slot>empty</slot>
        </div>
      </transition>
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
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
.drop-enter-active{
  transition: all .8s ease;
}
.drop-leave-active{
  transition: all .5s ease;
}
.drop-enter{
  transform: translateY(-500px);
}
.drop-leave-to{
  transform: translateY(-500px);
}

.dialog-wrap{
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}
.dialog-content{
  position: fixed;
  top: 20%;
  left: 50%;
  z-index: 100;
  padding: 3% 2%;
  margin-left: -25%;
  width: 50%;
  max-height: 50%;
  background: #fff;
  border-radius: 6px;
  border: 2px solid #666;
  overflow: auto;
  line-height: 1.6;
}
.dialog-close{
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
  font-size: 18px;
  color: #666;
}
.dialog-close:hover{
  color: #4fc098;
}
</style>
