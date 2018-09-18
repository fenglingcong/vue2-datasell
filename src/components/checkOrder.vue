<template>
  <div>
    <checkDialog :isShow="isShowCheckDialog" @on-close="checkStatus">
      请检查你的支付状态！
      <div class="button" @click="checkStatus">开始检查</div>
    </checkDialog>
    <checkDialog :isShow="isShowSuccessDialog" @on-close="toOrderList">购买成功！</checkDialog>
    <checkDialog :isShow="isShowFailDialog" @on-close="toOrderList">购买失败！</checkDialog>
  </div>
</template>
<script>
import checkDialog from '@/components/base/dialog'
export default {
  props: {
    isShowCheckDialog: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      isShowSuccessDialog: false,
      isShowFailDialog: false
    }
  },
  methods: {
    checkStatus () {
      this.$http.post('/api/checkOrder', {orderId: this.orderId})
        .then((res) => {
          this.isShowSuccessDialog = true
          this.$emit('on-close-check-dialog')
        }, (err) => {
          console.log(err)
          this.isShowFailDialog = true
          this.$emit('on-close-check-dialog')
        })
    },
    toOrderList () {
      this.$router.push({path: '/orderList'})
    }
  },
  components: {
    checkDialog
  }
}
</script>
<style scoped>
.button{
  display: inline-block;
  padding: 8px;
  width: 80px;
  background: #4fc08d;
  border-radius: 3px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
</style>
