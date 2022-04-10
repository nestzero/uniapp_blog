const storage_key = "search_list"
//搜索历史缓存数量上限
const history_max=10


export default {
  namespaced: true,

  state: () => {
    return {
      searchData: uni.getStorageSync(storage_key) || []
    }
  },
  mutations: {
    saveToStorage(state) {
      uni.setStorage({
        key: storage_key,
        data: state.searchData
      })
    },
    //搜索历史数据添加
    addSearchData(state, val) {
      if (!val) return;

      const index = state.searchData.findIndex(item => item === val)

      if (index !== -1) {

        state.searchData.splice(index, 1);
      }

      state.searchData.unshift(val);

      //判断搜索历史缓存是否超过最大数量，超过则删除最后一条
      if (state.searchData.length >history_max) {
        state.searchData.splice(history_max,state.searchData.length-history_max);
      }

      this.commit('search/saveToStorage');
    },
    //指定搜索历史数据删除
    removeSearchData(state, index) {

      state.searchData.splice(index, 1)

      this.commit('search/saveToStorage');
    },
    //所有搜索历史数据删除
    removeAllSearchData(state) {
      state.searchData = []

      this.commit('search/saveToStorage');
    }
  }
}