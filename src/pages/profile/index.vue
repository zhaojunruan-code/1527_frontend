<template>
  <view class="page">
    <!-- User Header -->
    <view class="user-header">
      <view class="user-info">
        <image
          class="avatar"
          src="https://picsum.photos/seed/user123/100/100"
          mode="aspectFill"
        />
        <view class="user-text">
          <text class="nickname">潮汕食客_8899</text>
          <text class="phone">138****5678</text>
        </view>
      </view>
    </view>

    <!-- Content Area -->
    <view class="content-area">
      <!-- Orders Section -->
      <view class="section-card">
        <view class="section-header" @click="goOrderList('all')">
          <text class="section-title">我的订单</text>
          <view class="see-all">
            <text class="see-all-text">全部订单</text>
            <text class="arrow">›</text>
          </view>
        </view>
        <view class="order-icons">
          <view class="order-icon-item" @click="goOrderList('pending_payment')">
            <view class="icon-circle icon-yellow">
              <text class="icon-text">💰</text>
            </view>
            <text class="icon-label">待支付</text>
            <view class="badge" />
          </view>
          <view class="order-icon-item" @click="goOrderList('pending_service')">
            <view class="icon-circle icon-blue">
              <text class="icon-text">⏳</text>
            </view>
            <text class="icon-label">待服务</text>
          </view>
          <view class="order-icon-item" @click="goOrderList('completed')">
            <view class="icon-circle icon-green">
              <text class="icon-text">✅</text>
            </view>
            <text class="icon-label">已完成</text>
          </view>
          <view class="order-icon-item" @click="goOrderList('cancelled')">
            <view class="icon-circle icon-gray">
              <text class="icon-text">✖</text>
            </view>
            <text class="icon-label">已取消</text>
          </view>
          <view class="order-icon-item" @click="goOrderList('refund')">
            <view class="icon-circle icon-purple">
              <text class="icon-text">🔄</text>
            </view>
            <text class="icon-label">退款售后</text>
          </view>
        </view>
      </view>

      <!-- Menu Section 1 -->
      <view class="section-card">
        <view class="menu-item" @click="goPage('/pages/favorite-list/index')">
          <view class="menu-left">
            <view class="menu-icon icon-rose">❤</view>
            <text class="menu-label">我的收藏</text>
          </view>
          <text class="arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/profile-edit/index')">
          <view class="menu-left">
            <view class="menu-icon icon-gray-text">⚙</view>
            <text class="menu-label">个人资料编辑</text>
          </view>
          <text class="arrow">›</text>
        </view>
        <view
          class="menu-item menu-item-last"
          @click="goPage('/pages/about-us/index')"
        >
          <view class="menu-left">
            <view class="menu-icon icon-blue-text">ℹ</view>
            <text class="menu-label">关于我们</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- Menu Section 2 -->
      <view class="section-card">
        <view class="menu-item" @click="goPage('/pages/chat/index')">
          <view class="menu-left">
            <view class="menu-icon icon-orange-text">🎧</view>
            <text class="menu-label">在线客服</text>
          </view>
          <text class="arrow">›</text>
        </view>
        <view class="menu-item menu-item-last" @click="showContact = true">
          <view class="menu-left">
            <view class="menu-icon icon-green-text">✉</view>
            <text class="menu-label">联系我们</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>
    </view>

    <!-- Bottom spacing for tabbar -->
    <view style="height: 120rpx" />

    <!-- Contact Modal -->
    <view v-if="showContact" class="modal-overlay" @click="showContact = false">
      <view class="modal-box" @click.stop>
        <view class="modal-icon-wrap">
          <text class="modal-phone-icon">📞</text>
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

.user-header {
  background: #a60000;
  padding-top: env(safe-area-inset-top);
  padding-left: 40rpx;
  padding-right: 40rpx;
  padding-bottom: 80rpx;
  border-radius: 0 0 60rpx 60rpx;
}

.user-info {
  display: flex;
  align-items: center;
  padding-top: 40rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.user-text {
  margin-left: 28rpx;
  display: flex;
  flex-direction: column;
}

.nickname {
  font-size: 38rpx;
  font-weight: bold;
  color: #ffffff;
}

.phone {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 8rpx;
}

.content-area {
  padding: 0 24rpx;
  margin-top: -40rpx;
  position: relative;
  z-index: 10;
}

.section-card {
  background: #ffffff;
  border-radius: 20rpx;
  margin-bottom: 24rpx;
  padding: 24rpx 28rpx;
  border: 1rpx solid #f0f0f0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
}

.see-all {
  display: flex;
  align-items: center;
}

.see-all-text {
  font-size: 24rpx;
  color: #999999;
}

.arrow {
  font-size: 30rpx;
  color: #cccccc;
  margin-left: 4rpx;
}

.order-icons {
  display: flex;
  justify-content: space-between;
  padding-top: 28rpx;
}

.order-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.icon-circle {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
}

.icon-text {
  font-size: 36rpx;
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

.icon-label {
  font-size: 22rpx;
  color: #666666;
}

.badge {
  position: absolute;
  top: -4rpx;
  right: 4rpx;
  width: 16rpx;
  height: 16rpx;
  background: #ff0000;
  border-radius: 50%;
  border: 2rpx solid #ffffff;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.menu-item-last {
  border-bottom: none;
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  margin-right: 20rpx;
}

.icon-rose {
  color: #e91e63;
}

.icon-gray-text {
  color: #757575;
}

.icon-blue-text {
  color: #2196f3;
}

.icon-orange-text {
  color: #ff9800;
}

.icon-green-text {
  color: #4caf50;
}

.menu-label {
  font-size: 28rpx;
  color: #444444;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60rpx;
}

.modal-box {
  background: #ffffff;
  border-radius: 32rpx;
  width: 100%;
  padding: 48rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  background: #fff0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
}

.modal-phone-icon {
  font-size: 44rpx;
}

.modal-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 12rpx;
}

.modal-desc {
  font-size: 26rpx;
  color: #999999;
  margin-bottom: 32rpx;
  text-align: center;
}

.modal-phone {
  font-size: 48rpx;
  font-weight: bold;
  color: #a60000;
  margin-bottom: 48rpx;
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
</style>
