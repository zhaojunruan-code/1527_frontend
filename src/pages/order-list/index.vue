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
          <view v-if="ordersByTab[tab.id].length === 0" class="empty">
            <text class="empty-text">暂无相关订单</text>
          </view>

          <view
            v-for="order in ordersByTab[tab.id]"
            :key="order.id"
            class="order-card"
            @click="viewDetail(order)"
          >
            <view class="order-head">
              <text class="order-id">订单号: {{ order.id }}</text>
              <text :class="['status', `status-${order.status}`]">{{ getStatusText(order.status) }}</text>
            </view>

            <view class="order-body">
              <text class="order-title">{{ order.title }}</text>
              <text class="order-price">¥{{ order.price }}</text>
            </view>

            <text class="order-date">预约时间: {{ order.date }}</text>

            <view class="order-footer">
              <view class="countdown-wrap">
                <text v-if="order.status === 'pending_payment'" class="countdown">
                  支付剩余 {{ getCountdown(order.id) }}
                </text>
              </view>

              <view class="order-actions">
                <template v-if="order.status === 'pending_payment'">
                  <view class="btn-outline" @click.stop>
                    <text class="btn-text">取消订单</text>
                  </view>
                  <view class="btn-primary" @click.stop>
                    <text class="btn-primary-text">立即支付</text>
                  </view>
                </template>

                <template v-if="order.status === 'pending_service'">
                  <view class="btn-outline" @click.stop>
                    <text class="btn-text">取消订单</text>
                  </view>
                  <view class="btn-outline" @click.stop>
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
import { useNavStore } from '@/store/useNavStore'

const navStore = useNavStore()
const activeTab = ref('all')
const safeAreaTop = ref(0)
const countdowns = ref({})
let timers = {}

const tabs = [
  { id: 'all', label: '全部' },
  { id: 'pending_payment', label: '待支付' },
  { id: 'pending_service', label: '待服务' },
  { id: 'completed', label: '已完成' },
  { id: 'cancelled', label: '已取消' },
  { id: 'refund', label: '退款/售后' },
]

const orders = ref([
  {
    id: 'ORD2026032301',
    title: '南澳岛一日游包车',
    type: 'charter',
    status: 'pending_payment',
    price: 300,
    date: '2026-03-23 10:00',
    orderTime: '2026-03-22 14:30',
    vehicle: '5座 舒适型轿车',
    destination: '汕头站 -> 南澳岛',
  },
  {
    id: 'ORD2026032205',
    title: '林导 (阿林) - 全天预约',
    type: 'guide',
    status: 'pending_service',
    price: 300,
    date: '2026-03-24 09:00',
    orderTime: '2026-03-21 09:15',
    guideName: '林导 (阿林)',
    guideImg: 'https://picsum.photos/seed/guide1/100/100',
  },
  {
    id: 'ORD2026032012',
    title: '潮州古城深度游',
    type: 'charter',
    status: 'completed',
    price: 299,
    date: '2026-03-20 14:00',
    orderTime: '2026-03-18 10:00',
    vehicle: '7座 商务车',
    destination: '潮州古城一日游包车',
  },
  {
    id: 'ORD2026031808',
    title: '汕头站接送机',
    type: 'charter',
    status: 'cancelled',
    price: 120,
    date: '2026-03-18 15:30',
    orderTime: '2026-03-17 20:00',
    vehicle: '5座 经济型轿车',
    destination: '揭阳潮汕机场 -> 汕头市区',
  },
  {
    id: 'ORD2026031502',
    title: '李导 (老李) - 按小时预约',
    type: 'guide',
    status: 'refund',
    price: 150,
    date: '2026-03-15 08:00',
    orderTime: '2026-03-10 11:20',
    guideName: '李导 (老李)',
    guideImg: 'https://picsum.photos/seed/guide4/100/100',
  },
])

const tabsOffsetTop = computed(() => safeAreaTop.value + 44)

const ordersByTab = computed(() => {
  return tabs.reduce((result, tab) => {
    result[tab.id] = tab.id === 'all' ? orders.value : orders.value.filter(order => order.status === tab.id)
    return result
  }, {})
})

const getStatusText = (status) => {
  const map = {
    pending_payment: '待支付',
    pending_service: '待服务',
    completed: '已完成',
    cancelled: '已取消',
    refund: '退款/售后',
  }
  return map[status] || ''
}

const getCountdown = (orderId) => {
  const val = countdowns.value[orderId]
  if (!val || val <= 0) return '00:00'
  const m = Math.floor(val / 60).toString().padStart(2, '0')
  const s = (val % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const clearCountdowns = () => {
  Object.values(timers).forEach(timer => clearInterval(timer))
  timers = {}
}

const startCountdowns = () => {
  clearCountdowns()

  orders.value.forEach((order) => {
    if (order.status !== 'pending_payment') return

    countdowns.value[order.id] = 900
    timers[order.id] = setInterval(() => {
      if (countdowns.value[order.id] > 0) {
        countdowns.value[order.id]--
      } else {
        clearInterval(timers[order.id])
      }
    }, 1000)
  })
}

onLoad((options) => {
  const { statusBarHeight } = uni.getSystemInfoSync()
  safeAreaTop.value = statusBarHeight || 0

  if (options && options.tab) {
    activeTab.value = options.tab
  }

  startCountdowns()
})

onUnload(() => {
  clearCountdowns()
})

const goBack = () => uni.navigateBack()

const viewDetail = (order) => {
  navStore.setParams(order)
  uni.navigateTo({ url: '/pages/order-detail/index' })
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
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #f9fafb;
  margin-bottom: 20rpx;
}

.order-id {
  font-size: 24rpx;
  color: #6b7280;
}

.status {
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
  align-items: center;
  margin-bottom: 8rpx;
}

.order-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

.order-price {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

.order-date {
  display: block;
  font-size: 24rpx;
  color: #9ca3af;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24rpx;
}

.countdown {
  font-size: 24rpx;
  color: #ef4444;
  font-weight: 500;
}

.order-actions {
  display: flex;
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
