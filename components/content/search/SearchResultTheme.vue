<template>
	<view class="search_result_theme">
		<rich-text :nodes="data.title" class="search_result_theme_title line-clamp-2"></rich-text>

		<rich-text :nodes="data.description" class="search_result_theme_desc line-clamp-2"></rich-text>

		<view class="search_result_theme_desc_bottom">
			<view class="search_result_theme_author">

			</view>

			<view class="search_result_theme_updateTime">
				<uni-icons
					type="compose"
					color="#999999"
					class="search_result_theme_updateTime_icon"
				/>
				<text>{{data.updateTime | relativeTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import {relativeTime} from '@/filters'

	export default {
		props:{
			data:{
				type:Object,
				required:true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.search_result_theme{
	margin-bottom: 16px;

	&_title{
		color: #000;
		font-size: 14px;
		font-weight: bold;

	}

	&_desc{
		color:#555555;
		font-size: 14px;
		
		margin-top: 8px;
	}

	&_desc_bottom{
		display: flex;
		
		color: #999999;
		font-size: 12px;

		margin-top: 8px;
	}

	&_author{
		margin-right: 12px;
	}

	&_updateTime{


		&_icon{
			color:#999999;

			margin-right: 5px;
		}
	}
}
</style>
