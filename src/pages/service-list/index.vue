<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <view class="back-btn" @click="goBack">
        <text class="back-arrow">←</text>
      </view>
      <text class="header-title">推荐服务</text>
      <view class="header-placeholder" />
    </view>

    <!-- Service Grid -->
    <view class="grid">
      <view
        class="card"
        v-for="item in services"
        :key="item.id"
        @click="goDetail(item)"
      >
        <image class="card-img" :src="item.img" mode="aspectFill" />
        <view class="card-info">
          <text class="card-title">{{ item.title }}</text>
          <text class="card-date">{{ item.date }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useNavStore } from '@/store/useNavStore'

const navStore = useNavStore()

const services = [
  { id: 1, title: '南澳岛一日游', date: '2026-03-21', img: 'https://picsum.photos/seed/nanao/300/400' },
  { id: 2, title: '潮州古城深度游', date: '2026-03-20', img: 'https://picsum.photos/seed/chaozhou/300/400' },
  { id: 3, title: '汕头美食专车', date: '2026-03-19', img: 'https://picsum.photos/seed/food/300/400' },
  { id: 4, title: '普宁英歌舞观赏专线', date: '2026-03-18', img: 'https://picsum.photos/seed/yingge/300/400' },
  { id: 5, title: '揭阳进贤门夜游', date: '2026-03-15', img: 'https://picsum.photos/seed/jieyang/300/400' },
  { id: 6, title: '潮汕非遗文化体验', date: '2026-03-10', img: 'https://picsum.photos/seed/culture/300/400' },
]

const goBack = () => {
  uni.navigateBack()
}

const goDetail = (item) => {
  navStore.setParams({
    title: item.title,
    date: item.date,
    img: item.img,
  })
  uni.navigateTo({ url: '/pages/service-detail/index' })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  height: 88rpx;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
  padding-top: env(safe-area-inset-top);
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-arrow {
  font-size: 36rpx;
  color: #333333;
  font-weight: bold;
}

.header-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #1a1a1a;
}

.header-placeholder {
  width: 60rpx;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx;
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

.card-date {
  display: block;
  font-size: 24rpx;
  color: #999999;
}
</style>
