<template>
  <view class="tab">
    <view class="tab_box">
      <!-- 滚动视图 -->
      <scroll-view scroll-x class="tab_box_scroll_view" scroll-with-animation :scroll-left="scrollLeft">

        <view class="tab_box_scroll_view_content">

          <view class="tab_box_scroll_view_content_box">

            <block v-for="(item, index) in tabData" :key="index">
              <view
                :id="'_tab_' + index"
                class="tab_box_scroll_view_content_box_item"
                :class="{ tab_item_active: activeIndex === index }"
                @click="onTabClick(index)"
              >
                {{ item.label || item }}
              </view>
            </block>

          </view>

          <!-- label下划线 -->
          <view
            class="underline"
            :style="{
              transform: 'translateX(' + slider.left + 'px)',
              width: defaultConfig.underLineWidth + 'px',
              height: defaultConfig.underLineHeight + 'px',
              backgroundColor: defaultConfig.underLineColor,
            }"
          >
          </view>
          
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tabData: {
      type: Array,
      default: () => {
        return {};
      },
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      activeIndex: -1,

      //滑块离左端的距离
      slider: {
        left: 0,
      },
      //滑块默认属性
      defaultConfig: {
        underLineWidth: 24,
        underLineHeight: 2,
        underLineColor: "#f94d2a",
      },
      //存储每个item的label、下划线分别从每个item到左端的距离
      tabList: [],

      //scrollView的横向滚动条位置
      scrollLeft:0,
    };
  },
  methods: {
    onTabClick(index) {
      this.activeIndex = index;

      this.tabToIndex();

      this.$emit("tabClick", index);
    },
    //获取下划线到当前label的距离
    tabToIndex() {
      if (this.tabList.length===0) return;

      const index = this.activeIndex;

      this.slider = {
        left: this.tabList[index].slider.left,
      };

      this.scrollLeft=this.activeIndex*this.defaultConfig.underLineWidth;
    },
    //更新下划线分别从每个label到左端的距离
    updateTabWidth() {
      let data = this.tabList;

      if (data.length === 0) return;

      const query = uni.createSelectorQuery().in(this);

      data.forEach((item, index) => {
        query
          .select("#_tab_" + index)
          .boundingClientRect((res) => {

            item.slider = {
              left:
                res.left + (res.width - this.defaultConfig.underLineWidth) / 2,
            };

            if (data.length - 1 === index) {
              this.tabToIndex();
            }
          })
          .exec();
      });

    },
  },
  watch: {
    tabData: {
      handler(val) {
        this.tabList = val;

        //完成渲染后再开始更新
        setTimeout(() => {
          this.updateTabWidth()
        }, 0);
      },
      immediate: true,
    },
    defaultIndex: {
      handler(val) {
        this.activeIndex = val;

        //重新计算滑块位置
        this.tabToIndex();
      },
      //immediate:当前的handler回调将会在监听开始之后立即被调用
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.tab {
  font-size: 14px;
  height: 45px;

  line-height: 45px;
  background-color: #fff;

  &_box {
    position: relative;

    display: flex;

    width: 100%;
    height: 45px;

    &_scroll_view {
      width: 100%;
      height: 100%;

      white-space: nowrap;

      box-sizing: border-box;

      &_content {
        position: relative;

        width: 100%;
        height: 100%;

        &_box {
          height: 100%;

          &_item {
            position: relative;

            display: inline-block;

            height: 100%;

            color: #333;
            text-align: center;

            padding: 0 15px;
          }
        }
      }

    }
  }
}

.tab_item_active {
  color: #f94d2a;
}

.underline {
  position: absolute;

  bottom: 0;

  width: 24px;
  height: 2px;

  background-color: #f94d2a;
  border-radius: 3px;
  transition: 0.5s;
}

//隐藏滚动条
/* ifdef H5*/
/deep/.uni-scroll-view::-webkit-scrollbar{
  display: none;
}

/deep/.uni-scroll-view{
  scrollbar-width: none;
}
/* endif */
</style>
