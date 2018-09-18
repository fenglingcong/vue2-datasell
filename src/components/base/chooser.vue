<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in selections" :key="item.value" :title="item.label" @click="chosenSelection(index)" :class="{active:index === nowIndex}">{{ item.label }}</li>
    </ul>
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
      nowIndex: 0
    }
  },
  methods: {
    chosenSelection (index) {
      this.nowIndex = index
      this.$emit('on-change', this.selections[index])
    }
  }
}
</script>
<style scoped>
.chooser-component{
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  padding: 0 8px;
  margin-right: 5px;
  height: 25px;
  border-radius: 3px;
  border: 1px solid #e3e3e3;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active{
  background: #4fc08d;
  border-color: #4fc08d;
  color: #fff;
}
</style>
