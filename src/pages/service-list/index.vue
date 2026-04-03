<template>
  <view class="page">
    <wd-navbar fixed placeholder :title="pageTitle" left-arrow safeAreaInsetTop @click-left="goBack" />

    <view class="search-wrap">
      <view class="search-bar">
        <AppIcon class="search-icon" name="search" size="18" color="#9ca3af" />
        <input
          v-model.trim="searchText"
          class="search-input"
          type="text"
          placeholder="搜索服务、导览、行程..."
          confirm-type="search"
          @confirm="handleSearch"
        />
        <text v-if="searchText" class="search-clear" @click="clearSearch">清空</text>
      </view>
    </view>

    <view class="grid">
      <view
        v-for="item in serviceListData.list"
        :key="item.id"
        class="card"
        @click="goDetail(item)"
      >
        <image class="card-img" :src="item.image" mode="aspectFill" />
        <view class="card-info">
          <text class="card-title">{{ item.title }}</text>
          <rich-text class="card-content" :nodes="item.content" />
        </view>
      </view>

      <view v-if="!serviceListData.list.length" class="empty-card">
        <text class="empty-text">{{ searchText ? "未找到相关服务" : "暂无服务数据" }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { getTravelServiceList } from "@/api/travel"
import AppIcon from "@/components/AppIcon.vue"
import { useNavStore } from "@/store/useNavStore"

const navStore = useNavStore()
const searchText = ref("")
const serviceListData = ref({
  list: [],
  total: 0,
})

const pageTitle = computed(() => (searchText.value.trim() ? "搜索服务" : "推荐服务"))

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

const loadServiceList = async () => {
  const response = await getTravelServiceList({
    page: 1,
    rows: 100,
    keywords: searchText.value.trim(),
  })

  if (response.code === 200) {
    serviceListData.value = normalizeListData(response)
  }
}

const handleSearch = async () => {
  await loadServiceList()
}

const clearSearch = async () => {
  searchText.value = ""
  await loadServiceList()
}

onLoad(async (options) => {
  searchText.value = decodeURIComponent(options?.keywords || "")
  await loadServiceList()
})

const goBack = () => {
  uni.navigateBack()
}

const goDetail = (item) => {
  navStore.setParams(item)
  uni.navigateTo({ url: `/pages/service-detail/index?id=${item.id}` })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.search-wrap {
  padding: 20rpx;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 999rpx;
  padding: 18rpx 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.04);
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

.grid {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20rpx 20rpx;
  gap: 20rpx;
}

.card {
  width: calc(50% - 10rpx);
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.card-img {
  width: 100%;
  height: 360rpx;
}

.card-info {
  padding: 20rpx;
}

.card-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-content {
  display: block;
  font-size: 24rpx;
  color: #6b7280;
  line-height: 1.6;
}

.card-content :deep(p) {
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.empty-card {
  width: 100%;
  padding: 120rpx 0;
  text-align: center;
}

.empty-text {
  font-size: 28rpx;
  color: #9ca3af;
}
</style>
