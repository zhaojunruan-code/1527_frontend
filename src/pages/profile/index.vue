<template>
  <view class="page">
    <z-paging
      layout-only
      class="profile-paging"
      :fixed="false"
      :show-scrollbar="false"
      :refresher-enabled="false"
      use-page-scroll
    >
      <template #top>
        <view class="header">
          <image class="header-bg-image" src="/static/images/home-top-bg.png" mode="scaleToFill" />
          <view class="header-content">
            <view class="header-safe-area" :style="{ height: `${safeAreaTop}px` }" />
            <view class="header-inner">
              <image class="header-logo" src="/static/images/app-logo.png" mode="aspectFit" />
              <text class="header-title">我的</text>
            </view>

            <view class="profile-card">
              <image class="avatar" src="https://picsum.photos/seed/user123/100/100" mode="aspectFill" />
              <view class="profile-text">
                <text class="nickname">潮汕游客_8899</text>
                <text class="phone">138****5678</text>
                <text class="profile-desc">探索潮汕英歌、包车、导游与目的地服务</text>
              </view>
            </view>
          </view>
        </view>
      </template>

      <view class="page-content">
        <view class="content-block section-block">
          <view class="section-header" @click="goOrderList('all')">
            <view class="section-title-wrap">
              <text class="section-title">我的订单</text>
            </view>
            <view class="see-all">
              <text class="section-more">全部订单</text>
              <image class="arrow-icon" src="/static/icons/lucide/chevron-right/cccccc.png" mode="aspectFit" />
            </view>
          </view>

          <view class="order-grid">
            <view class="order-item" @click="goOrderList('pending_payment')">
              <view class="grid-icon-wrap icon-yellow">
                <image class="order-icon-svg" src="/static/icons/lucide/wallet/8a6a00.png" mode="aspectFit" />
              </view>
              <text class="order-label">待支付</text>
              <view class="badge" />
            </view>

            <view class="order-item" @click="goOrderList('pending_service')">
              <view class="grid-icon-wrap icon-blue">
                <image class="order-icon-svg" src="/static/icons/lucide/clock/1565c0.png" mode="aspectFit" />
              </view>
              <text class="order-label">待服务</text>
            </view>

            <view class="order-item" @click="goOrderList('completed')">
              <view class="grid-icon-wrap icon-green">
                <image class="order-icon-svg" src="/static/icons/lucide/circle-check/2e7d32.png" mode="aspectFit" />
              </view>
              <text class="order-label">已完成</text>
            </view>

            <view class="order-item" @click="goOrderList('cancelled')">
              <view class="grid-icon-wrap icon-gray">
                <image class="order-icon-svg" src="/static/icons/lucide/circle-x/616161.png" mode="aspectFit" />
              </view>
              <text class="order-label">已取消</text>
            </view>

            <view class="order-item" @click="goOrderList('refund')">
              <view class="grid-icon-wrap icon-purple">
                <image class="order-icon-svg" src="/static/icons/lucide/refresh-ccw/7b1fa2.png" mode="aspectFit" />
              </view>
              <text class="order-label">退款售后</text>
            </view>
          </view>
        </view>

        <view class="content-block section-block">
          <view class="section-header">
            <view class="section-title-wrap">
              <text class="section-title">常用功能</text>
            </view>
          </view>

          <view class="menu-card">
            <view class="menu-item" @click="goPage('/pages/favorite-list/index')">
              <view class="menu-left">
                <view class="menu-icon icon-rose">
                  <image class="menu-icon-svg" src="/static/icons/lucide/heart/e91e63.png" mode="aspectFit" />
                </view>
                <text class="menu-label">我的收藏</text>
              </view>
              <image class="arrow-icon" src="/static/icons/lucide/chevron-right/cccccc.png" mode="aspectFit" />
            </view>

            <view class="menu-item" @click="goPage('/pages/profile-edit/index')">
              <view class="menu-left">
                <view class="menu-icon icon-gray-text">
                  <image class="menu-icon-svg" src="/static/icons/lucide/settings/757575.png" mode="aspectFit" />
                </view>
                <text class="menu-label">个人资料编辑</text>
              </view>
              <image class="arrow-icon" src="/static/icons/lucide/chevron-right/cccccc.png" mode="aspectFit" />
            </view>

            <view class="menu-item menu-item-last" @click="goPage('/pages/about-us/index')">
              <view class="menu-left">
                <view class="menu-icon icon-blue-text">
                  <image class="menu-icon-svg" src="/static/icons/lucide/info/2196f3.png" mode="aspectFit" />
                </view>
                <text class="menu-label">关于我们</text>
              </view>
              <image class="arrow-icon" src="/static/icons/lucide/chevron-right/cccccc.png" mode="aspectFit" />
            </view>
          </view>
        </view>

        <view class="content-block section-block">
          <view class="section-header">
            <view class="section-title-wrap">
              <text class="section-title">服务支持</text>
            </view>
          </view>

          <view class="menu-card">
            <view class="menu-item" @click="goPage('/pages/chat/index')">
              <view class="menu-left">
                <view class="menu-icon icon-orange-text">
                  <image class="menu-icon-svg" src="/static/icons/lucide/headphones/ff9800.png" mode="aspectFit" />
                </view>
                <text class="menu-label">在线客服</text>
              </view>
              <image class="arrow-icon" src="/static/icons/lucide/chevron-right/cccccc.png" mode="aspectFit" />
            </view>

            <view class="menu-item menu-item-last" @click="showContact = true">
              <view class="menu-left">
                <view class="menu-icon icon-green-text">
                  <image class="menu-icon-svg" src="/static/icons/lucide/mail/4caf50.png" mode="aspectFit" />
                </view>
                <text class="menu-label">联系我们</text>
              </view>
              <image class="arrow-icon" src="/static/icons/lucide/chevron-right/cccccc.png" mode="aspectFit" />
            </view>
          </view>
        </view>

        <view class="tabbar-spacer" />
      </view>
    </z-paging>

    <view v-if="showContact" class="modal-overlay" @click="showContact = false">
      <view class="modal-box" @click.stop>
        <view class="modal-icon-wrap">
          <image class="modal-phone-svg" src="/static/icons/lucide/phone/a60000.png" mode="aspectFit" />
        </view>
        <text class="modal-title">联系我们</text>
        <text class="modal-desc">客服工作时间：09:00 - 22:00</text>
        <text class="modal-phone">400-123-4567</text>
        <view class="modal-buttons">
          <view class="modal-btn modal-btn-cancel" @click="showContact = false">
            <text class="btn-cancel-text">取消</text>
          </view>
          <view class="modal-btn modal-btn-call" @click="callPhone">
            <text class="btn-call-text">呼叫</text>
          </view>
        </view>
      </view>
    </view>

    <CustomTabbar />
  </view>
