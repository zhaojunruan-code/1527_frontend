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

    <!-- Guide Info -->
    <view class="content">
      <view class="guide-header">
        <text class="guide-name">{{ params.name || '导游' }}</text>
        <text class="guide-orders">已服务 {{ params.orders || 0 }} 单</text>
      </view>

      <!-- Tags -->
      <view class="tags">
        <view class="tag" v-for="(tag, idx) in tagList" :key="idx">
          <text class="tag-text">{{ tag }}</text>
        </view>
      </view>

      <!-- Bio Section -->
      <view class="section">
        <text class="section-title">个人简介</text>
        <text class="bio">
          拥有多年潮汕地区导游经验，精通潮州话和普通话，对潮汕历史文化、民俗风情有深入研究。擅长为游客讲解英歌舞的历史渊源和文化内涵，熟悉潮汕各地美食和景点，能够根据游客需求定制个性化的旅游路线。热情好客，服务周到，深受游客好评。
        </text>
      </view>

      <!-- Available Time Slots -->
      <view class="section">
        <text class="section-title">可预约时间</text>
        <view class="date-list">
          <view class="date-block" v-for="(day, idx) in availableDates" :key="idx">
            <text class="date-label">{{ day.date }}</text>
            <view class="slots">
              <view
                class="slot"
                :class="{ 'slot-full': slot.full }"
                v-for="(slot, sIdx) in day.slots"
                :key="sIdx"
              >
                <text class="slot-time">{{ slot.time }}</text>
                <text class="slot-status">{{ slot.full ? '已满' : '可约' }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Bottom Bar -->
    <view class="bottom-bar">
      <view class="book-btn" @click="goBooking">
        <text class="book-btn-text">立即预约</text>
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
const tagList = ref([])

const availableDates = [
  {
    date: '03月23日（今天）',
    slots: [
      { time: '09:00-12:00', full: false },
      { time: '14:00-17:00', full: true },
      { time: '18:00-21:00', full: false },
    ],
  },
  {
    date: '03月24日（明天）',
    slots: [
      { time: '09:00-12:00', full: false },
      { time: '14:00-17:00', full: false },
      { time: '18:00-21:00', full: true },
    ],
  },
  {
    date: '03月25日（后天）',
    slots: [
      { time: '09:00-12:00', full: true },
      { time: '14:00-17:00', full: false },
      { time: '18:00-21:00', full: false },
    ],
  },
]

onLoad(() => {
  params.value = navStore.params || {}
  swiperImages.value = [
    params.value.img || 'https://picsum.photos/seed/guide1/750/500',
    'https://picsum.photos/seed/guide2/750/500',
    'https://picsum.photos/seed/guide3/750/500',
  ]
  const rawTags = params.value.tags
  if (typeof rawTags === 'string') {
    tagList.value = rawTags.split(',').filter(Boolean)
  } else if (Array.isArray(rawTags)) {
    tagList.value = rawTags
  }
})

const goBack = () => {
  uni.navigateBack()
}

const goBooking = () => {
  navStore.setParams({
    name: params.value.name,
    img: params.value.img,
    tags: params.value.tags,
    orders: params.value.orders,
  })
  uni.navigateTo({ url: '/pages/guide-booking/index' })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 140rpx;
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

.guide-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.guide-name {
  font-size: 40rpx;
  font-weight: bold;
  color: #1a1a1a;
}

.guide-orders {
  font-size: 26rpx;
  color: #a60000;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-bottom: 36rpx;
}

.tag {
  padding: 8rpx 24rpx;
  background: rgba(166, 0, 0, 0.08);
  border-radius: 30rpx;
}

.tag-text {
  font-size: 24rpx;
  color: #a60000;
}

.section {
  margin-bottom: 36rpx;
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

.bio {
  display: block;
  font-size: 28rpx;
  color: #666666;
  line-height: 1.8;
}

.date-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.date-block {
  background: #fafafa;
  border-radius: 16rpx;
  padding: 24rpx;
}

.date-label {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16rpx;
}

.slots {
  display: flex;
  gap: 16rpx;
  flex-wrap: wrap;
}

.slot {
  flex: 1;
  min-width: 180rpx;
  padding: 16rpx;
  background: #ffffff;
  border: 2rpx solid #a60000;
  border-radius: 12rpx;
  text-align: center;
}

.slot-full {
  background: #f0f0f0;
  border-color: #cccccc;
}

.slot-time {
  display: block;
  font-size: 24rpx;
  color: #333333;
  margin-bottom: 6rpx;
}

.slot-status {
  display: block;
  font-size: 22rpx;
  color: #a60000;
}

.slot-full .slot-time {
  color: #999999;
}

.slot-full .slot-status {
  color: #999999;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20rpx 30rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background: #ffffff;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.06);
  z-index: 100;
}

.book-btn {
  width: 100%;
  height: 88rpx;
  background: #a60000;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-btn-text {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
}
</style>
