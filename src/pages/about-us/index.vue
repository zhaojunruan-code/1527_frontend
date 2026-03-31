<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <text class="back-icon" @click="goBack">←</text>
      <text class="header-title">关于我们</text>
      <view class="header-spacer" />
    </view>

    <!-- Logo -->
    <view class="logo-section">
      <view class="logo-box">
        <text class="logo-text">潮</text>
      </view>
      <text class="app-name">潮汕·英歌行</text>
      <text class="version">Version 1.0.0</text>
    </view>

    <!-- About content -->
    <view class="content-section">
      <view class="about-card">
        <text class="section-title">我们的使命</text>
        <text class="about-text">
          "潮汕·英歌行"致力于为您提供最地道、最深度的潮汕本地游玩体验。我们深耕潮汕本地文化，汇聚了最优质的导游资源、最靠谱的包车服务以及最全面的游玩攻略。
        </text>
        <text class="section-title mt">核心服务</text>
        <text class="about-text">• 定制包车：舒适便捷的出行体验，覆盖潮汕全境。</text>
        <text class="about-text">• 资深导游：本地土著带您深入了解潮汕历史与风土人情。</text>
        <text class="about-text">• 精选攻略：实时更新的游玩指南，不错过任何精彩瞬间。</text>
        <text class="about-text mt">
          无论您是想近距离感受"中华战舞"英歌舞的震撼，还是想寻觅隐藏在街巷深处的地道美食，我们都能为您量身定制专属行程，让您的潮汕之旅不留遗憾。
        </text>
      </view>

      <!-- Links -->
      <view class="links-card">
        <view class="link-item">
          <text class="link-label">官方网站</text>
          <text class="link-value">www.chaoshan-travel.com</text>
        </view>
        <view class="link-item">
          <text class="link-label">服务协议</text>
          <text class="link-arrow">›</text>
        </view>
        <view class="link-item no-border">
          <text class="link-label">隐私政策</text>
          <text class="link-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- Footer -->
    <view class="footer">
      <text class="footer-text">Copyright © 2026 潮汕英歌行</text>
      <text class="footer-text">All Rights Reserved.</text>
    </view>
  </view>
</template>

<script setup>
const goBack = () => uni.navigateBack()
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
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
.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 0 60rpx;
}
.logo-box {
  width: 160rpx;
  height: 160rpx;
  background: #A60000;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(166,0,0,0.2);
}
.logo-text {
  color: #fff;
  font-size: 64rpx;
  font-weight: bold;
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
.mt {
  margin-top: 24rpx;
}
.about-text {
  font-size: 28rpx;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 8rpx;
  display: block;
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
.no-border { border-bottom: none; }
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
