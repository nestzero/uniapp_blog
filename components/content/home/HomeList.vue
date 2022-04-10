<template>
	<view class="list">
		<view class="list_box" :class="'list_box_'+tabIndex"  v-for="(item,index) in homeList" :key="index">
			<view class="list_box_left">
				<text class="rank">{{index+1}}</text>
			</view>

			<view class="list_box_right">

				<view class="list_box_right_title line-clamp-2">{{item.title}}</view>
				<view class="list_box_right_desc line-clamp-2">{{item.desc}}</view>

				<view class="list_box_right_bottom">
					<view class="list_box_right_bottom_author">{{item.nickname}}</view>

					<view class="hot_box">
						<image
							class="hot_box_icon"
							src="@/static/hot-active.png"
							mode="scaleToFill"
						/>
						<text class="hot_box_text">{{item.views |hotNumber}} 热度</text>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
import {hotNumber} from "@/filters"

	export default {
		name:"HomeList",
		props:{
			listData:{
				type: Array,
				default: () => {
					return [];
				},
				required:true
			},
			tabIndex:{
				type:Number,
				default:()=>{
					return 0;
				}
			}
		},
		filter:{
			hotNumber
		},
		data() {
			return {
				homeList:[],
			};
		},
		watch:{
			listData: {
				handler(val) {
					this.homeList = val;
				},
				immediate: true,
			},
		}
	}
</script>

<style lang="scss" scoped>
.list{


	padding-bottom: 12px;

	&_box{
		display: flex;

		padding: 12px 10px;
		margin: 0 10px;

		background-color: #fff;

		border-radius: 6px;
		box-shadow: 2px 2px 5px 5px rgba(143,143,143,0.1);

		&_left{

			margin-right: 5px;


		}

		&_right{
			width: 100%;

			&_title{
				font-size: 16px;
				font-weight: bold;

				color:#000;
			}

			&_desc{
				font-size: 14px;

				padding-top: 4px;

				color:rgb(10, 9, 9)
			}

			&_bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;

				margin-top: 4px;

				&_author{
					color:#999;
					font-size: 12px;
				}
				
			}
		}
	}
}

.hot_box{

	&_icon{
		width: 20px;
		height: 20px;

		vertical-align: top;
	}

	&_text{
		color:#f94d2a; 
		font-size: 16px;

		margin-left: 5px;
	}
}
</style>
