<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <view class="header-top">
        <text class="back-icon" @click="goBack">←</text>
        <text class="header-title">我的收藏</text>
        <view class="header-spacer" />
      </view>
      <view class="search-wrap">
        <text class="search-icon">🔍</text>
        <input type="text" placeholder="搜索收藏的攻略..." class="search-input" />
      </view>
    </view>

    <!-- Grid -->
    <view class="grid">
      <view
        v-for="item in favorites"
        :key="item.id"
        class="card"
        @click="viewDetail(item)"
      >
        <image :src="item.img" class="card-img" mode="aspectFill" />
        <view class="card-info">
          <text class="card-title">{{ item.title }}</text>
          <text class="card-time">{{ item.time }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useNavStore } from '@/store/useNavStore'

const navStore = useNavStore()

const favorites = ref([
  { id: 1, title: '2026潮汕英歌舞观看指南：时间与地点全揭秘', time: '2026-03-20', img: 'https://picsum.photos/seed/yingge1/400/300' },
  { id: 2, title: '南澳岛两日游保姆级攻略，看最美日落', time: '2026-03-15', img: 'https://picsum.photos/seed/nanao1/400/300' },
])

const goBack = () => uni.navigateBack()

const viewDetail = (item) => {
  navStore.setParams(item)
  uni.navigateTo({ url: '/pages/strategy-detail/index' })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f9fafb;
}
.header {
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1rpx solid #f3f4f6;
}
.header-top {
  display: flex;
  align-items: center;
  padding: 80rpx 30rpx 16rpx;
}
.back-icon {
  font-size: 40rpx;
  color: #1f2937;
  width: 60rpx;
}
.header-title {
  flex: 1;
  text-align: center;
  font-size: 34rpx;
  font-weight: bold;
  color: #1f2937;
}
.header-spacer { width: 60rpx; }
.search-wrap {
  display: flex;
  align-items: center;
  margin: 0 30rpx 20rpx;
  background: #f3f4f6;
  border-radius: 999rpx;
  padding: 16rpx 24rpx;
}
.search-icon {
  font-size: 28rpx;
  margin-right: 12rpx;
}
.search-input {
  flex: 1;
  font-size: 28rpx;
  background: transparent;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  padding: 24rpx;
}
.card {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  border: 1rpx solid #f3f4f6;
}
.card-img {
  width: 100%;
  height: 0;
  padding-bottom: 75%;
}
.card-info {
  padding: 16rpx;
  height: 120rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-title {
  font-size: 24rpx;
  font-weight: bold;
  color: #1f2937;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-time {
  font-size: 20rpx;
  color: #9ca3af;
  margin-top: 8rpx;
}
</style>
