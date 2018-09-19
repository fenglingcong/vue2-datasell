import Vue from 'vue'
const state = { // 存放数据
  orderList: [],
  params: {}
}

const getters = { // 页面调取state中数据 commit
  getOrderList: state => state.orderList
}

const actions = { // 不允许对state更改  异步  dispatch
  fetchOrderList ({ commit, state }) {
    Vue.http.post('/api/orderList', state.params)
      .then((res) => {
        commit('updateOrderList', res.body.data.list)
      }, (err) => {
        console.log(err)
      })
  }
}

const mutations = { // 允许对state更改  同步
  updateOrderList (state, payLoad) {
    state.orderList = payLoad
  },
  updateparams (state, {key, val}) {
    state.params[key] = val
    console.log(state.params)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
