<template>
  <view class="page">
    <z-paging
      layout-only
      class="service-paging"
      :fixed="false"
      :show-scrollbar="false"
      :refresher-enabled="false"
      use-page-scroll
    >
      <template #top>
        <view class="header">
          <view class="header-safe-area" :style="{ height: `${safeAreaTop}px` }" />
          <view class="tab-switcher">
            <view
              class="tab-item"
              :class="{ 'tab-item-active': activeTab === 'charter' }"
              @click="activeTab = 'charter'"
            >
              <text class="tab-item-text">旅游包车/接送</text>
            </view>
            <view
              class="tab-item"
              :class="{ 'tab-item-active': activeTab === 'guide' }"
              @click="activeTab = 'guide'"
            >
              <text class="tab-item-text">潮汕导游预约</text>
            </view>
          </view>

          <view v-if="activeTab === 'guide'" class="search-bar">
            <AppIcon class="search-icon" name="search" size="16" color="#9ca3af" />
            <input
              v-model="searchText"
              class="search-input"
              type="text"
              placeholder="搜索导游、标签..."
              confirm-type="search"
            />
          </view>
        </view>
      </template>

      <view class="page-content">
        <view v-if="activeTab === 'charter'" class="charter-section">
          <view class="charter-card">
            <view class="card-title-row">
              <AppIcon class="card-title-icon" name="car" size="20" color="#a60000" />
              <text class="card-title">预约包车</text>
            </view>

            <view class="form-group">
              <text class="field-label">选择车型</text>
              <picker :range="vehicleOptions" :value="vehiclePickerValue" @change="handleVehicleChange">
                <view class="picker-field">
                  <text
                    class="picker-text"
                    :class="{ 'picker-placeholder': selectedVehicle === '' }"
                  >
                    {{ selectedVehicle || '请选择车型' }}
                  </text>
                </view>
              </picker>
            </view>

            <view class="form-group">
              <text class="field-label">目的地/行程</text>
              <picker
                :range="destinationOptions"
                :value="destinationPickerValue"
                @change="handleDestinationChange"
              >
                <view class="picker-field picker-field-with-icon">
                  <AppIcon class="field-icon" name="map-pin" size="16" color="#9ca3af" />
                  <text
                    class="picker-text"
                    :class="{ 'picker-placeholder': selectedDestination === '' }"
                  >
                    {{ selectedDestination || '请选择目的地或行程安排' }}
                  </text>
                </view>
              </picker>
            </view>

            <view class="form-group">
              <text class="field-label">预约时间</text>
              <view class="time-group">
                <view class="time-field">
                  <AppIcon class="field-icon" name="clock" size="16" color="#9ca3af" />
                  <picker mode="date" :value="appointmentDate" @change="handleDateChange">
                    <view class="time-picker-trigger">
                      <text
                        class="picker-text"
                        :class="{ 'picker-placeholder': !appointmentDate }"
                      >
                        {{ appointmentDate || '选择日期' }}
                      </text>
                    </view>
                  </picker>
                </view>
                <view class="time-divider" />
                <view class="time-field time-field-compact">
                  <picker mode="time" :value="appointmentTime" @change="handleTimeChange">
                    <view class="time-picker-trigger">
                      <text
                        class="picker-text"
                        :class="{ 'picker-placeholder': !appointmentTime }"
                      >
                        {{ appointmentTime || '选择时间' }}
                      </text>
                    </view>
                  </picker>
                </view>
              </view>
            </view>

            <view class="price-row">
              <view>
                <text class="price-label">价格</text>
                <view v-if="computedPrice !== null" class="price-value-wrap">
                  <text class="price-currency">¥</text>
                  <text class="price-value">{{ computedPrice }}</text>
                </view>
                <text v-else class="price-empty">--</text>
              </view>

              <view
                class="order-button"
                :class="{ 'order-button-disabled': computedPrice === null }"
                @click="handleOrder"
              >
                <text class="order-button-text">立即下单</text>
              </view>
            </view>
          </view>

          <view class="contact-button" @click="goChat">
            <AppIcon class="phone-icon" name="phone" size="16" color="#a60000" />
            <text class="contact-button-text">联系客服定制行程</text>
          </view>
        </view>

        <view v-else class="guide-grid">
          <view
            v-for="guide in filteredGuides"
            :key="guide.name"
            class="guide-card"
            @click="goGuideDetail(guide)"
          >
            <image class="guide-image" :src="guide.img" mode="aspectFill" />
            <view class="guide-content">
              <view>
                <text class="guide-name">{{ guide.name }}</text>
                <view class="guide-tags">
                  <text
                    v-for="tag in guide.tags.slice(0, 2)"
                    :key="tag"
                    class="guide-tag"
                  >
                    {{ tag }}
                  </text>
                </view>
              </view>
              <text class="guide-orders">已售 {{ guide.orders }} 单</text>
            </view>
          </view>

          <view v-if="filteredGuides.length === 0" class="empty-state">
            <text class="empty-text">未找到相关导游</text>
          </view>
        </view>

        <view class="tabbar-spacer" />
      </view>
    </z-paging>

    <CustomTabbar />
  </view>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import CustomTabbar from '@/components/CustomTabbar/index.vue'
