// pinia的使用
import { defineStore } from 'pinia'

export const goodsData = defineStore('goods_data', {
  // 数据仓库,最开始stoGoods的初始值为null
  state: () => {
    stoGoods: null
  },
  // 将编辑传过来的值存起来
  actions: {
    editItem(value) {
      this.stoGoods = value// 这个value是点击编辑按钮传过来的值
    }
  }
})