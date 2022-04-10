<template>
  <view class="search">
    <view class="search_box">
      <search
        :isShowInput="true"
        :placeholder="defaultText"
        v-model="searchVal"
        :config="{
          backgroundColor: '#f1f0f3',
        }"
        @search="onSearchConfirm"
        @focus="onSearchFocus"
        @blur="onSearchBlur"
        @clear="onSearchClear"
        @cancel="onSearchCancel"
      >
      </search>
    </view>

    <view class="search_list card" v-if="showType === search_List">
      <search-list @onSearch="onSearchConfirm"></search-list>
    </view>

    <view class="search_history" v-else-if="showType === search_History">
      <search-history @onSearch="onSearchConfirm"></search-history>
    </view>

    <view class="search_result" v-else-if="showType === search_Result">
      <search-result ref="mescrollItem" :searchVal="searchVal"></search-result>
    </view>
  </view>
</template>

<script>
import {mapState,mapMutations} from "vuex";

import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';

import Search from "@/components/common/MySearch.vue";
import SearchList from "@/components/content/search/SearchList";
import SearchHistory from "@/components/content/search/SearchHistory";
import SearchResult from "@/components/content/search/SearchResult";

import { getDefaultText } from "@/api/search";

const search_List = "0";
const search_History = "1";
const search_Result = "2";

export default {
  mixins:[MescrollCompMixin],
  components: {
    Search,
    SearchList,
    SearchHistory,
    SearchResult,
  },
  data() {
    return {
      //输入框内容
      searchVal: "",
      //输入框placeholder
      defaultText: "",
      //通过showType控制热搜列表、搜索历史、搜索结果显示
      showType: search_List,
      search_List,
      search_History,
      search_Result,
    };
  },
  methods: {
    ...mapMutations('search',['addSearchData']),
    async loadDefaultText() {
      const { data: res } = await getDefaultText();

      this.defaultText = res.defaultText;
    },
    onSearchConfirm(val) {
			this.searchVal=val?val:this.defaultText

			this.addSearchData(this.searchVal);

			if (this.searchVal) {
				this.showType=search_Result
			}
    },
    onSearchFocus() {

			this.showType=search_History
    },
    onSearchBlur() {
    },
    onSearchClear() {

			this.showType=search_History
    },
    onSearchCancel() {

			this.showType=search_List
    },
  },
  mounted() {
    // this.loadDefaultText();
  },
};
</script>

<style lang="scss" scoped>
.search {
  &_box {
    position: sticky;

    top: 0px;

    background-color: #fff;

    padding: 5px;

    z-index: 9;
  }
}
</style>
