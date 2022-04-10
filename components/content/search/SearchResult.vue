<template>
  <view class="search_result">
		<search-result-empty v-if="isEmpty"></search-result-empty>

    <mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallBack"
		>

      <block v-for="(item, index) in resultList" :key="index">
        <view class="search_result_item">
          <search-result-theme :data="item"></search-result-theme>
        </view>
      </block>

    </mescroll-body>

  </view>
</template>

<script>
import { getSearchResult } from "@/api/search";

import SearchResultTheme from "@/components/content/search/SearchResultTheme.vue";
import SearchResultEmpty from "@/components/content/search/SearchResultEmpty.vue";

import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';

export default {
	mixins:[MescrollMixin],
  props: {
    searchVal: {
      type: String,
      required: true,
    },
  },
  components: {
    SearchResultTheme,
		SearchResultEmpty
  },
  data() {
    return {
      page: 1,
      resultList: [],
			//判断是否为首次加载
			isInit:true,
			//mescroll实例
			mescroll:null,
			//是否显示空数据
			isEmpty:false,
    };
  },
  methods: {
		//加载搜索结果数据
    async loadSearchResult() {
      const { data: res } = await getSearchResult({
        q: this.searchVal,
        p: this.page,
      });

			//标题、简介高亮部分样式修改
      res.list.forEach((item) => {
        item.title = item.title.replace(
          "/<em>/g",
          '<em style="color:#f94d2a;margin:0 2px">'
        );

        item.description = item.description.replace(
          "/<em>/g",
          '<em style="color:#f94d2a;margin:0 2px">'
        );
      });

			if (this.page===1) {
				this.resultList = res.list;
			}else {
				this.resultList=this.resultList.concat(res.list);
			}

			if (this.resultList.length===0) {
				this.isEmpty=true
			}
    },
		//首次加载
		async mescrollInit(){
			// await this.loadSearchResult();

			this.isInit=false
			
			console.log(this.mescroll);

			//当前数据加载完成，动画关闭
			this.mescroll.endSuccess();
		},
		//下拉回调
		async downCallback(){
			if (this.isInit) {
				return;
			}

			this.page=1;

			// await this.loadSearchResult();

			this.mescroll.endSuccess();
		},
		//上拉回调
		async upCallBack(){
			if (this.isInit) {
				return;
			}

			this.page+=1;

			// await this.loadSearchResult();

			this.mescroll.endSuccess();
		},
  },
  mounted() {
    // this.loadSearchResult();

		this.mescroll=this.$refs.mescrollRef.mescroll;

  },
};
</script>

<style lang="scss">
.search_result {
  padding: 12px 15px;

  &_item {
    margin-bottom: 16px;
  }
}
</style>
