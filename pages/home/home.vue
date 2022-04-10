<template>
  <view class="home">
    <image src="@/static/home_logo.jpg" class="logo" mode="aspectFit" />

    <view class="home_search" @click="toSearch">
      <home-search :placeholderText="placeholderText"></home-search>
    </view>

    <view class="tab_sticky">
      <home-tabs
        :tabData="tabData"
        :defaultIndex="currentIndex"
        @tabClick="onTabClick"
      ></home-tabs>
    </view>
    

    <swiper 
      class="swiper" 
      :current="currentIndex" 
      :style="{height:currentSwiperHeight+'px'}" 
      @animationfinish="onSwiperEnd"
      @change="onSwiperChange"
    >
      <swiper-item
        class="swiper_item"
        v-for="(tabItem, tabIndex) in tabData"
        :key="tabIndex"
      >
        <view class="home_list">
          <!-- <uni-load-more status="loading" v-if="isLoading"/>

          <block v-else>
            <home-list :listData="listData[currentIndex]"></home-list>
          </block> -->

          <home-list :listData="listData[tabIndex]" :tabIndex="tabIndex">
          </home-list>
        </view>

      </swiper-item>

    </swiper>

  </view>
</template>

<script>
import HomeSearch from "@/components/common/MySearch.vue";
import HomeTabs from "@/components/common/MyTabs.vue";
import HomeList from "@/components/content/home/HomeList.vue";

import { getHomeTabs, getHotListFromTabType } from "@/api/home";


export default {
  components: {
    HomeSearch,
    HomeTabs,
    HomeList,
  },
  data() {
    return {
      placeholderText: "uni-app~vue",
      tabData: [
        { id: "0", label: "java" },
        { id: "1", label: "vue" },
        { id: "2", label: "C++" },
        { id: "3", label: "React" },
        { id: "4", label: "MySQL" },
        { id: "5", label: "Nodejs" },
        { id: "6", label: "程序人生" },
      ],
      currentIndex: 0,
      //list列表数据加载loading
      isLoading: true,
      listData: {},
      //当前swiper的高度
      currentSwiperHeight:0,
      //缓存高度的计算结果
      swiperHeightData:{},
      //当前的滚动距离
      currentPageScrollTop:0,
    };
  },
  created() {
    // this.loadHomeTabs();
  },
  methods: {
    async loadHomeTabs() {
      const { data: res } = await getHomeTabs();
      this.tabData = res.list;

      this.loadHomeList();
    },
    async loadHomeList() {
      if (this.listData[this.currentIndex]) {
        this.isLoading = true;
        const id = this.tabData[this.currentIndex].id;

        const { data: res } = await getHotListFromTabType(id);

        this.listData[this.currentIndex] = res.list;

        this.isLoading = false;


        //渲染完成后计算home_list高度
        setTimeout(async ()=>{
          this.currentSwiperHeight=await this.getCurrentSwiperHeight();

          this.swiperHeightData[this.currentIndex]=this.currentSwiperHeight;
        },0)
      }
    },
    //点击热门选项
    onTabClick(index) {
      this.currentIndex = index;

      this.loadHomeList();
    },
    //得到当前swiper的高度
    getCurrentSwiperHeight(){
      return new Promise((resolve,reject)=>{
        let sum=0;

        const query=uni.createSelectorQuery().in(this);

        query.selectAll(`.list_box_${this.currentIndex}`).boundingClientRect((res)=>{

          res.forEach((item)=>{
            sum+=item.height;
          });

          resolve(sum);
        })
        .exec();
      });
    },
    //swiper动画切换
    onSwiperChange(e){
      if (this.currentPageScrollTop>130) {
        uni.pageScrollTo({ scrollTop: 130 });
      }

      this.currentIndex=e.detail.current;
    },
    //swiper动画完成
    onSwiperEnd(){
      //判断缓存是否存在
      if (!this.listData[this.currentIndex]) {
        this.loadHomeList();

        return;
      }

      //获取swiper高度
      this.currentSwiperHeight=this.swiperHeightData[this.currentIndex];
    },
    //跳转至搜索界面
    toSearch(){ 
      uni.navigateTo({ url: '/subpkg/pages/search/search' })
    }
  },
  onPageScroll(res) {
    this.currentPageScrollTop=res.scrollTop;
  },
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: $uni-bg-color;

  .logo {
    width: 100%;
    height: 80px;

    margin-bottom: 8px;
  }

  &_search {
    padding: 0 16px;
  }
}

.swiper{

}

.tab_sticky{
  position: sticky;

  /* #ifndef H5*/
  top:0;
  /* #endif */

  /* #ifdef H5*/
  top:44px;
  /* #endif */


  z-index:99;
}
</style>
