<template>
  <div class="selection-component">
    <div class="selection-show" @click="toggleDrop">
      <span>{{ selections[nowIndex].label }}</span>
      <div class="arrow"></div>
    </div>
    <div class="selection-list" v-if="isDrop">
      <ul>
        <li v-for="(item, index) in selections" :key="index" @click="chooseSelection(index)">{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: () => [{
        label: 'test',
        value: 0
      }]
    }
  },
  data () {
    return {
      isDrop: false,
      nowIndex: 0
    }
  },
  methods: {
    toggleDrop () {
      this.isDrop = !this.isDrop
    },
    chooseSelection (index) {
      this.nowIndex = index
      this.isDrop = false
      this.$emit('on-change', this.selections[this.nowIndex])
    }
  }
}
</script>

<style scoped>
.selection-component{
  position: relative;
  display: inline-block;
}
.selection-show{
  position: relative;
  display: inline-block;
  padding: 0 20px 0 10px;
  height: 25px;
  line-height: 25px;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #e3e3e3;
  cursor: pointer;
}
.selection-show .arrow{
  margin: -1px -14px 0 4px;
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 5px solid #e3e3e3;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  vertical-align: middle;
}
.selection-list{
  display: inline-block;
  position: absolute;
  top: 25px;
  left: 0;
  z-index: 5;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
}
.selection-list li{
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.selection-list li:hover{
  background: #e3e3e3;
}
</style>
