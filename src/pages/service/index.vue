<template>
  <view class="page">
    <!-- Header with tabs -->
    <view class="header">
      <view class="tab-bar">
        <view
          class="tab-item"
          :class="{ 'tab-active': activeTab === 'charter' }"
          @click="activeTab = 'charter'"
        >
          <text>旅游包车/接送</text>
        </view>
        <view
          class="tab-item"
          :class="{ 'tab-active': activeTab === 'guide' }"
          @click="activeTab = 'guide'"
        >
          <text>潮汕导游预约</text>
        </view>
      </view>

      <!-- Search bar (guide tab only) -->
      <view v-if="activeTab === 'guide'" class="search-wrap">
        <input
          class="search-input"
          type="text"
          placeholder="搜索导游、标签..."
          v-model="searchText"
        />
      </view>
    </view>

    <!-- Charter service content -->
    <view v-if="activeTab === 'charter'" class="content">
      <view class="form-card">
        <text class="form-title">选择目的地</text>
        <picker
          mode="selector"
          :range="destinationOptions"
          :value="destinationIndex"
          @change="onDestinationChange"
        >
          <view class="picker-display">
            <text class="picker-text">{{ destinationOptions[destinationIndex] }}</text>
            <text class="picker-arrow">▾</text>
          </view>
        </picker>
      </view>

      <view class="form-card">
        <text class="form-title">选择车型</text>
        <picker
          mode="selector"
          :range="vehicleOptions"
          :value="vehicleIndex"
          @change="onVehicleChange"
        >
          <view class="picker-display">
            <text class="picker-text">{{ vehicleOptions[vehicleIndex] }}</text>
            <text class="picker-arrow">▾</text>
          </view>
        </picker>
      </view>

      <view class="form-card">
        <text class="form-title">出发日期</text>
        <picker mode="date" :value="selectedDate" @change="onDateChange">
          <view class="picker-display">
            <text class="picker-text">{{ selectedDate || '请选择日期' }}</text>
            <text class="picker-arrow">▾</text>
          </view>
        </picker>
      </view>

      <view class="form-card">
        <text class="form-title">出发时间</text>
        <picker mode="time" :value="selectedTime" @change="onTimeChange">
          <view class="picker-display">
            <text class="picker-text">{{ selectedTime || '请选择时间' }}</text>
            <text class="picker-arrow">▾</text>
          </view>
        </picker>
      </view>

      <!-- Price display -->
      <view class="price-card">
        <view class="price-row">
          <text class="price-label">预估费用</text>
          <text class="price-value">¥{{ computedPrice }}</text>
        </view>
        <text class="price-hint">实际价格以客服确认为准</text>
      </view>

      <!-- Submit -->
      <view class="submit-btn" @click="handleSubmit">
        <text class="submit-text">立即预约</text>
      </view>

      <!-- Contact -->
      <view class="contact-btn" @click="goChat">
        <text class="contact-text">联系客服</text>
      </view>
    </view>

    <!-- Guide service content -->
    <view v-else class="content">
      <view class="guide-grid">
        <view
          class="guide-card"
          v-for="guide in filteredGuides"
          :key="guide.id"
          @click="goGuideDetail(guide)"
        >
          <image class="guide-avatar" :src="guide.avatar" mode="aspectFill" />
          <view class="guide-info">
            <text class="guide-name">{{ guide.name }}</text>
            <text class="guide-nick">{{ guide.nickname }}</text>
            <view class="guide-tags">
              <text class="guide-tag" v-for="(tag, idx) in guide.tags" :key="idx">{{ tag }}</text>
            </view>
            <text class="guide-orders">{{ guide.orders }}单</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Bottom spacing for tabbar -->
    <view style="height: 120rpx" />
    <CustomTabbar />
  </view>
</template>

<script setup>
import { useNavStore } from '@/store/useNavStore'

const navStore = useNavStore()

const activeTab = ref('charter')
const searchText = ref('')

// Charter form state
const vehicleOptions = ['5座经济型', '5座舒适型', '7座商务车', '14座中巴']
const vehicleIndex = ref(0)

const destinationOptions = [
  '揭阳潮汕机场接送机',
  '汕头站→南澳岛',
  '潮州古城一日游包车',
  '汕头美食打卡专车',
  '普宁英歌舞观赏专线',
]
const destinationIndex = ref(0)

const selectedDate = ref('')
const selectedTime = ref('')

const onVehicleChange = (e) => {
  vehicleIndex.value = e.detail.value
}

const onDestinationChange = (e) => {
  destinationIndex.value = e.detail.value
}

const onDateChange = (e) => {
  selectedDate.value = e.detail.value
}

const onTimeChange = (e) => {
  selectedTime.value = e.detail.value
}

