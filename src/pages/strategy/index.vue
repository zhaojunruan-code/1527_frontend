<template>
  <view class="page">
    <z-paging
      layout-only
      class="strategy-paging"
      :fixed="false"
      :show-scrollbar="false"
      :refresher-enabled="false"
      use-page-scroll
    >
      <template #top>
        <view class="header">
          <view class="header-safe-area" :style="{ height: `${safeAreaTop}px` }" />
          <text class="header-title">游玩攻略</text>
          <view class="search-bar">
            <AppIcon class="search-icon" name="search" size="18" color="#9ca3af" />
            <input
              v-model.trim="searchText"
              class="search-input"
              type="text"
              placeholder="搜索攻略、景点、美食..."
              confirm-type="search"
              @confirm="loadStrategyList"
            />
            <text v-if="searchText" class="search-clear" @click="clearSearch">清空</text>
          </view>
        </view>
      </template>

      <view class="page-content">
        <view class="grid">
          <view
            v-for="item in strategyListData.list"
            :key="item.id"
            class="card"
            @click="goDetail(item)"
          >
            <image class="card-img" :src="item.images ? JSON.parse(item.images)[0] : ''" mode="aspectFill" />
            <view class="card-body">
              <text class="card-title">{{ item.title }}</text>
              <text class="card-time">{{ item.position }}</text>
            </view>
          </view>

          <view v-if="strategyListData.list.length === 0" class="empty-state">
            <text class="empty-text">{{ searchText ? "未找到相关攻略" : "暂无攻略数据" }}</text>
          </view>
        </view>

        <view class="tabbar-spacer" />
      </view>
    </z-paging>

    <CustomTabbar />
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { getTravelStrategyList } from "@/api/travel"
import AppIcon from "@/components/AppIcon.vue"
import CustomTabbar from "@/components/CustomTabbar/index.vue"
import { useTabbarStore } from "@/store/useTabbarStore"

const tabbarStore = useTabbarStore()
const safeAreaTop = ref(0)
const searchText = ref("")
const strategyListData = ref({
  list: [],
  total: 0,
})

const normalizeListData = (response) => {
  if (Array.isArray(response?.data)) {
    return {
      list: response.data,
      total: response.data.length,
    }
  }

  return {
    list: Array.isArray(response?.data?.list) ? response.data.list : [],
    total: Number(response?.data?.total) || 0,
  }
}

const loadStrategyList = async () => {
  const response = await getTravelStrategyList({
    page: 1,
    rows: 50,
    keywords: searchText.value.trim(),
  })

  if (response.code === 200) {
    strategyListData.value = normalizeListData(response)
  }
}

const clearSearch = async () => {
  searchText.value = ""
  await loadStrategyList()
}

onLoad(async (options) => {
  const { statusBarHeight } = uni.getSystemInfoSync()
  safeAreaTop.value = statusBarHeight || 0
  tabbarStore.tabbarIndex = 3
  searchText.value = decodeURIComponent(options?.keywords || "")
  await loadStrategyList()
})

const goDetail = (item) => {
  uni.navigateTo({ url: `/pages/strategy-detail/index?id=${item.id}` })
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.strategy-paging {
  height: 100vh;
  background: #f5f5f5;
}

.header {
  background: #a60000;
  padding: 0 30rpx 28rpx;
  border-radius: 0 0 32rpx 32rpx;
  box-shadow: 0 6rpx 18rpx rgba(166, 0, 0, 0.25);
}

.header-safe-area {
  width: 100%;
}

.header-title {
  display: block;
  padding-top: 24rpx;
  padding-bottom: 22rpx;
  color: #ffffff;
  font-size: 38rpx;
  font-weight: 700;
  text-align: center;
}

.search-bar {
  display: flex;
  align-items: center;
  height: 76rpx;
  padding: 0 24rpx;
  border-radius: 999rpx;
  background: #ffffff;
  color: #9ca3af;
  box-shadow: inset 0 2rpx 6rpx rgba(15, 23, 42, 0.05);
}

.search-icon {
  width: 34rpx;
  height: 34rpx;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  margin-left: 12rpx;
  font-size: 26rpx;
  color: #1f2937;
  background: transparent;
}

.search-clear {
  flex-shrink: 0;
  margin-left: 12rpx;
  font-size: 24rpx;
  color: #9ca3af;
}

.page-content {
  padding: 28rpx 24rpx 0;
  box-sizing: border-box;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.card {
  width: calc(50% - 10rpx);
  overflow: hidden;
  border-radius: 14rpx;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4rpx 14rpx rgba(15, 23, 42, 0.04);
  box-sizing: border-box;
}

.card-img {
  width: 100%;
  height: 210rpx;
  display: block;
}

.card-body {
  padding: 16rpx 16rpx 18rpx;
  box-sizing: border-box;
}

.card-title {
  display: -webkit-box;
  overflow: hidden;
  color: #111827;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 1.35;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-time {
  display: block;
  margin-top: 10rpx;
  color: #9ca3af;
  font-size: 20rpx;
}

.empty-state {
  width: 100%;
  min-height: 240rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24rpx;
  background: #ffffff;
}

.empty-text {
  color: #9ca3af;
  font-size: 26rpx;
}

.tabbar-spacer {
  height: 140rpx;
}
</style>
