<template>
  <view class="page">
    <wd-navbar fixed placeholder title="预约导游" left-arrow safeAreaInsetTop @click-left="goBack"></wd-navbar>

    <view class="guide-card">
      <image class="guide-avatar" :src="detail.avatar || 'https://picsum.photos/seed/avatar/200/200'" mode="aspectFill" />
      <view class="guide-info">
        <text class="guide-name">{{ detail.name || "导游" }}</text>
        <text class="guide-label">专业认证导游</text>
      </view>
    </view>

    <view class="section">
      <text class="section-title">预约类型</text>
      <view class="type-cards">
        <view
          class="type-card"
          :class="{ 'type-active': bookingType === 'day' }"
          @click="bookingType = 'day'"
        >
          <text class="type-name">全天预约</text>
          <text class="type-price">¥{{ detail.dayprice || 0 }}<text class="type-unit">/天</text></text>
        </view>
        <view
          class="type-card"
          :class="{ 'type-active': bookingType === 'hour' }"
          @click="bookingType = 'hour'"
        >
          <text class="type-name">按小时预约</text>
          <text class="type-price">¥{{ detail.hourprice || 0 }}<text class="type-unit">/小时</text></text>
        </view>
      </view>
    </view>

    <view class="section">
      <text class="section-title">选择日期</text>
      <scroll-view scroll-x class="date-scroll">
        <view class="date-row">
          <view
            v-for="(day, idx) in detail.timeslot_list || []"
            :key="idx"
            class="date-item"
            :class="{ 'date-active': selectedDate === idx }"
            @click="selectedDate = idx"
          >
            <text class="date-label">{{ day.date }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view v-if="currentSlots.length" class="section">
      <text class="section-title">{{ bookingType === 'day' ? '选择可预约时段' : '选择时间段' }}</text>
      <view class="time-grid">
        <view
          v-for="(slot, idx) in currentSlots"
          :key="idx"
          class="time-slot"
          :class="{ 'time-selected': isSlotSelected(idx) }"
          @click="selectSlot(idx)"
        >
          <text class="time-text">{{ slot }}</text>
        </view>
      </view>
    </view>

    <view class="bottom-spacer" />

    <view class="bottom-bar">
      <view class="price-info">
        <text class="price-label">合计</text>
        <text class="price-amount">¥{{ totalPrice }}</text>
      </view>
      <view class="confirm-btn" :class="{ 'confirm-btn-disabled': submitting }" @click="confirmBooking">
        <text class="confirm-btn-text">{{ submitting ? "submitting..." : "确认预约" }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { getTravelGuideDetail, postTravelCreateBooking } from "@/api/travel"

const detail = ref({})
const bookingType = ref("day")
const selectedDate = ref(0)
const selectedDaySlot = ref(0)
const selectedHours = ref([])
const guideId = ref("")
const submitting = ref(false)

const currentSlots = computed(() => detail.value.timeslot_list?.[selectedDate.value]?.slots || [])
const currentDate = computed(() => detail.value.timeslot_list?.[selectedDate.value]?.date || "")
const sortedSelectedHours = computed(() => [...selectedHours.value].sort((a, b) => a - b))
const selectedTimeslotList = computed(() => sortedSelectedHours.value.map((idx) => currentSlots.value[idx]).filter(Boolean))

const totalPrice = computed(() => {
  if (bookingType.value === "day") {
    return Number(detail.value.dayprice || 0)
  }

  return selectedHours.value.length * Number(detail.value.hourprice || 0)
})

const isSlotSelected = (idx) => {
  if (bookingType.value === "day") {
    return selectedDaySlot.value === idx
  }

  return selectedHours.value.includes(idx)
}

const selectSlot = (idx) => {
  if (bookingType.value === "day") {
    selectedDaySlot.value = idx
    return
  }

  toggleHour(idx)
}

const toggleHour = (idx) => {
  const currentIndex = selectedHours.value.indexOf(idx)
  if (currentIndex === -1) {
    selectedHours.value.push(idx)
    return
  }

  selectedHours.value.splice(currentIndex, 1)
}

const loadDetail = async () => {
  if (!guideId.value) {
    return
  }

  const response = await getTravelGuideDetail({ id: guideId.value })
  if (response.code === 200 && response.data) {
    detail.value = response.data
  }
}

const getFormattedServiceDate = () => {
  if (!currentDate.value) {
    return ""
  }

  return `${currentDate.value} 00:00:00`
}

const confirmBooking = async () => {
  if (submitting.value) {
    return
  }

  if (!guideId.value) {
    uni.showToast({ title: "guide_id missing", icon: "none" })
    return
  }

  if (!currentDate.value) {
    uni.showToast({ title: "请选择日期", icon: "none" })
    return
  }

  let timeslot = ""

  if (bookingType.value === "hour") {
    if (selectedHours.value.length === 0) {
      uni.showToast({ title: "请选择时间段", icon: "none" })
      return
    }

    timeslot = selectedTimeslotList.value.join(",")
  } else {
    timeslot = currentSlots.value[selectedDaySlot.value] || currentSlots.value[0] || ""
  }

  if (!timeslot) {
    uni.showToast({ title: "timeslot missing", icon: "none" })
    return
  }

  const servicetime = getFormattedServiceDate()
  if (!servicetime) {
    uni.showToast({ title: "servicetime missing", icon: "none" })
    return
  }

  submitting.value = true

  try {
    const response = await postTravelCreateBooking({
      guide_id: guideId.value,
      servicetime,
      timeslot,
      booktype: bookingType.value,
    })

    if (response.code === 200) {
      uni.showToast({ title: response.msg || "success", icon: "success" })
      return
    }

    uni.showToast({ title: response.msg || "submit failed", icon: "none" })
  } catch (error) {
    console.error(error)
    uni.showToast({ title: error?.message || "submit failed", icon: "none" })
  } finally {
    submitting.value = false
  }
}

watch(selectedDate, () => {
  selectedDaySlot.value = 0
  selectedHours.value = []
})

watch(bookingType, (value) => {
  if (value === "day") {
    selectedHours.value = []
    selectedDaySlot.value = 0
  }
})

onLoad(async (options) => {
  guideId.value = options?.id || ""
  await loadDetail()
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

.date-active .date-label {
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

.confirm-btn-disabled {
  background: #d1d5db;
}

.confirm-btn-text {
  color: #ffffff;
  font-size: 30rpx;
  font-weight: bold;
}
</style>
