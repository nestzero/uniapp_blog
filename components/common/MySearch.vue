<template>
  <view class="search">
    <!-- 搜索框聚焦 -->
    <uni-search-bar 
      v-if="isShowInput" 
      class="search_bar" 
      :radius="100"
      :bgColor="config.backgroundColor"
      :placeholder="placeholderText"
      :value="value"
      @confirm="onSearch"
      @focus="onFocus"
      @blur="onBlur"
      @clear="onClear"
      @cancel="onCancel"
      @input="onInput"
    >
      <uni-icons
        slot="clearIcon"
        type="clear"
        color="#999999"
      />
    </uni-search-bar>

    <!-- 搜索框未聚焦 -->
    <view class="search_input" v-else>
      <image src="@/static/search.png" mode="scaleToFill" class="icon" />

      <text class="placeholder">{{ placeholderText }}</text>
    </view>

  </view>
</template>

<script>
export default {
  name: "home-search",
  props: {
    //输入的内容
    value:{
      type:String,

    },
    //是否显示输入框
    isShowInput:{
      type:Boolean,
      default:false
    },
    //配置对象
    config:{
      type:Object,
      default:()=>({
        height:36,
        backgroundColor:'#ffffff',
        icon:'/static/search.png',
        textColor:'#454545',
        border:'1px solid #c9c9c9'
      })
    },
    placeholderText: {
      type: String,
      default: "vue~Javascript",
    },
  },
  data() {
    return {};
  },
  methods:{
    onSearch(){
      this.$emit('search',this.value)
    },
    onFocus(){
      this.$emit('focus',this.value)
    },
    onBlur(){
      this.$emit('blur',this.value)
    },
    onClear(){
      this.$emit('clear',this.value)
    },
    onCancel(){
      this.$emit('cancel',this.value)
    },
    onInput(val){
      console.log('onInput'+val);

      this.$emit('input',val)
    }
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;

  &_bar{
    width: 100%;

  }

  &_input {
    display: flex;

    width: 100%;
    height: 36px;

    background-color: $uni-bg-color;

    border-radius: 15px;
    border: 1px solid #c9c9c9;

    align-items: center;
    padding: 0 10px;

    .icon {
      width: 15px;
      height: 15px;
    }

    .placeholder {
      font-size: 12px;
      color: #999;

      margin-left: 5px;
    }
  }
}
</style>
