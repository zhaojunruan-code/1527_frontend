<template>
  <view class="page">
    <view class="header">
      <text class="back-icon" @click="goBack">←</text>
      <text class="header-title">位置详情</text>
      <view class="header-spacer" />
    </view>

    <view class="map-area">
      <view class="map-grid" />
      <view class="map-road-h" />
      <view class="map-road-v" />
      <view class="marker-wrap">
        <view class="marker-label">
          <text class="marker-name">{{ detail.name || "目标位置" }}</text>
        </view>
        <text class="marker-pin">📍</text>
      </view>
    </view>

    <view class="info-panel">
      <view class="info-top">
        <view class="info-text">
          <text class="info-name">{{ detail.name || "目标位置" }}</text>
          <text class="info-address">{{ detail.address || "-" }}</text>
        </view>
        <view class="nav-btn" @click="openNav">
          <text class="nav-icon">🧭</text>
        </view>
      </view>
      <view class="action-row">
        <view class="action-btn">
          <text class="action-text">打车前往</text>
        </view>
        <view class="action-btn">
          <text class="action-text">周边探索</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useNavStore } from "@/store/useNavStore"

const navStore = useNavStore()
const detail = ref({})

onLoad(() => {
  detail.value = navStore.params || {}
})

const goBack = () => uni.navigateBack()

const openNav = () => {
  uni.openLocation({
    latitude: Number(detail.value.latitude || 23.6567),
    longitude: Number(detail.value.longitude || 116.63318),
    name: detail.value.name || "目标位置",
    address: detail.value.address || "-",
    fail: () => {
      uni.showToast({ title: "暂不支持打开地图", icon: "none" })
    },
  })
}
</script>

<style scoped lang="scss">
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
}

.header {
  display: flex;
  align-items: center;
  padding: 80rpx 30rpx 24rpx;
  background: #fff;
  flex-shrink: 0;
  z-index: 40;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
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

.header-spacer {
  width: 60rpx;
}

.map-area {
  flex: 1;
  position: relative;
  background: #e5e3df;
  overflow: hidden;
}

.map-grid {
  position: absolute;
  inset: 0;
  opacity: 0.5;
  background-image: radial-gradient(#d1d1d1 2px, transparent 2px);
  background-size: 30px 30px;
}

.map-road-h {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 8rpx;
  background: #fff;
  transform: translateY(-50%) rotate(12deg);
}

.map-road-v {
  position: absolute;
  top: 0;
  left: 50%;
  width: 8rpx;
  height: 100%;
  background: #fff;
  transform: translateX(-50%) rotate(-12deg);
}

.marker-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-label {
  background: #fff;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 8rpx;
}

.marker-name {
  font-size: 26rpx;
  font-weight: bold;
  color: #1f2937;
  white-space: nowrap;
}

.marker-pin {
  font-size: 56rpx;
}

.info-panel {
  background: #fff;
  border-radius: 32rpx 32rpx 0 0;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
  padding: 36rpx;
  flex-shrink: 0;
  z-index: 10;
}

.info-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.info-text {
  flex: 1;
}

.info-name {
  font-size: 34rpx;
  font-weight: bold;
  color: #1f2937;
  display: block;
}

.info-address {
  font-size: 26rpx;
  color: #6b7280;
  margin-top: 8rpx;
  display: block;
}

.nav-btn {
  width: 88rpx;
  height: 88rpx;
  background: #a60000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(166, 0, 0, 0.2);
}

.nav-icon {
  font-size: 40rpx;
}

.action-row {
  display: flex;
  gap: 20rpx;
  margin-top: 36rpx;
}

.action-btn {
  flex: 1;
  background: #f3f4f6;
  border-radius: 20rpx;
  padding: 24rpx;
  text-align: center;
}

.action-text {
  font-size: 28rpx;
  color: #374151;
  font-weight: 500;
}
</style>