import { useNavStore } from '@/store/useNavStore'
import { useTabbarStore } from '@/store/useTabbarStore'

const tabbarStore = useTabbarStore()
const navStore = useNavStore()
const safeAreaTop = ref(0)

const activeTab = ref('charter')
const searchText = ref('')
const vehicleIndex = ref(-1)
const destinationIndex = ref(-1)
const appointmentDate = ref('')
const appointmentTime = ref('')

const vehicleOptions = [
  '5座 经济型轿车',
  '5座 舒适型轿车',
  '7座 商务车 (别克GL8等)',
  '14座 中巴车',
]

const destinationOptions = [
  '揭阳潮汕机场接送机',
  '汕头站 -> 南澳岛',
  '潮州古城一日游包车',
  '汕头美食打卡专车',
  '普宁英歌舞观赏专线',
]

const guides = [
  {
    name: '林导 (阿林)',
    tags: ['潮汕土著', '美食活地图'],
    orders: 128,
    img: 'https://picsum.photos/seed/guide1/300/400',
  },
  {
    name: '陈导 (小陈)',
    tags: ['历史文化', '摄影跟拍'],
    orders: 85,
    img: 'https://picsum.photos/seed/guide2/300/400',
  },
  {
    name: '黄导 (大黄)',
    tags: ['南澳岛环岛', '赶海体验'],
    orders: 204,
    img: 'https://picsum.photos/seed/guide3/300/400',
  },
  {
    name: '李导 (老李)',
    tags: ['英歌舞解说', '非遗体验'],
    orders: 312,
    img: 'https://picsum.photos/seed/guide4/300/400',
  },
]

onMounted(() => {
  const { statusBarHeight } = uni.getSystemInfoSync()
  safeAreaTop.value = statusBarHeight || 0
  tabbarStore.tabbarIndex = 1
})

const vehiclePickerValue = computed(() => (vehicleIndex.value >= 0 ? vehicleIndex.value : 0))
const destinationPickerValue = computed(() => (destinationIndex.value >= 0 ? destinationIndex.value : 0))

const selectedVehicle = computed(() => (
  vehicleIndex.value >= 0 ? vehicleOptions[vehicleIndex.value] : ''
))

const selectedDestination = computed(() => (
  destinationIndex.value >= 0 ? destinationOptions[destinationIndex.value] : ''
))

const computedPrice = computed(() => {
  if (!selectedVehicle.value || !selectedDestination.value) {
    return null
  }

  let basePrice = 0

  if (selectedDestination.value.includes('接送机')) {
    basePrice = 120
  } else if (selectedDestination.value.includes('南澳岛')) {
    basePrice = 300
  } else if (selectedDestination.value.includes('一日游')) {
    basePrice = 400
  } else {
    basePrice = 200
  }

  if (selectedVehicle.value.includes('舒适')) {
    basePrice += 50
  } else if (selectedVehicle.value.includes('商务')) {
    basePrice += 150
  } else if (selectedVehicle.value.includes('中巴')) {
    basePrice += 300
  }

  return basePrice
})

const filteredGuides = computed(() => {
  const keyword = searchText.value.trim().toLowerCase()
  if (!keyword) {
    return guides
  }

  return guides.filter((guide) => {
    const joinedTags = guide.tags.join(' ')
    return `${guide.name} ${joinedTags}`.toLowerCase().includes(keyword)
  })
})

const handleVehicleChange = (event) => {
  vehicleIndex.value = Number(event.detail.value)
}

const handleDestinationChange = (event) => {
  destinationIndex.value = Number(event.detail.value)
}

const handleDateChange = (event) => {
  appointmentDate.value = event.detail.value
}

const handleTimeChange = (event) => {
  appointmentTime.value = event.detail.value
}

const handleOrder = () => {
  if (computedPrice.value === null) {
    return
  }

  uni.showToast({
    title: '行程需求已生成',
    icon: 'success',
  })
}

const goChat = () => {
  uni.navigateTo({ url: '/pages/chat/index' })
}

const goGuideDetail = (guide) => {
  navStore.setParams({
    name: guide.name,
    tags: guide.tags,
    orders: guide.orders,
    img: guide.img,
  })
  uni.navigateTo({ url: '/pages/guide-detail/index' })
}
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background: #f9fafb;
}

.service-paging {
  height: 100vh;
  background: #f9fafb;
}

.header {
  z-index: 40;
  padding: 24rpx 32rpx 32rpx;
  background: #a60000;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.08);
}

.header-safe-area {
  width: 100%;
}

.tab-switcher {
  display: flex;
  padding: 8rpx;
  border-radius: 24rpx;
  background: rgba(0, 0, 0, 0.1);
}

.tab-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 76rpx;
  border-radius: 18rpx;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
}

