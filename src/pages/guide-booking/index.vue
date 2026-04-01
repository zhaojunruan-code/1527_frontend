<template>
  <view class="page">
    <!-- Header -->
    <wd-navbar fixed placeholder title="预约导游" left-arrow safeAreaInsetTop @click-left="goBack"></wd-navbar>

    <!-- Guide Info Card -->
    <view class="guide-card">
      <image class="guide-avatar" :src="params.img || 'https://picsum.photos/seed/avatar/200/200'" mode="aspectFill" />
      <view class="guide-info">
        <text class="guide-name">{{ params.name || '导游' }}</text>
        <text class="guide-label">专业认证导游</text>
      </view>
    </view>

    <!-- Booking Type -->
    <view class="section">
      <text class="section-title">预约类型</text>
      <view class="type-cards">
        <view
          class="type-card"
          :class="{ 'type-active': bookingType === 'fullday' }"
          @click="bookingType = 'fullday'"
        >
          <text class="type-name">全天预约</text>
          <text class="type-price">¥300<text class="type-unit">/天</text></text>
        </view>
        <view
          class="type-card"
          :class="{ 'type-active': bookingType === 'hourly' }"
          @click="bookingType = 'hourly'"
        >
          <text class="type-name">按小时预约</text>
          <text class="type-price">¥50<text class="type-unit">/小时</text></text>
        </view>
      </view>
    </view>

    <!-- Date Selection -->
    <view class="section">
      <text class="section-title">选择日期</text>
      <scroll-view scroll-x class="date-scroll">
        <view class="date-row">
          <view
            class="date-item"
            :class="{ 'date-active': selectedDate === idx }"
            v-for="(day, idx) in dateOptions"
            :key="idx"
            @click="selectedDate = idx"
          >
            <text class="date-label">{{ day.label }}</text>
            <text class="date-value">{{ day.date }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- Time Slot Grid (hourly only) -->
    <view class="section" v-if="bookingType === 'hourly'">
      <text class="section-title">选择时间段</text>
      <view class="time-grid">
        <view
          class="time-slot"
          :class="{ 'time-selected': selectedHours.includes(idx) }"
          v-for="(slot, idx) in timeSlots"
          :key="idx"
          @click="toggleHour(idx)"
        >
          <text class="time-text">{{ slot }}</text>
        </view>
      </view>
    </view>

    <!-- Spacer for bottom bar -->
    <view class="bottom-spacer" />

    <!-- Bottom Bar -->
    <view class="bottom-bar">
      <view class="price-info">
        <text class="price-label">合计</text>
        <text class="price-amount">¥{{ totalPrice }}</text>
      </view>
      <view class="confirm-btn" @click="confirmBooking">
        <text class="confirm-btn-text">确认预约</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { useNavStore } from '@/store/useNavStore'

const navStore = useNavStore()
const params = ref({})

const bookingType = ref('fullday')
const selectedDate = ref(0)
const selectedHours = ref([])

const dateOptions = [
  { label: '今天', date: '03-23' },
  { label: '明天', date: '03-24' },
  { label: '后天', date: '03-25' },
]

const timeSlots = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
  '20:00-21:00',
  '21:00-22:00',
]

const totalPrice = computed(() => {
  if (bookingType.value === 'fullday') return 300
  return selectedHours.value.length * 50
})

const toggleHour = (idx) => {
  const i = selectedHours.value.indexOf(idx)
  if (i === -1) {
    selectedHours.value.push(idx)
  } else {
    selectedHours.value.splice(i, 1)
  }
}

const confirmBooking = () => {
  if (bookingType.value === 'hourly' && selectedHours.value.length === 0) {
    uni.showToast({ title: '请选择时间段', icon: 'none' })
    return
  }
  uni.showToast({ title: '预约成功！', icon: 'success' })
}

onLoad(() => {
  params.value = navStore.params || {}
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

.guide-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin: 20rpx 30rpx;
  padding: 30rpx;
  background: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.guide-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}

.guide-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.guide-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #1a1a1a;
}

.guide-label {
  font-size: 24rpx;
  color: #a60000;
}

.section {
  margin: 20rpx 30rpx;
}

.section-title {
  display: block;
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20rpx;
}

.type-cards {
  display: flex;
  gap: 20rpx;
}

.type-card {
  flex: 1;
  padding: 30rpx 20rpx;
  background: #ffffff;
  border: 2rpx solid #e0e0e0;
  border-radius: 16rpx;
  text-align: center;
  transition: all 0.2s;
}

.type-active {
  border-color: #a60000;
  background: rgba(166, 0, 0, 0.04);
}

.type-name {
  display: block;
  font-size: 28rpx;
  color: #333333;
  margin-bottom: 12rpx;
  font-weight: bold;
}

.type-price {
  font-size: 36rpx;
  color: #a60000;
  font-weight: bold;
}

.type-unit {
  font-size: 22rpx;
  color: #999999;
  font-weight: normal;
}

.date-scroll {
  white-space: nowrap;
}

.date-row {
  display: flex;
  gap: 16rpx;
}

.date-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 36rpx;
  background: #ffffff;
  border: 2rpx solid #e0e0e0;
  border-radius: 12rpx;
  flex-shrink: 0;
}

.date-active {
  border-color: #a60000;
  background: rgba(166, 0, 0, 0.04);
}

.date-label {
  font-size: 26rpx;
  color: #333333;
  font-weight: bold;
}

.date-value {
  font-size: 24rpx;
  color: #999999;
  margin-top: 4rpx;
}

.date-active .date-label {
  color: #a60000;
}

.date-active .date-value {
  color: #a60000;
}

.time-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.time-slot {
  width: calc(33.33% - 12rpx);
  padding: 20rpx 0;
  background: #ffffff;
  border: 2rpx solid #e0e0e0;
  border-radius: 12rpx;
  text-align: center;
}

.time-selected {
  border-color: #a60000;
  background: #a60000;
}

.time-text {
  font-size: 24rpx;
  color: #333333;
}

.time-selected .time-text {
  color: #ffffff;
}

.bottom-spacer {
  height: 160rpx;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background: #ffffff;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.06);
  z-index: 100;
  box-sizing: border-box;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
}

.price-label {
  font-size: 26rpx;
  color: #666666;
}

.price-amount {
  font-size: 40rpx;
  font-weight: bold;
  color: #a60000;
}

.confirm-btn {
  padding: 0 60rpx;
  height: 80rpx;
  background: #a60000;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-btn-text {
  color: #ffffff;
  font-size: 30rpx;
  font-weight: bold;
}
</style>
