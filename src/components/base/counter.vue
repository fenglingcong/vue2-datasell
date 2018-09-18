<template>
  <div class="counter-component">
    <div class="counter-btn" @click="minus"> - </div>
    <div class="counter-show">
      <input type="text" v-model="number" @keyup="fixNumber">
    </div>
    <div class="counter-btn" @click="add"> + </div>
  </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default: 5
    },
    min: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: this.min
    }
  },
  watch: {
    number () {
      this.$emit('on-change', this.number)
    }
  },
  methods: {
    fixNumber () {
      let fix
      if (typeof this.number === 'string') {
        fix = Number(this.number.replace(/\D/g, ''))
      } else {
        fix = this.number
      }
      if (fix > this.max || fix < this.min) {
        fix = this.min
      }
      this.number = fix
    },
    minus () {
      if (this.number <= this.min) {
        return
      }
      this.number -= 1
    },
    add () {
      if (this.number >= this.max) {
        return
      }
      this.number += 1
    }
  }
}
</script>
<style scoped>
.counter-component{
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
}
.counter-btn{
  float: left;
  width: 25px;
  height: 25px;
  border: 1px solid #e3e3e3;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
}
.counter-show{
  float: left;
}
.counter-show input{
  width: 30px;
  height: 23px;
  border: none;
  outline: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  line-height: 23px;
  text-align: center;
}
</style>
