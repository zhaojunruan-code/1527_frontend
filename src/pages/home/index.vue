<template>
  <view class="page">
    <!-- Header / Search -->
    <view class="header">
      <view class="header-inner">
        <text class="header-title">潮汕·英歌行</text>
      </view>
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          type="text"
          placeholder="搜索服务、潮汕攻略..."
          disabled
        />
      </view>
    </view>

    <!-- Carousel Banner -->
    <view class="px-4 mt-4">
      <view class="banner-wrap">
        <swiper
          class="banner-swiper"
          :indicator-dots="true"
          indicator-active-color="#A60000"
          indicator-color="rgba(255,255,255,0.5)"
          autoplay
          circular
        >
          <swiper-item v-for="(item, idx) in banners" :key="idx">
            <image class="banner-img" :src="item.img" mode="aspectFill" />
            <view class="banner-overlay">
              <text class="banner-text">{{ item.text }}</text>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>

    <!-- Grid Shortcuts -->
    <view class="grid-section">
      <view
        class="grid-item"
        v-for="item in gridItems"
        :key="item.label"
        @click="item.action"
      >
        <view class="grid-icon-wrap">
          <text class="grid-icon">{{ item.icon }}</text>
        </view>
        <text class="grid-label">{{ item.label }}</text>
      </view>
    </view>

    <!-- Recommended Services -->
    <view class="px-4 mt-6">
      <view class="section-header">
        <view class="section-title-wrap">
          <text class="section-title">推荐服务</text>
        </view>
        <text class="section-more" @click="goServiceList">更多 ></text>
      </view>
      <scroll-view scroll-x class="service-scroll">
        <view class="service-scroll-inner">
          <view
            class="service-card"
            v-for="item in services"
            :key="item.title"
            @click="goServiceDetail(item)"
          >
            <image class="service-img" :src="item.img" mode="aspectFill" />
            <view class="service-info">
              <text class="service-title">{{ item.title }}</text>
              <text class="service-date">发布日期: {{ item.date }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- Strategy Cards -->
    <view class="px-4 mt-6">
      <view class="section-header">
        <view class="section-title-wrap">
          <text class="section-title">潮汕攻略</text>
        </view>
        <text class="section-more" @click="goStrategyTab">更多 ></text>
      </view>
      <view class="strategy-grid">
        <view
          class="strategy-card"
          v-for="item in strategies"
          :key="item.title"
          @click="goStrategyDetail(item)"
        >
          <image class="strategy-img" :src="item.img" mode="aspectFill" />
          <view class="strategy-info">
            <text class="strategy-title">{{ item.title }}</text>
            <text class="strategy-time">{{ item.time }}</text>
          </view>
        </view>
      </view>
    </view>

    <CustomTabbar />
  </view>
</template>

<script setup>
import { useNavStore } from '@/store/useNavStore'
import { useTabbarStore } from '@/store/useTabbarStore'

const navStore = useNavStore()
const tabbarStore = useTabbarStore()

onMounted(() => {
  tabbarStore.tabbarIndex = 0
})

const banners = [
  { img: 'https://picsum.photos/seed/chaoshan-dance/800/400', text: '感受非遗魅力：普宁英歌舞震撼来袭' },
  { img: 'https://picsum.photos/seed/chaozhou-old/800/400', text: '千年古城：潮州古城文化之旅' },
  { img: 'https://picsum.photos/seed/shantou-food/800/400', text: '味蕾盛宴：汕头美食探秘之旅' },
]

const gridItems = [
  { icon: '🚗', label: '旅游包车', action: () => uni.switchTab({ url: '/pages/service/index' }) },
  { icon: '🧑‍🏫', label: '潮汕导游', action: () => uni.switchTab({ url: '/pages/service/index' }) },
  { icon: '🗺️', label: '潮汕攻略', action: () => uni.switchTab({ url: '/pages/strategy/index' }) },
  { icon: '📋', label: '我的订单', action: () => uni.switchTab({ url: '/pages/profile/index' }) },
  { icon: '🎧', label: '在线客服', action: () => uni.navigateTo({ url: '/pages/chat/index' }) },
  { icon: '🤖', label: '智能助手', action: () => uni.switchTab({ url: '/pages/ai/index' }) },
]

const services = [
  { title: '南澳岛一日游', date: '2026-03-21', img: 'https://picsum.photos/seed/nanao/300/200' },
  { title: '潮州古城深度游', date: '2026-03-20', img: 'https://picsum.photos/seed/chaozhou/300/200' },
  { title: '汕头美食专车', date: '2026-03-19', img: 'https://picsum.photos/seed/food/300/200' },
]

const strategies = [
  { title: '2026潮汕英歌舞观看指南：时间与地点全揭秘', time: '2026-03-20', img: 'https://picsum.photos/seed/yingge/150/150' },
  { title: '潮汕牛肉火锅哪家强？本地人吐血推荐', time: '2026-03-18', img: 'https://picsum.photos/seed/beef/150/150' },
]

const goServiceList = () => {
  uni.navigateTo({ url: '/pages/service-list/index' })
}

const goServiceDetail = (item) => {
  navStore.setParams({ title: item.title, date: item.date, img: item.img })
  uni.navigateTo({ url: '/pages/service-detail/index' })
}

const goStrategyTab = () => {
  uni.switchTab({ url: '/pages/strategy/index' })
}

const goStrategyDetail = (item) => {
  navStore.setParams({ title: item.title, time: item.time, img: item.img })
  uni.navigateTo({ url: '/pages/strategy-detail/index' })
}
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 120rpx;
}

