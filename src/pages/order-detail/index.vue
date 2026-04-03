<template>
  <view class="page">
    <wd-navbar fixed placeholder title="订单详情" left-arrow safeAreaInsetTop @click-left="goBack" />

    <view class="body">
      <view v-if="isLoading" class="empty">
        <text class="empty-text">订单加载中...</text>
      </view>

      <template v-else-if="order.recordId || order.id">
        <view class="card">
          <view class="status-row">
            <text class="label-bold">订单状态</text>
            <text :class="['status', 'status-' + order.status]">
              {{ order.statusText || getStatusText(order.status) }}
            </text>
          </view>
        </view>

        <view class="card">
          <view v-if="order.type === 'guide'" class="guide-info">
            <image :src="order.guideImg || defaultGuideAvatar" class="guide-avatar" mode="aspectFill" />
            <view class="guide-text">
              <text class="guide-name">{{ order.guideName || order.title }}</text>
              <text class="guide-role">{{ order.booktypeText || order.typeText }}</text>
            </view>
          </view>

          <view v-else class="charter-title-row">
            <text class="label-bold">{{ order.title }}</text>
            <text v-if="order.serviceSummary" class="charter-subtitle">{{ order.serviceSummary }}</text>
          </view>

          <view class="info-rows">
            <view v-if="order.type === 'charter' && order.vehicle" class="info-row">
              <text class="info-label">车型</text>
              <text class="info-value">{{ order.vehicle }}</text>
            </view>
            <view v-if="order.type === 'charter' && order.destination" class="info-row">
              <text class="info-label">目的地/行程</text>
              <text class="info-value">{{ order.destination }}</text>
            </view>
            <view v-if="order.type === 'guide' && order.booktypeText" class="info-row">
              <text class="info-label">预约方式</text>
              <text class="info-value">{{ order.booktypeText }}</text>
            </view>
            <view v-if="order.type === 'guide' && order.timeslot" class="info-row">
              <text class="info-label">服务时段</text>
              <text class="info-value">{{ order.timeslot }}</text>
            </view>
            <view v-if="order.date" class="info-row">
              <text class="info-label">预约时间</text>
              <text class="info-value">{{ order.date }}</text>
            </view>
            <view class="info-row">
              <text class="info-label">订单总价</text>
              <text class="info-value price">¥{{ order.priceText }}</text>
            </view>
          </view>
        </view>

        <view class="card">
          <view class="info-row">
            <text class="info-label">订单编号</text>
            <text class="info-value info-value-break">{{ order.id }}</text>
          </view>
          <view v-if="order.orderTime" class="info-row">
            <text class="info-label">下单时间</text>
            <text class="info-value">{{ order.orderTime }}</text>
          </view>
          <view v-if="order.payTime" class="info-row">
            <text class="info-label">支付时间</text>
            <text class="info-value">{{ order.payTime }}</text>
          </view>
          <view v-if="order.transactionId" class="info-row">
            <text class="info-label">支付流水号</text>
            <text class="info-value info-value-break">{{ order.transactionId }}</text>
          </view>
        </view>

        <view class="card">
          <view v-if="order.contactName" class="info-row">
            <text class="info-label">联系人</text>
            <text class="info-value">{{ order.contactName }}</text>
          </view>
          <view v-if="order.contactPhone" class="info-row">
            <text class="info-label">联系电话</text>
            <text class="info-value">{{ order.contactPhone }}</text>
          </view>
          <view v-if="order.area || order.address" class="info-row info-row-top">
            <text class="info-label">服务地址</text>
            <text class="info-value info-value-multiline">{{ [order.area, order.address].filter(Boolean).join(' ') }}</text>
          </view>
          <view v-if="order.remark" class="info-row info-row-top">
            <text class="info-label">备注</text>
            <text class="info-value info-value-multiline">{{ order.remark }}</text>
          </view>
        </view>
      </template>

      <view v-else class="empty">
        <text class="empty-text">未找到订单信息</text>
      </view>
    </view>

    <view v-if="showActions" class="bottom-bar">
      <view class="bottom-note-wrap">
        <text class="bottom-note">{{ order.typeText }}</text>
      </view>
      <view class="bottom-actions">
        <template v-if="order.status === 'pending_payment'">
          <view class="btn-outline" @click="cancelOrder">
            <text class="btn-text">取消订单</text>
          </view>
          <view class="btn-primary" @click="payOrder">
            <text class="btn-primary-text">立即支付</text>
          </view>
        </template>
        <template v-else-if="order.status === 'pending_service'">
          <view class="btn-outline" @click="cancelOrder">
            <text class="btn-text">取消订单</text>
          </view>
          <view class="btn-outline" @click="contactService">
            <text class="btn-text">联系客服</text>
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getTravelOrderDetail, postTravelCancelOrder, postTravelPayOrder } from '@/api/travel'
import { useNavStore } from '@/store/useNavStore'
import { getTravelOrderStatusText, normalizeTravelOrder } from '@/utils/order'

