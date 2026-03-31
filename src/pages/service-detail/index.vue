<template>
  <view class="page">
    <!-- Image Swiper -->
    <view class="swiper-wrap">
      <swiper
        class="swiper"
        :indicator-dots="true"
        indicator-active-color="#A60000"
        indicator-color="rgba(255,255,255,0.5)"
        autoplay
        circular
      >
        <swiper-item v-for="(img, idx) in swiperImages" :key="idx">
          <image class="swiper-img" :src="img" mode="aspectFill" />
        </swiper-item>
      </swiper>

      <!-- Back Button -->
      <view class="back-btn" @click="goBack">
        <text class="back-arrow">←</text>
      </view>
    </view>

    <!-- Content -->
    <view class="content">
      <text class="title">{{ params.title || '服务详情' }}</text>
      <text class="date">{{ params.date || '' }}</text>

      <view class="section">
        <text class="section-title">服务介绍</text>
        <text class="desc">
          潮汕地区拥有丰富的文化旅游资源，英歌舞作为国家级非物质文化遗产，是潮汕文化的重要代表。我们提供专业的潮汕文化旅游服务，带您深入体验英歌舞表演、潮州古城、汕头美食等特色内容。全程配备专业导游讲解，让您深入了解潮汕历史文化、民俗风情和地方美食，感受潮汕独特的文化魅力。
        </text>
      </view>

      <view class="section">
        <text class="section-title">服务包含</text>
        <view class="includes-list">
          <view class="include-item" v-for="(item, idx) in includeItems" :key="idx">
            <view class="include-dot" />
            <text class="include-text">{{ item }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { useNavStore } from '@/store/useNavStore'

const navStore = useNavStore()
const params = ref({})
const swiperImages = ref([])

const includeItems = [
  '专业导游全程陪同讲解',
  '特色景点门票及交通接送',
  '地道潮汕美食体验安排',
  '英歌舞等非遗文化观赏',
]

onLoad(() => {
  params.value = navStore.params || {}
  swiperImages.value = [
    params.value.img || 'https://picsum.photos/seed/service1/750/500',
    'https://picsum.photos/seed/service2/750/500',
    'https://picsum.photos/seed/service3/750/500',
  ]
})

const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.swiper-wrap {
  position: relative;
  width: 100%;
  height: 500rpx;
}

.swiper {
  width: 100%;
  height: 500rpx;
}

.swiper-img {
  width: 100%;
  height: 500rpx;
}

.back-btn {
  position: absolute;
  top: 90rpx;
  left: 30rpx;
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.back-arrow {
  color: #ffffff;
  font-size: 36rpx;
  font-weight: bold;
}

.content {
  padding: 30rpx;
  background: #ffffff;
  border-radius: 24rpx 24rpx 0 0;
  margin-top: -24rpx;
  position: relative;
  z-index: 5;
}

.title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 12rpx;
}

.date {
  display: block;
  font-size: 26rpx;
  color: #999999;
  margin-bottom: 40rpx;
}

.section {
  margin-bottom: 40rpx;
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20rpx;
  padding-left: 16rpx;
  border-left: 6rpx solid #a60000;
}

.desc {
  display: block;
  font-size: 28rpx;
  color: #666666;
  line-height: 1.8;
}

.includes-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.include-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.include-dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #a60000;
  flex-shrink: 0;
}

.include-text {
  font-size: 28rpx;
  color: #444444;
}
</style>
