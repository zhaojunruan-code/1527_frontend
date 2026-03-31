<!--
  description: 自定义tabbar - 潮汕英歌行
-->
<template>
  <view
    class="tabbar-container"
    :style="{ paddingBottom: safeAreaBottom + 'px' }"
  >
    <view
      class="tabbar-item"
      v-for="(item, index) in tabbarList"
      :key="index"
      :style="{ width: `calc(100%/${tabbarList.length})` }"
      @click="useTabbar.handleChangeTabbar(item)"
    >
      <view class="item-top">
        <image
          :src="current == item.id ? item.selectIcon : item.icon"
          mode="widthFix"
        />
      </view>
      <view
        class="item-bottom"
        :class="[current == item.id ? 'item-active' : '']"
      >
        <text>{{ item.text }}</text>
      </view>
    </view>
  </view>
</template>
<script setup>
import { useTabbarStore } from "@/store/useTabbarStore"

defineOptions({ name: "CustomTabbar" })

const useTabbar = useTabbarStore()

const tabbarList = [
  {
    id: 0,
    path: "/pages/home/index",
    icon: "/static/tabbar/home.png",
    selectIcon: "/static/tabbar/home_a.png",
    text: "首页",
  },
  {
    id: 1,
    path: "/pages/service/index",
    icon: "/static/tabbar/service.png",
    selectIcon: "/static/tabbar/service_a.png",
    text: "服务",
  },
  {
    id: 2,
    path: "/pages/ai/index",
    icon: "/static/tabbar/ai.png",
    selectIcon: "/static/tabbar/ai_a.png",
    text: "AI助手",
  },
  {
    id: 3,
    path: "/pages/strategy/index",
    icon: "/static/tabbar/strategy.png",
    selectIcon: "/static/tabbar/strategy_a.png",
    text: "攻略",
  },
  {
    id: 4,
    path: "/pages/profile/index",
    icon: "/static/tabbar/profile.png",
    selectIcon: "/static/tabbar/profile_a.png",
    text: "我的",
  },
]

const safeAreaBottom = ref(0)

onMounted(() => {
  uni.hideTabBar()
  const systemInfo = uni.getSystemInfoSync()
  if (systemInfo.safeAreaInsets) {
    safeAreaBottom.value = systemInfo.safeAreaInsets.bottom || 0
  }
})

const current = computed(() => useTabbar.tabbarIndex)
</script>
<style scoped lang="scss">
view {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.tabbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 110rpx;
  box-shadow: 0 -1px 6px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  padding: 5rpx 0;
  color: #000000;
  z-index: 1000;
  background-color: #ffffff;
  box-sizing: border-box;
}

.tabbar-container .tabbar-item {
  width: 20%;
  height: 100rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.tabbar-container .item-active {
  color: #A60000;
}

.tabbar-container .tabbar-item .item-top {
  width: 52rpx;
  height: 52rpx;
  padding: 4rpx;
}

.tabbar-container .tabbar-item .item-top image {
  width: 100%;
  height: 100%;
}

.tabbar-container .tabbar-item .item-bottom {
  font-size: 22rpx;
  width: 100%;
  margin-top: 4rpx;
}
</style>
