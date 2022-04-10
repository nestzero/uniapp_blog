<template>
  <view class="search_result_empty">
		<image
			src="@/static/search_result_empty.png"
			class="img"
		/>
		<view class="txt">暂无数据</view>
	</view>
</template>

<script>

export default {
  data() {
    return {

		};
  },
};
</script>

<style lang="scss" scoped>
.search_result_empty{
	display: flex;
	flex-direction: column;
	align-items: center;

	padding-top: 35%;
}

.img{
	width: 64px;
	height: 64px;
}

.txt{
	color: #999999;
	font-size: 14px;

	margin-top: 4px;
}
</style>
