<template>
  <view class="page">
    <wd-navbar fixed placeholder title="我的订单" left-arrow safeAreaInsetTop @click-left="goBack" />

    <wd-tabs
      v-model="activeTab"
      class="order-tabs"
      color="#A60000"
      inactive-color="#6b7280"
      auto-line-width
      slidable="always"
      sticky
      :offset-top="tabsOffsetTop"
    >
      <wd-tab v-for="tab in tabs" :key="tab.id" :name="tab.id" :title="tab.label">
        <view class="order-list">
          <view v-if="isLoading" class="empty">
            <text class="empty-text">订单加载中...</text>
          </view>

          <view v-else-if="ordersByTab[tab.id].length === 0" class="empty">
            <text class="empty-text">暂无相关订单</text>
          </view>

          <view
            v-for="order in ordersByTab[tab.id]"
            :key="order.recordId || order.id"
            class="order-card"
            @click="viewDetail(order)"
          >
            <view class="order-head">
              <text class="order-id">订单号: {{ order.id }}</text>
              <text :class="['status', `status-${order.status}`]">
                {{ order.statusText || getStatusText(order.status) }}
              </text>
            </view>

            <view class="order-body">
              <view class="order-main">
                <text class="order-title">{{ order.title }}</text>
                <text v-if="order.serviceSummary" class="order-subtitle">{{ order.serviceSummary }}</text>
              </view>
              <text class="order-price">¥{{ order.priceText }}</text>
            </view>

            <text v-if="order.date" class="order-date">预约时间: {{ order.date }}</text>
            <text v-if="order.orderTime" class="order-meta">下单时间: {{ order.orderTime }}</text>

            <view v-if="showActions(order.status)" class="order-footer">
              <view class="countdown-wrap">
                <text class="order-tag">{{ order.typeText }}</text>
              </view>

              <view class="order-actions">
                <template v-if="order.status === 'pending_payment'">
                  <view class="btn-outline" @click.stop="cancelOrder(order)">
                    <text class="btn-text">取消订单</text>
                  </view>
                  <view class="btn-primary" @click.stop="payOrder(order)">
                    <text class="btn-primary-text">立即支付</text>
                  </view>
                </template>

                <template v-else-if="order.status === 'pending_service'">
                  <view class="btn-outline" @click.stop="cancelOrder(order)">
                    <text class="btn-text">取消订单</text>
                  </view>
                  <view class="btn-outline" @click.stop="contactService">
                    <text class="btn-text">联系客服</text>
                  </view>
                </template>
              </view>
            </view>
          </view>
        </view>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script setup>
import { getTravelOrderList, postTravelCancelOrder, postTravelPayOrder } from '@/api/travel'
import { useNavStore } from '@/store/useNavStore'
import {
  extractTravelOrderList,
  getTravelOrderStatusText,
  getTravelOrderTotal,
  normalizeTravelOrder,
} from '@/utils/order'

const ORDER_PAGE_SIZE = 50
const MAX_ORDER_PAGES = 10

const navStore = useNavStore()
const activeTab = ref('all')
const safeAreaTop = ref(0)
const isLoading = ref(false)
const actionOrderId = ref('')
const orders = ref([])

const tabs = [
  { id: 'all', label: '全部' },
  { id: 'pending_payment', label: '待支付' },
  { id: 'pending_service', label: '待服务' },
  { id: 'completed', label: '已完成' },
  { id: 'cancelled', label: '已取消' },
  { id: 'refund', label: '退款/售后' },
]

const tabsOffsetTop = computed(() => safeAreaTop.value + 44)

const ordersByTab = computed(() => {
  return tabs.reduce((result, tab) => {
    result[tab.id] = tab.id === 'all'
      ? orders.value
      : orders.value.filter(order => order.status === tab.id)
    return result
  }, {})
})

const getStatusText = (status) => getTravelOrderStatusText(status)

const showActions = (status) => ['pending_payment', 'pending_service'].includes(status)

const resolveTab = (tab) => {
  return tabs.some(item => item.id === tab) ? tab : 'all'
}

const loadOrders = async () => {
  isLoading.value = true

  try {
    const allOrders = []
    let page = 1
    let total = 0

    do {
      const response = await getTravelOrderList({ page, rows: ORDER_PAGE_SIZE })
      if (response.code !== 200) {
        if (page === 1) {
          orders.value = []
        }
        return
      }

      const pageList = extractTravelOrderList(response)
      allOrders.push(...pageList)
      total = getTravelOrderTotal(response, allOrders.length)

      if (!pageList.length || pageList.length < ORDER_PAGE_SIZE) {
        break
      }

      page += 1
    } while (allOrders.length < total && page <= MAX_ORDER_PAGES)

    orders.value = allOrders.map(order => normalizeTravelOrder(order))
  } finally {
    isLoading.value = false
    uni.stopPullDownRefresh?.()
  }
}

