<template>
  <view class="login-page">
    <image class="login-bg-image" src="/static/images/login-bg.png" mode="aspectFill" />
    <view class="login-content flex-1 flex flex-col items-center justify-center px-8">
      <view class="logo-box">
        <text class="logo-text">潮</text>
      </view>

      <text class="app-title">潮汕·英歌行</text>
      <text class="app-slogan">探索最地道的潮汕风物</text>

      <view class="w-full mt-16" @click="handleLogin">
        <view class="login-btn">
          <text class="login-btn-text">快捷登录</text>
        </view>
      </view>

      <view class="mt-6 flex items-center justify-center text-xs">
        <checkbox
          :checked="agreed"
          color="#A60000"
          style="transform: scale(0.6)"
          @click="agreed = !agreed"
        />
        <text class="text-gray-400">我已阅读并同意</text>
        <text class="link-text">《用户协议》</text>
        <text class="text-gray-400">和</text>
        <text class="link-text">《隐私政策》</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useTabbarStore } from '@/store/useTabbarStore'

const agreed = ref(true)
const tabbarStore = useTabbarStore()

const handleLogin = () => {
  if (!agreed.value) {
    uni.showToast({ title: '请先同意用户协议', icon: 'none' })
    return
  }

  tabbarStore.tabbarIndex = 0
  uni.reLaunch({ url: '/pages/home/index' })
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

.login-bg-image {
  position: absolute;
  top: -6%;
  left: -6%;
  width: 112%;
  height: 112%;
  z-index: 0;
}

.login-content {
  position: relative;
  z-index: 1;
}

.logo-box {
  width: 192rpx;
  height: 192rpx;
  background: #a60000;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 48rpx;
  box-shadow: 0 20rpx 40rpx rgba(166, 0, 0, 0.2);
}

.logo-text {
  color: #ffffff;
  font-weight: bold;
  font-size: 72rpx;
}

.app-title {
  font-size: 60rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 16rpx;
  letter-spacing: 4rpx;
}

.app-slogan {
  font-size: 28rpx;
  color: #6b7280;
  letter-spacing: 6rpx;
}

.login-btn {
  width: 100%;
  background: #a60000;
  border-radius: 100rpx;
  padding: 32rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16rpx 32rpx rgba(166, 0, 0, 0.3);
}

.login-btn:active {
  transform: scale(0.95);
}

.login-btn-text {
  color: #ffffff;
  font-weight: bold;
  font-size: 34rpx;
}

.link-text {
  color: #a60000;
  font-size: 24rpx;
}
</style>