const computedPrice = computed(() => {
  const destName = destinationOptions[destinationIndex.value]
  let base = 200
  if (destName.includes('接送机')) base = 120
  else if (destName.includes('南澳岛')) base = 300
  else if (destName.includes('一日游')) base = 400

  const vehicleName = vehicleOptions[vehicleIndex.value]
  if (vehicleName.includes('舒适')) base += 50
  else if (vehicleName.includes('商务')) base += 150
  else if (vehicleName.includes('中巴')) base += 300

  return base
})

const handleSubmit = () => {
  if (!selectedDate.value || !selectedTime.value) {
    uni.showToast({ title: '请选择出发日期和时间', icon: 'none' })
    return
  }
  uni.showToast({ title: '预约成功，客服将联系您', icon: 'none' })
}

const goChat = () => {
  uni.navigateTo({ url: '/pages/chat/index' })
}

// Guide data
const guides = ref([
  {
    id: 1,
    name: '林导',
    nickname: '阿林',
    tags: ['潮汕土著', '美食活地图'],
    orders: 128,
    avatar: 'https://picsum.photos/seed/guide1/300/400',
  },
  {
    id: 2,
    name: '陈导',
    nickname: '小陈',
    tags: ['历史文化', '摄影跟拍'],
    orders: 85,
    avatar: 'https://picsum.photos/seed/guide2/300/400',
  },
  {
    id: 3,
    name: '黄导',
    nickname: '大黄',
    tags: ['南澳岛环岛', '赶海体验'],
    orders: 204,
    avatar: 'https://picsum.photos/seed/guide3/300/400',
  },
  {
    id: 4,
    name: '李导',
    nickname: '老李',
    tags: ['英歌舞解说', '非遗体验'],
    orders: 312,
    avatar: 'https://picsum.photos/seed/guide4/300/400',
  },
])

const filteredGuides = computed(() => {
  if (!searchText.value) return guides.value
  const q = searchText.value.toLowerCase()
  return guides.value.filter(
    (g) =>
      g.name.includes(q) ||
      g.nickname.includes(q) ||
      g.tags.some((t) => t.includes(q))
  )
})

const goGuideDetail = (guide) => {
  navStore.setParams({
    id: guide.id,
    name: guide.name,
    nickname: guide.nickname,
    tags: guide.tags,
    orders: guide.orders,
    avatar: guide.avatar,
  })
  uni.navigateTo({ url: '/pages/guide-detail/index' })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: #a60000;
  padding-top: env(safe-area-inset-top);
  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-bottom: 30rpx;
  position: sticky;
  top: 0;
  z-index: 40;
}

.tab-bar {
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  padding: 8rpx;
  border-radius: 20rpx;
  margin-top: 24rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 16rpx 0;
  border-radius: 16rpx;
  transition: all 0.3s;
  color: rgba(255, 255, 255, 0.8);
  font-size: 28rpx;
  font-weight: bold;
}

.tab-active {
  background: #ffffff;
  color: #a60000;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.search-wrap {
  margin-top: 24rpx;
}

.search-input {
  width: 100%;
  background: #ffffff;
  border-radius: 40rpx;
  padding: 16rpx 30rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.content {
  padding: 24rpx;
}

/* Charter form styles */
.form-card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.form-title {
  display: block;
  font-size: 26rpx;
  color: #666666;
  margin-bottom: 16rpx;
}

.picker-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f8f8;
  border-radius: 12rpx;
  padding: 20rpx 24rpx;
}

.picker-text {
  font-size: 30rpx;
  color: #333333;
}

.picker-arrow {
  font-size: 28rpx;
  color: #999999;
}

.price-card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

.price-label {
  font-size: 28rpx;
  color: #666666;
}

.price-value {
  font-size: 48rpx;
  font-weight: bold;
  color: #a60000;
}

.price-hint {
  display: block;
  font-size: 24rpx;
  color: #999999;
}

.submit-btn {
  background: #a60000;
  border-radius: 16rpx;
  padding: 26rpx 0;
  text-align: center;
  margin-bottom: 20rpx;
}

.submit-text {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
}

.contact-btn {
  background: #ffffff;
  border: 2rpx solid #a60000;
  border-radius: 16rpx;
  padding: 26rpx 0;
  text-align: center;
}

.contact-text {
  color: #a60000;
  font-size: 32rpx;
  font-weight: bold;
}

/* Guide grid styles */
.guide-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.guide-card {
  width: calc(50% - 10rpx);
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.guide-avatar {
  width: 100%;
  height: 320rpx;
}

.guide-info {
  padding: 20rpx;
}

.guide-name {
  display: block;
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
}

.guide-nick {
  display: block;
  font-size: 24rpx;
  color: #999999;
  margin-bottom: 12rpx;
}

.guide-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-bottom: 12rpx;
}

.guide-tag {
  font-size: 22rpx;
  color: #a60000;
  background: rgba(166, 0, 0, 0.08);
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.guide-orders {
  display: block;
  font-size: 24rpx;
  color: #999999;
}
</style>