onLoad((options) => {
  const { statusBarHeight } = uni.getSystemInfoSync()
  safeAreaTop.value = statusBarHeight || 0
  activeTab.value = resolveTab(options?.tab)
})

onShow(() => {
  loadOrders()
})

onPullDownRefresh(() => {
  loadOrders()
})

const goBack = () => {
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
    return
  }

  uni.switchTab({ url: '/pages/profile/index' })
}

const viewDetail = (order) => {
  navStore.setParams(order)
  uni.navigateTo({ url: `/pages/order-detail/index?id=${order.recordId}` })
}

const cancelOrder = (order) => {
  if (!order?.recordId || actionOrderId.value) {
    return
  }

  uni.showModal({
    title: '取消订单',
    content: '确认取消该订单吗？',
    success: async ({ confirm }) => {
      if (!confirm) {
        return
      }

      actionOrderId.value = String(order.recordId)

      try {
        const response = await postTravelCancelOrder({ id: order.recordId })
        if (response.code === 200) {
          uni.showToast({
            icon: 'success',
            title: response.msg || '订单已取消',
          })
          await loadOrders()
        }
      } finally {
        actionOrderId.value = ''
      }
    },
  })
}

const payOrder = async (order) => {
  if (!order?.recordId || actionOrderId.value) {
    return
  }

  actionOrderId.value = String(order.recordId)

  try {
    const response = await postTravelPayOrder({ id: order.recordId })
    if (response.code === 200) {
      uni.showToast({
        icon: 'success',
        title: response.msg || '支付成功',
      })
      await loadOrders()
    }
  } finally {
    actionOrderId.value = ''
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
}

.order-tabs {
  background: #f9fafb;
}

.order-tabs :deep(.wd-tabs__nav) {
  background: #ffffff;
  border-bottom: 1rpx solid #f3f4f6;
}

.order-tabs :deep(.wd-tabs__nav-item) {
  padding: 20rpx 30rpx;
}

.order-tabs :deep(.wd-tabs__nav-item-text) {
  font-size: 28rpx;
}

.order-tabs :deep(.wd-tabs__line) {
  height: 6rpx;
  border-radius: 999rpx;
}

.order-tabs :deep(.wd-tabs__container) {
  background: transparent;
}

.order-tabs :deep(.wd-tab__body) {
  box-sizing: border-box;
}

.order-list {
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

.order-card {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  border: 1rpx solid #f3f4f6;
}

.order-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #f9fafb;
  margin-bottom: 20rpx;
}

.order-id {
  flex: 1;
  font-size: 24rpx;
  color: #6b7280;
  word-break: break-all;
}

.status {
  flex-shrink: 0;
  font-size: 28rpx;
  font-weight: 500;
}

.status-pending_payment {
  color: #ef4444;
}

.status-pending_service {
  color: #3b82f6;
}

.status-completed {
  color: #22c55e;
}

.status-cancelled {
  color: #9ca3af;
}

.status-refund {
  color: #f97316;
}

.order-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24rpx;
  margin-bottom: 8rpx;
}

.order-main {
  flex: 1;
  min-width: 0;
}

.order-title {
  display: block;
  font-size: 30rpx;
  line-height: 1.4;
  font-weight: 700;
  color: #1f2937;
}

.order-subtitle {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #6b7280;
  line-height: 1.5;
}

.order-price {
  flex-shrink: 0;
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

.order-date,
.order-meta {
  display: block;
  font-size: 24rpx;
  line-height: 1.7;
  color: #9ca3af;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16rpx;
  margin-top: 24rpx;
}

.countdown-wrap {
  flex: 1;
  min-width: 0;
}

.order-tag {
  display: inline-flex;
  align-items: center;
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: #fff5f5;
  font-size: 22rpx;
  color: #a60000;
}

.order-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 16rpx;
}

.btn-outline {
  padding: 12rpx 30rpx;
  border-radius: 999rpx;
  border: 1rpx solid #d1d5db;
}

.btn-text {
  font-size: 24rpx;
  color: #4b5563;
}

.btn-primary {
  padding: 12rpx 30rpx;
  border-radius: 999rpx;
  background: #a60000;
}

.btn-primary-text {
  font-size: 24rpx;
  color: #ffffff;
}
</style>
