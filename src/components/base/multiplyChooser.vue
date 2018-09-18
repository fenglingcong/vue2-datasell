<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in selections" :key="item.value" :title="item.label" @click="toggleSelection(index)" :class="{active: checkActive(index)}">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
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
      nowIndexs: [0]
    }
  },
  methods: {
    toggleSelection (index) {
      if (this.nowIndexs.indexOf(index) === -1) {
        this.nowIndexs.push(index)
      } else {
        this.nowIndexs = _.remove(this.nowIndexs, (idx) => {
          return idx !== index
        })
      }
      let nowObjArray = _.map(this.nowIndexs, (idx) => {
        return this.selections[idx]
      })
      this.$emit('on-change', nowObjArray)
    },
    checkActive (index) {
      return this.nowIndexs.indexOf(index) !== -1
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
