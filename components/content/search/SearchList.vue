<template>
  <view class="search_list">
    <view class="search_list_title">全网热搜</view>

    <block v-for="(item, index) in list" :key="index">
      <view class="search_list_item" @click="onItemClick(item)">
        <text>{{ index + 1 }}</text>

        <text class="search_list_item_title line-clamp">{{ item.label }}</text>

        <image
          class="search_list_item_icon"
          src="@/static/hot-active.png"
          v-if="index <= 2"
        />

      </view>
    </block>

  </view>
</template>

<script>
import { getSearchList } from "@/api/search";

export default {
  data() {
    return {
      list: [
				{label:"vue"},
				{label:"JavaScript"},
				{label:"Java"},
				{label:"Python"},
				{label:"React"},
				{label:"TypeScript"},
				{label:"Webpack"},
				{label:"Vite"},
				{label:"uni-app"},
				{label:"Springboot"},
			],
    };
  },
  methods: {
    async loadSearchList() {
      const { data: res } = await getSearchList();

      this.list = res.list;
    },
		onItemClick(item){
			this.$emit('onSearch',item.label);
		}
  },
  mounted() {
    // this.loadSearchList();
  },
};
</script>

<style lang="scss" scoped>
.search_list {

  &_title {
    font-weight: bold;
    font-size: 14px;
    color: #f94d2a;

    padding: 0 12px 12px 12px;
    margin: 0 -12px 12px -12px;

    box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
  }

  &_item {
    display: flex;
    align-items: center;

    padding: 12px 0;

    &_title {
      color: #333;
      font-size: 14px;

      margin: 0 10px;
    }

    &_icon {
			width: 14px;
			height: 14px;
    }
  }
}
</style>
