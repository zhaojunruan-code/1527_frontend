<template>
  <view class="page">
    <wd-navbar fixed placeholder :title="detail.name || pageTitle" left-arrow safeAreaInsetTop @click-left="goBack" />

    <view v-if="currentType === 3" class="logo-section">
      <view class="logo-box">
        <image class="logo-image" :src="projectLogo" mode="aspectFit" />
      </view>
      <text class="app-name">潮汕·英歌行</text>
      <text class="version">Version 1.0.0</text>
    </view>

    <view class="content-section">
      <view class="about-card">
        <text class="section-title">{{ detail.name || pageTitle }}</text>
        <text class="about-time">更新时间：{{ detail.createtime_text || "-" }}</text>
        <rich-text class="about-richtext" :nodes="detail.content || ''" />
      </view>

      <view class="links-card">
        <!-- <view class="link-item" @click="openWebsite">
          <text class="link-label">官方网站</text>
          <text class="link-value">www.chaoshan-travel.com</text>
        </view> -->
        <view class="link-item" @click="goType(1)">
          <text class="link-label">服务协议</text>
          <text class="link-arrow">›</text>
        </view>
        <view class="link-item no-border" @click="goType(2)">
          <text class="link-label">隐私政策</text>
          <text class="link-arrow">›</text>
        </view>
      </view>
    </view>

    <view v-if="currentType === 3" class="footer">
      <text class="footer-text">Copyright © 2026 潮汕·英歌行</text>
      <text class="footer-text">All Rights Reserved.</text>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { useSiteConfigStore } from "@/store/useSiteConfigStore"
import { getTravelRichtextDetail } from "@/api/travel"
import { DEFAULT_PROJECT_LOGO } from "@/utils/siteConfig"

const currentType = ref(3)
const detail = ref({})
const siteConfigStore = useSiteConfigStore()
const projectLogo = computed(() => siteConfigStore.logoUrl || DEFAULT_PROJECT_LOGO)

const pageTitle = computed(() => {
  if (currentType.value === 1) return "用户协议"
  if (currentType.value === 2) return "隐私政策"
  return "关于我们"
})

const loadDetail = async () => {
  const response = await getTravelRichtextDetail({ type: currentType.value })
  if (response.code === 200 && response.data) {
    detail.value = response.data
  }
}

onLoad(async (options) => {
  currentType.value = Number(options?.type || 3)
  await Promise.allSettled([loadDetail(), siteConfigStore.loadSiteConfig()])
})

const goBack = () => uni.navigateBack()

const goType = (type) => {
  if (type === currentType.value) {
    return
  }

  uni.redirectTo({ url: `/pages/about-us/index?type=${type}` })
}

const openWebsite = () => {
  uni.setClipboardData({
    data: "www.chaoshan-travel.com",
  })
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 0 60rpx;
}

.logo-box {
  width: 160rpx;
  height: 160rpx;
  background: #a60000;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(166, 0, 0, 0.2);
}

.logo-image {
  width: 104rpx;
  height: 104rpx;
  display: block;
}

.app-name {
  font-size: 38rpx;
  font-weight: bold;
  color: #1f2937;
}

.version {
  font-size: 26rpx;
  color: #6b7280;
  margin-top: 8rpx;
}

.content-section {
  padding: 0 30rpx;
  flex: 1;
}

.about-card {
  background: #fff;
  padding: 36rpx;
  border-radius: 20rpx;
  border: 1rpx solid #f3f4f6;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 16rpx;
  display: block;
}

.about-time {
  display: block;
  margin-bottom: 20rpx;
  font-size: 24rpx;
  color: #9ca3af;
}

.about-richtext {
  font-size: 28rpx;
  color: #4b5563;
  line-height: 1.7;
}

.about-richtext :deep(p) {
  display: block;
  margin-bottom: 16rpx;
}

.links-card {
  background: #fff;
  border-radius: 20rpx;
  border: 1rpx solid #f3f4f6;
  overflow: hidden;
}

.link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 30rpx;
  border-bottom: 1rpx solid #f9fafb;
}

.no-border {
  border-bottom: none;
}

.link-label {
  font-size: 28rpx;
  color: #374151;
}

.link-value {
  font-size: 28rpx;
  color: #6b7280;
}

.link-arrow {
  font-size: 32rpx;
  color: #d1d5db;
}

.footer {
  padding: 80rpx 0 40rpx;
  text-align: center;
}

.footer-text {
  font-size: 24rpx;
  color: #9ca3af;
  display: block;
  line-height: 1.6;
}
</style>
