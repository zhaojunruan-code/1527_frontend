<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <text class="back-icon" @click="goBack">←</text>
      <text class="header-title">订单详情</text>
      <view class="header-spacer" />
    </view>

    <view class="body">
      <!-- Status -->
      <view class="card">
        <view class="status-row">
          <text class="label-bold">订单状态</text>
          <text :class="['status', 'status-' + order.status]">{{ getStatusText(order.status) }}</text>
        </view>
      </view>

      <!-- Info -->
      <view class="card">
        <!-- Guide type -->
        <view v-if="order.type === 'guide'" class="guide-info">
          <image :src="order.guideImg || 'https://picsum.photos/seed/g1/100/100'" class="guide-avatar" mode="aspectFill" />
          <view class="guide-text">
            <text class="guide-name">{{ order.guideName || order.title }}</text>
            <text class="guide-role">潮汕资深导游</text>
          </view>
        </view>
        <!-- Charter type -->
        <view v-else class="charter-title-row">
          <text class="label-bold">{{ order.title }}</text>
        </view>

        <view class="info-rows">
          <view v-if="order.type === 'charter'" class="info-row">
            <text class="info-label">车型</text>
            <text class="info-value">{{ order.vehicle }}</text>
          </view>
          <view v-if="order.type === 'charter'" class="info-row">
            <text class="info-label">目的地/行程</text>
            <text class="info-value">{{ order.destination }}</text>
          </view>
          <view class="info-row">
            <text class="info-label">预约时间</text>
            <text class="info-value">{{ order.date }}</text>
          </view>
          <view class="info-row">
            <text class="info-label">订单总价</text>
            <text class="info-value price">¥{{ order.price }}</text>
          </view>
        </view>
      </view>

      <!-- Order meta -->
      <view class="card">
        <view class="info-row">
          <text class="info-label">订单编号</text>
          <text class="info-value">{{ order.id }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">下单时间</text>
          <text class="info-value">{{ order.orderTime }}</text>
        </view>
      </view>
    </view>

    <!-- Bottom actions -->
    <view v-if="order.status === 'pending_payment' || order.status === 'pending_service'" class="bottom-bar">
      <view class="countdown-wrap">
        <text v-if="order.status === 'pending_payment'" class="countdown">支付剩余 {{ countdownText }}</text>
      </view>
      <view class="bottom-actions">
        <template v-if="order.status === 'pending_payment'">
          <view class="btn-outline"><text class="btn-text">取消订单</text></view>
          <view class="btn-primary"><text class="btn-primary-text">立即支付</text></view>
        </template>
        <template v-if="order.status === 'pending_service'">
          <view class="btn-outline"><text class="btn-text">取消订单</text></view>
          <view class="btn-outline"><text class="btn-text">联系客服</text></view>
        </template>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useNavStore } from '@/store/useNavStore'

const navStore = useNavStore()
const order = ref({})
const timeLeft = ref(900)
let timer = null

const countdownText = computed(() => {
  const m = Math.floor(timeLeft.value / 60).toString().padStart(2, '0')
  const s = (timeLeft.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

const getStatusText = (status) => {
  const map = { pending_payment: '待支付', pending_service: '待服务', completed: '已完成', cancelled: '已取消', refund: '退款/售后' }
  return map[status] || ''
}

onLoad(() => {
  order.value = navStore.params || {}
  if (order.value.status === 'pending_payment') {
    timer = setInterval(() => {
      if (timeLeft.value > 0) timeLeft.value--
      else clearInterval(timer)
    }, 1000)
  }
})

onUnload(() => {
  if (timer) clearInterval(timer)
})

const goBack = () => uni.navigateBack()
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f9fafb;
  padding-bottom: 180rpx;
}
.header {
  display: flex;
  align-items: center;
  padding: 80rpx 30rpx 24rpx;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1rpx solid #f3f4f6;
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
.body {
  padding: 24rpx;
}
.card {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  border: 1rpx solid #f3f4f6;
}
.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.label-bold {
  font-size: 30rpx;
  font-weight: bold;
  color: #1f2937;
}
.status {
  font-size: 28rpx;
  font-weight: bold;
}
.status-pending_payment { color: #ef4444; }
.status-pending_service { color: #3b82f6; }
.status-completed { color: #22c55e; }
.status-cancelled { color: #9ca3af; }
.status-refund { color: #f97316; }
.guide-info {
  display: flex;
  align-items: center;
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid #f9fafb;
  margin-bottom: 24rpx;
}
.guide-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 24rpx;
}
.guide-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #1f2937;
  display: block;
}
.guide-role {
  font-size: 24rpx;
  color: #6b7280;
  margin-top: 8rpx;
  display: block;
}
.charter-title-row {
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid #f9fafb;
  margin-bottom: 24rpx;
}
.info-rows {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.info-row {
  display: flex;
  justify-content: space-between;
}
.info-label {
  font-size: 28rpx;
  color: #6b7280;
}
.info-value {
  font-size: 28rpx;
  color: #1f2937;
}
.price {
  color: #A60000;
  font-weight: bold;
}
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1rpx solid #f3f4f6;
  padding: 24rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
}
.countdown {
  font-size: 26rpx;
  color: #ef4444;
  font-weight: 500;
}
.bottom-actions {
  display: flex;
  gap: 20rpx;
}
.btn-outline {
  padding: 16rpx 36rpx;
  border-radius: 999rpx;
  border: 1rpx solid #d1d5db;
}
.btn-text {
  font-size: 28rpx;
  color: #4b5563;
}
.btn-primary {
  padding: 16rpx 36rpx;
  border-radius: 999rpx;
  background: #A60000;
}
.btn-primary-text {
  font-size: 28rpx;
  color: #fff;
}
</style>