</template>

<script setup>
import CustomTabbar from '@/components/CustomTabbar/index.vue'
import { useTabbarStore } from '@/store/useTabbarStore'

const tabbarStore = useTabbarStore()
const safeAreaTop = ref(0)

onMounted(() => {
  const { statusBarHeight } = uni.getSystemInfoSync()
  safeAreaTop.value = statusBarHeight || 0
  tabbarStore.tabbarIndex = 4
})

const showContact = ref(false)

const goOrderList = (tab) => {
  uni.navigateTo({ url: `/pages/order-list/index?tab=${tab}` })
}

const goPage = (url) => {
  uni.navigateTo({ url })
}

const callPhone = () => {
  uni.makePhoneCall({ phoneNumber: '4001234567' })
  showContact.value = false
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f5f5f5;
  position: relative;
}

.profile-paging {
  height: 100vh;
  background: #f5f5f5;
}

.header {
  background: #a60000;
  min-height: 356rpx;
  border-radius: 0 0 32rpx 32rpx;
  position: relative;
  z-index: 40;
  box-shadow: 0 4rpx 16rpx rgba(166, 0, 0, 0.3);
  overflow: hidden;
}

.header-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.header-content {
  position: relative;
  z-index: 1;
  padding: 0 30rpx 32rpx;
}

.header-safe-area {
  width: 100%;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 10rpx;
  padding-top: 24rpx;
}

.header-logo {
  width: 52rpx;
  height: 52rpx;
  flex-shrink: 0;
}

