<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <VSelection :selections="products" @on-change="productChange"></VSelection>
      </div>
      <div class="order-list-option">
        选择产品2：
        <VSelection :selections="products" @on-change="productChange"></VSelection>
      </div>
      <div class="order-list-option">
        开始日期：
        <VDatePicker :date="startTime" :option="option" @change="getStartTime"></VDatePicker>
      </div>
      <div class="order-list-option">
        结束日期：
        <VDatePicker :date="endTime" :option="option" @change="getEndTime"></VDatePicker>
      </div>
      <div class="order-list-option">
        关键词：<input type="text" class="order-query" v-model.lazy="query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="(head, index) in tableHeads" :key="index" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in tableData" :key="item.orderId">
          <td v-for="head in tableHeads" :key="head.key">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from '@/components/base/selection'
import VDatePicker from 'vue-datepicker/vue-datepicker-es6.vue'
import _ from 'lodash'
export default {
  data () {
    return {
      productId: 0,
      startDate: '',
      endDate: '',
      query: '',
      products: [
        {
          label: '数据统计',
          value: 0
        },
        {
          label: '数据预测',
          value: 1
        },
        {
          label: '流量分析',
          value: 2
        },
        {
          label: '广告发布',
          value: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ],
      startTime: {
        time: ''
      },
      endTime: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'when?',
        inputStyle: {
          'display': 'inline-block',
          'padding': '0 6px',
          'line-height': '25px',
          'font-size': '16px',
          'border': '1px solid #e3e3e3',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0)',
          'border-radius': '0',
          'color': '#333'
        },
        color: {
          header: '#4fc08d',
          headerText: '#fff'
        },
        buttons: {
          ok: '确认',
          cancel: '取消'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      currentOrder: 'asc' // 升序
      // tableData: []
    }
  },
  created () {
    function dateHandle () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1 // js从0开始取
      let day = date.getDate()
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      return year + '-' + month + '-' + day
    }
    this.startTime.time = dateHandle()
    this.endTime.time = dateHandle()
  },
  methods: {
    productChange (param) {
      this.$store.commit('updateparams', {
        key: 'productId',
        val: param.value
      })
      this.$store.dispatch('fetchOrderList')
    },
    getStartTime (time) {
      this.$store.commit('updateparams', {
        key: 'startDate',
        val: time
      })
      this.$store.dispatch('fetchOrderList')
    },
    getEndTime (time) {
      this.$store.commit('updateparams', {
        key: 'endDate',
        val: time
      })
      this.$store.dispatch('fetchOrderList')
      // this.endDate = time
      // this.getList()
    },
    getList () {
      let reqParams = {
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate,
        query: this.query
      }
      this.$http.post('/api/orderList', reqParams)
        .then((res) => {
          if (res.status === 200) {
            this.tableData = res.body.data.list
          };
        }, (err) => {
          console.log(err)
        })
    },
    changeOrderType (headItem) {
      this.tableHeads.map((item) => {
        item.active = false
        return item
      })
      headItem.active = true
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      } else if (this.currentOrder === 'desc') {
        this.currentOrder = 'asc'
      }
      this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
    }
  },
  watch: {
    query () {
      this.$store.commit('updateparams', {
        key: 'query',
        val: this.query
      })
      this.$store.dispatch('fetchOrderList')
      // this.getList()
    }
  },
  mounted () {
    this.$store.dispatch('fetchOrderList')
    console.log(this.$store)
  },
  computed: {
    tableData () {
      return this.$store.getters.getOrderList
    }
  },
  components: {
    VSelection,
    VDatePicker
  }
}
</script>
<style scoped>
.order-wrap{
  margin: 20px auto;
  width: 1200px;
  min-height: 800px;
  overflow: hidden;
}
.order-wrap h3{
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
.order-list-option{
  padding-right: 15px;
  display: inline-block;
}
.order-list-table{
  margin-top: 20px;
}
.order-list-table table{
  width: 100%;
  background: #fff;
}
.order-list-table th,
.order-list-table td{
  padding: 10px 0;
  border: 1px solid #e3e3e3;
  text-align: center;
}
.order-list-table th{
  background: #4fc08d;
  border: 1px solid #4fc08d;
  border-right-color: #e3e3e3;
  color: #fff;
  cursor: pointer;
}
.order-list-table th:last-child{
  border-right-color: #4fc08d;
}
.order-list-table th.active{
  background: #35495e;
}
.order-query{
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
</style>