.tab-item-active {
  background: #ffffff;
  color: #a60000;
  box-shadow: 0 6rpx 14rpx rgba(0, 0, 0, 0.08);
}

.tab-item-text {
  font-size: 28rpx;
  font-weight: 700;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-top: 24rpx;
  padding: 0 24rpx;
  height: 76rpx;
  border-radius: 999rpx;
  background: #ffffff;
  color: #9ca3af;
  box-shadow: 0 6rpx 14rpx rgba(0, 0, 0, 0.08);
}

.search-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  margin-left: 12rpx;
  font-size: 26rpx;
  color: #1f2937;
  background: transparent;
}

.page-content {
  padding: 32rpx;
  padding-top: 100rpx;
  box-sizing: border-box;
}

.charter-section {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.charter-card {
  padding: 32rpx;
  border: 2rpx solid #f3f4f6;
  border-radius: 24rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 18rpx rgba(15, 23, 42, 0.05);
}

.card-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 28rpx;
  color: #a60000;
}

.card-title-icon {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
}

.card-title {
  margin-left: 14rpx;
  font-size: 32rpx;
  font-weight: 700;
  color: #1f2937;
}

.form-group + .form-group {
  margin-top: 24rpx;
}

.form-group picker,
.time-field picker {
  display: block;
  width: 100%;
}

.field-label {
  display: block;
  margin-bottom: 10rpx;
  font-size: 22rpx;
  color: #6b7280;
}

.picker-field,
.time-group {
  border: 2rpx solid #e5e7eb;
  border-radius: 18rpx;
  background: #f9fafb;
}

.picker-field {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 88rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
}

.picker-field-with-icon {
  padding-left: 20rpx;
}

.field-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
  color: #9ca3af;
}

.picker-text {
  display: block;
  font-size: 26rpx;
  color: #1f2937;
  line-height: 1.4;
}

.picker-placeholder {
  color: #9ca3af;
}

.picker-field-with-icon .picker-text {
  margin-left: 12rpx;
}

.time-group {
  display: flex;
  align-items: stretch;
  overflow: hidden;
}

.time-field {
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 88rpx;
  padding: 0 20rpx;
}

.time-field-compact {
  flex: 0.92;
}

.time-picker-trigger {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 88rpx;
}

.time-divider {
  width: 2rpx;
  background: #e5e7eb;
}

.price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 36rpx;
  padding-top: 28rpx;
  border-top: 2rpx solid #f3f4f6;
}

.price-label {
  display: block;
  font-size: 22rpx;
  color: #6b7280;
}

.price-value-wrap {
  display: flex;
  align-items: baseline;
  margin-top: 8rpx;
  color: #a60000;
}

.price-currency {
  font-size: 32rpx;
  font-weight: 700;
}

.price-value {
  margin-left: 4rpx;
  font-size: 52rpx;
  line-height: 1;
  font-weight: 800;
}

.price-empty {
  display: block;
  margin-top: 8rpx;
  font-size: 42rpx;
  line-height: 1;
  color: #9ca3af;
  font-weight: 700;
}

.order-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 220rpx;
  height: 84rpx;
  padding: 0 36rpx;
  border-radius: 999rpx;
  background: #a60000;
  box-shadow: 0 10rpx 18rpx rgba(166, 0, 0, 0.18);
}

.order-button-disabled {
  background: #e5e7eb;
  box-shadow: none;
}

.order-button-text {
  font-size: 26rpx;
  color: #ffffff;
  font-weight: 600;
}

.contact-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  min-height: 92rpx;
  border: 2rpx solid #a60000;
  border-radius: 24rpx;
  background: #ffffff;
  color: #a60000;
}

.phone-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

.contact-button-text {
  font-size: 28rpx;
  font-weight: 600;
}

.guide-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
  justify-content: space-between;
  padding-top: 8rpx;
}

.guide-card {
  display: flex;
  flex-direction: column;
  width: calc((100% - 24rpx) / 2);
  min-height: 480rpx;
  overflow: hidden;
  border: 2rpx solid #f3f4f6;
  border-radius: 20rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 18rpx rgba(15, 23, 42, 0.05);
  box-sizing: border-box;
}

.guide-image {
  width: 100%;
  height: 320rpx;
  flex-shrink: 0;
}

.guide-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  padding: 18rpx 18rpx 16rpx;
  box-sizing: border-box;
}

.guide-name {
  display: block;
  font-size: 26rpx;
  color: #1f2937;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.guide-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-top: 10rpx;
}

.guide-tag {
  max-width: 100%;
  padding: 4rpx 10rpx;
  border: 2rpx solid #fee2e2;
  border-radius: 10rpx;
  background: #fef2f2;
  color: #a60000;
  font-size: 18rpx;
  line-height: 1.2;
}

.guide-orders {
  font-size: 20rpx;
  color: #9ca3af;
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220rpx;
  border-radius: 24rpx;
  background: #ffffff;
}

.empty-text {
  font-size: 26rpx;
  color: #9ca3af;
}

.tabbar-spacer {
  height: 140rpx;
}
</style>