const defaultGuideAvatar = 'https://picsum.photos/seed/g1/100/100'

const navStore = useNavStore()
const order = ref({})
const orderRecordId = ref('')
const isLoading = ref(false)
const isActionLoading = ref(false)

const showActions = computed(() => ['pending_payment', 'pending_service'].includes(order.value.status))

const getStatusText = (status) => getTravelOrderStatusText(status)

const syncOrder = (payload = {}) => {
  order.value = {
    ...order.value,
    ...payload,
  }

  if (order.value.recordId) {
    navStore.setParams(order.value)
  }
}

const resolveRecordId = (options = {}) => {
  return String(
    options?.id
    || navStore.params?.recordId
    || navStore.params?.raw?.id
    || navStore.params?.id
    || '',
  ).trim()
}

const loadOrderDetail = async () => {
  if (!orderRecordId.value) {
    return
  }

  isLoading.value = true
  try {
    const response = await getTravelOrderDetail({ id: orderRecordId.value })
    if (response.code === 200 && response.data) {
      syncOrder(normalizeTravelOrder(response.data))
    }
  } finally {
    isLoading.value = false
  }
}

onLoad((options) => {
  if (navStore.params?.recordId || navStore.params?.id) {
    syncOrder(navStore.params)
  }

  orderRecordId.value = resolveRecordId(options)
  loadOrderDetail()
})

const goBack = () => {
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
    return
  }

  uni.navigateTo({ url: '/pages/order-list/index' })
}

const cancelOrder = () => {
  if (!order.value.recordId || isActionLoading.value) {
    return
  }

  uni.showModal({
    title: '取消订单',
    content: '确认取消该订单吗？',
    success: async ({ confirm }) => {
      if (!confirm) {
        return
      }

      isActionLoading.value = true
      try {
        const response = await postTravelCancelOrder({ id: order.value.recordId })
        if (response.code === 200) {
          uni.showToast({
            icon: 'success',
            title: response.msg || '订单已取消',
          })
          await loadOrderDetail()
        }
      } finally {
        isActionLoading.value = false
      }
    },
  })
}

const payOrder = async () => {
  if (!order.value.recordId || isActionLoading.value) {
    return
  }

  isActionLoading.value = true
  try {
    const response = await postTravelPayOrder({ id: order.value.recordId })
    if (response.code === 200) {
      uni.showToast({
        icon: 'success',
        title: response.msg || '支付成功',
      })
      await loadOrderDetail()
    }
  } finally {
    isActionLoading.value = false
  }
}

const contactService = () => {
  uni.navigateTo({ url: '/pages/chat/index' })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f9fafb;
  padding-bottom: 180rpx;
}

.body {
  padding: 24rpx;
}

.empty {
  padding: 200rpx 0;
  text-align: center;
}

.empty-text {
  font-size: 28rpx;
  color: #9ca3af;
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
  gap: 20rpx;
}

.label-bold {
  font-size: 30rpx;
  font-weight: bold;
  color: #1f2937;
}

.status {
  flex-shrink: 0;
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

.guide-text {
  flex: 1;
  min-width: 0;
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

.charter-subtitle {
  display: block;
  margin-top: 12rpx;
  font-size: 24rpx;
  line-height: 1.5;
  color: #6b7280;
}

.info-rows {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 24rpx;
}

.info-row-top {
  align-items: flex-start;
}

.info-label {
  flex-shrink: 0;
  font-size: 28rpx;
  color: #6b7280;
}

.info-value {
  flex: 1;
  font-size: 28rpx;
  color: #1f2937;
  text-align: right;
}

.info-value-break {
  word-break: break-all;
}

.info-value-multiline {
  line-height: 1.6;
  word-break: break-word;
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
  gap: 20rpx;
  z-index: 50;
}

.bottom-note-wrap {
  flex: 1;
  min-width: 0;
}

.bottom-note {
  display: inline-flex;
  align-items: center;
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: #fff5f5;
  font-size: 22rpx;
  color: #a60000;
}

.bottom-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
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
