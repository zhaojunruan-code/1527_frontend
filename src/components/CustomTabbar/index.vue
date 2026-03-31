<template>
  <view
    class="tabbar-container"
    :style="{ paddingBottom: safeAreaBottom + 'px' }"
  >
    <view
      v-for="item in tabbarList"
      :key="item.id"
      class="tabbar-item"
      :class="{ 'tabbar-item-active': current === item.id }"
      :style="{ width: `calc(100% / ${tabbarList.length})` }"
      @click="useTabbar.handleChangeTabbar(item)"
    >
      <view class="item-top">
        <TabbarIcon :name="item.iconName" :active="current === item.id" />
      </view>
      <view class="item-bottom">
        <text>{{ item.text }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useTabbarStore } from "@/store/useTabbarStore"
import TabbarIcon from "./TabbarIcon.vue"

defineOptions({ name: "CustomTabbar" })

const useTabbar = useTabbarStore()

const tabbarList = [
  {
    id: 0,
    path: "/pages/home/index",
    iconName: "home",
    text: "首页",
  },
  {
    id: 1,
    path: "/pages/service/index",
    iconName: "service",
    text: "服务",
  },
  {
    id: 2,
    path: "/pages/ai/index",
    iconName: "ai",
    text: "AI助手",
  },
  {
    id: 3,
    path: "/pages/strategy/index",
    iconName: "strategy",
    text: "攻略",
  },
  {
    id: 4,
    path: "/pages/profile/index",
    iconName: "profile",
    text: "我的",
  },
]

const safeAreaBottom = ref(0)

onMounted(() => {
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
  display: flex;
  align-items: center;
  padding: 8rpx 0 6rpx;
  box-shadow: 0 -8rpx 24rpx rgba(15, 23, 42, 0.08);
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(16rpx);
}

.tabbar-item {
  height: 104rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6b7280;
  transition: color 0.18s ease;
}

.tabbar-item-active {
  color: #a60000;
}

.item-top {
  width: 52rpx;
  height: 52rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-bottom {
  width: 100%;
  margin-top: 6rpx;
  font-size: 20rpx;
  line-height: 1;
  text-align: center;
}
</style>