.header-title {
  font-family: Source Han Sans;
  font-size: 18px;
  font-weight: 500;
  color: #fed36d;
}

.profile-card {
  display: flex;
  align-items: center;
  margin-top: 28rpx;
  padding: 28rpx;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.28);
  flex-shrink: 0;
}

.profile-text {
  display: flex;
  flex-direction: column;
  margin-left: 24rpx;
}

.nickname {
  font-size: 38rpx;
  font-weight: 700;
  color: #ffffff;
}

.phone {
  margin-top: 8rpx;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.82);
}

.profile-desc {
  margin-top: 12rpx;
  font-size: 22rpx;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.72);
}

.page-content {
  padding-bottom: 24rpx;
}

.content-block {
  padding: 0 32rpx;
}

.section-block {
  margin-top: 28rpx;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.section-title-wrap {
  border-left: 8rpx solid #a60000;
  padding-left: 16rpx;
}

.section-title {
  font-size: 34rpx;
  font-weight: 700;
  color: #1f2937;
}

.see-all {
  display: flex;
  align-items: center;
}

.section-more {
  font-size: 24rpx;
  color: #6b7280;
}

.arrow-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 4rpx;
  display: block;
  flex-shrink: 0;
}

.order-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18rpx 0;
  padding: 34rpx 20rpx 28rpx;
  background: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
}

.order-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.order-icon-svg {
  width: 44rpx;
  height: 44rpx;
  display: block;
  flex-shrink: 0;
}

.order-label {
  font-size: 22rpx;
  color: #374151;
  font-weight: 500;
  text-align: center;
}

.badge {
  position: absolute;
  top: 0;
  right: 18rpx;
  width: 16rpx;
  height: 16rpx;
  background: #ff0000;
  border-radius: 50%;
  border: 2rpx solid #ffffff;
}

.icon-yellow {
  background: #fff8e1;
}

.icon-blue {
  background: #e3f2fd;
}

.icon-green {
  background: #e8f5e9;
}

.icon-gray {
  background: #f5f5f5;
}

.icon-purple {
  background: #f3e5f5;
}

.menu-card {
  background: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 116rpx;
  padding: 0 28rpx;
  border-bottom: 1rpx solid #f3f4f6;
}

.menu-item-last {
  border-bottom: none;
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.menu-icon-svg {
  width: 40rpx;
  height: 40rpx;
  display: block;
  flex-shrink: 0;
}

.icon-rose {
  background: rgba(233, 30, 99, 0.1);
}

.icon-gray-text {
  background: rgba(117, 117, 117, 0.1);
}

.icon-blue-text {
  background: rgba(33, 150, 243, 0.1);
}

.icon-orange-text {
  background: rgba(255, 152, 0, 0.1);
}

.icon-green-text {
  background: rgba(76, 175, 80, 0.1);
}

.menu-label {
  font-size: 28rpx;
  color: #1f2937;
  font-weight: 500;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60rpx;
  background: rgba(0, 0, 0, 0.5);
}

.modal-box {
  width: 100%;
  padding: 48rpx;
  border-radius: 32rpx;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: #fff0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
}

.modal-phone-svg {
  width: 48rpx;
  height: 48rpx;
  display: block;
  flex-shrink: 0;
}

.modal-title {
  margin-bottom: 12rpx;
  font-size: 34rpx;
  font-weight: 700;
  color: #333333;
}

.modal-desc {
  margin-bottom: 32rpx;
  font-size: 26rpx;
  color: #999999;
  text-align: center;
}

.modal-phone {
  margin-bottom: 48rpx;
  font-size: 48rpx;
  font-weight: 700;
  color: #a60000;
}

.modal-buttons {
  display: flex;
  width: 100%;
  gap: 20rpx;
}

.modal-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-btn-cancel {
  border: 1rpx solid #e0e0e0;
}

.btn-cancel-text {
  font-size: 28rpx;
  color: #666666;
  font-weight: 500;
}

.modal-btn-call {
  background: #a60000;
}

.btn-call-text {
  font-size: 28rpx;
  color: #ffffff;
  font-weight: 500;
}

.tabbar-spacer {
  height: 140rpx;
}
</style>