.header {
  background: #a60000;
  padding: env(safe-area-inset-top) 30rpx 30rpx;
  border-radius: 0 0 32rpx 32rpx;
  position: relative;
  z-index: 40;
  box-shadow: 0 4rpx 16rpx rgba(166, 0, 0, 0.3);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24rpx;
  margin-bottom: 24rpx;
}

.header-title {
  color: #ffffff;
  font-weight: bold;
  font-size: 40rpx;
  letter-spacing: 4rpx;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 100rpx;
  padding: 16rpx 24rpx;
  box-shadow: inset 0 2rpx 6rpx rgba(0, 0, 0, 0.06);
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

.banner-wrap {
  width: 100%;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

.banner-swiper {
  width: 100%;
  height: 320rpx;
}

.banner-img {
  width: 100%;
  height: 320rpx;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24rpx;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.banner-text {
  color: #ffffff;
  font-weight: bold;
  font-size: 28rpx;
}

.grid-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40rpx 0;
  padding: 40rpx 30rpx;
  margin: 24rpx 30rpx 0;
  background: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.grid-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  background: rgba(166, 0, 0, 0.06);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.grid-icon {
  font-size: 44rpx;
}

.grid-label {
  font-size: 24rpx;
  color: #374151;
  font-weight: 500;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.section-title-wrap {
  border-left: 8rpx solid #a60000;
  padding-left: 16rpx;
}

.section-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #1f2937;
}

.section-more {
  font-size: 24rpx;
  color: #6b7280;
}

.service-scroll {
  white-space: nowrap;
}

.service-scroll-inner {
  display: inline-flex;
  gap: 20rpx;
  padding-bottom: 16rpx;
}

.service-card {
  width: 280rpx;
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  border: 2rpx solid #f3f4f6;
  flex-shrink: 0;
  display: inline-block;
}

.service-card:active {
  transform: scale(0.95);
}

.service-img {
  width: 280rpx;
  height: 192rpx;
}

.service-info {
  padding: 16rpx;
}

.service-title {
  display: block;
  font-size: 26rpx;
  font-weight: bold;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.service-date {
  display: block;
  font-size: 20rpx;
  color: #9ca3af;
  margin-top: 8rpx;
}

.strategy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.strategy-card {
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  border: 2rpx solid #f3f4f6;
}

.strategy-card:active {
  transform: scale(0.95);
}

.strategy-img {
  width: 100%;
  height: 0;
  padding-bottom: 75%;
}

.strategy-info {
  padding: 16rpx;
  height: 120rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.strategy-title {
  font-size: 24rpx;
  font-weight: bold;
  color: #1f2937;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
}

.strategy-time {
  font-size: 20rpx;
  color: #9ca3af;
  margin-top: 8rpx;
}
</style>
