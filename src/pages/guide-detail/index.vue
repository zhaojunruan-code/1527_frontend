<template>
  <view class="page">
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

      <view class="back-btn" @click="goBack">
        <text class="back-arrow">←</text>
      </view>
    </view>

    <view class="content">
      <view class="guide-header">
        <text class="guide-name">{{ detail.name || "导游" }}</text>
        <text class="guide-orders">¥{{ detail.hourprice || 0 }}/小时</text>
      </view>

      <view class="tags">
        <view class="tag" v-for="(tag, idx) in detail.tagsjson_text || []" :key="idx">
          <text class="tag-text">{{ tag }}</text>
        </view>
      </view>

      <view class="section">
        <text class="section-title">个人简介</text>
        <text class="bio">{{ detail.intro || "-" }}</text>
      </view>

      <view class="section">
        <text class="section-title">可预约时间</text>
        <view class="date-list">
          <view class="date-block" v-for="(day, idx) in detail.timeslot_list || []" :key="idx">
            <text class="date-label">{{ day.date }}</text>
            <view class="slots">
              <view
                v-for="(slot, sIdx) in day.slots"
                :key="sIdx"
                class="slot"
              >
                <text class="slot-time">{{ slot }}</text>
                <text class="slot-status">可约</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom-spacer" :style="bottomSpacerStyle" />

    <view class="bottom-bar" :style="bottomBarStyle">
      <view class="bottom-bar-inner">
        <view class="book-btn" @click="goBooking">
          <text class="book-btn-text">立即预约</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { getTravelGuideDetail } from "@/api/travel"

const detail = ref({})
const swiperImages = ref([])
const safeAreaBottom = ref(0)
const guideId = ref("")

const loadDetail = async () => {
  if (!guideId.value) {
    return
  }

  const response = await getTravelGuideDetail({ id: guideId.value })
  if (response.code === 200 && response.data) {
    detail.value = response.data
    swiperImages.value = detail.value.avatar ? [detail.value.avatar] : []
  }
}

onLoad(async (options) => {
  const systemInfo = uni.getSystemInfoSync()
  if (systemInfo.safeAreaInsets) {
    safeAreaBottom.value = systemInfo.safeAreaInsets.bottom || 0
  }

  guideId.value = options?.id || ""
  await loadDetail()
})

const goBack = () => {
  uni.navigateBack()
}

const goBooking = () => {
  uni.navigateTo({ url: `/pages/guide-booking/index?id=${detail.value.id}` })
}

const bottomBarStyle = computed(() => ({
  paddingBottom: `${safeAreaBottom.value + 16}px`,
}))

const bottomSpacerStyle = computed(() => ({
  height: `${safeAreaBottom.value + 128}px`,
}))
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

.bottom-spacer {
  width: 100%;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 18rpx 24rpx 0;
  background: rgba(255, 255, 255, 0.98);
  border-top: 1rpx solid #f1f5f9;
  box-shadow: 0 -8rpx 24rpx rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(16rpx);
  z-index: 100;
  box-sizing: border-box;
}

.bottom-bar-inner {
  width: 100%;
  box-sizing: border-box;
}

.book-btn {
  width: 100%;
  height: 88rpx;
  background: #a60000;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10rpx 20rpx rgba(166, 0, 0, 0.18);
}

.book-btn-text {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
}
</style>
