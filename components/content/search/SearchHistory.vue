<template>
  <view class="search_history">

    <view class="search_history_box">
      <view class="search_history_box_title">搜索历史</view>

      <view v-if="!isShowClear">
        <uni-icons type="trash" @click="isShowClear = true" />
      </view>

      <view v-else>
        <text class="txt" @click="onClearAll">全部删除</text>
        <text class="txt" @click="isShowClear = false">完成</text>
      </view>

    </view>

    <view class="search_history_main">
      <block v-for="(item, index) in searchData" :key="index">
				<view class="search_history_main_item">
					<text class="history_text line-clamp" @click="onSearchClick(item)">{{item}}</text>

					<uni-icons
						type="clear"
						v-show="isShowClear"
						@click="onHistoryItemClick(index)"
					/>

				</view>
				
			</block>

    </view>

  </view>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  data() {
    return {
      isShowClear: false,
    };
  },
	methods:{
		...mapMutations('search',['removeSearchData','removeAllSearchData']),
		// onRemoveAllSearchData(){
		// 	this.$emit("removeAllSearchData")
		// },
		// onRemoveSearchData(index){
		// 	this.$emit("removeSearchData",index)
		// },
		onClearAll(){
			uni.showModal({
				title: '提示',
				content: '删除搜索历史数据?',
				showCancel: true,
				success: ({ confirm, cancel }) => {
					if (confirm) {
						this.removeAllSearchData();

						this.isShowClear=false;
					}
				}
			})
		},
		onHistoryItemClick(index){
				
			this.removeSearchData(index);
		},
		onSearchClick(item){
			this.$emit('onSearch',item)
		}
	},
	computed:{
		...mapState('search',['searchData'])
	}
};
</script>

<style lang="scss">
.search_history {

	padding: 12px 15px;

  &_box{
		display: flex;
		justify-content: space-between;

		&_title{
			font-size: 12px;
			color:#333;

			padding: 4px 5px;
		}
  }

	&_main{
		margin-top: 15px;

		&_item{
			display: inline-block;

			position: relative;

			width: 50%;

			box-sizing: border-box;

			padding: 8px 10px;
		}

		&_item:nth-child(odd):before{
			position: absolute;

			top:50%;
			right:0;

			display: inline-block;

			height: 10px;

			content:'';
			border-left: 1px solid #999;

			transform: translateY(-50%);
		}
	}
}

.txt{
	color:#999;
	font-size: 12px;

	padding: 4px 5px;
}

.history_text{
	display: inline-block;

	width: 85%;

	color:#333;
	font-size: 14px;
}
</style>
