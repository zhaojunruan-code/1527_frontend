<template>
  <view class="page">
    <!-- Header -->
    <view class="header">
      <text class="back-icon" @click="goBack">←</text>
      <text class="header-title">个人资料编辑</text>
      <view class="header-spacer" />
    </view>

    <view class="body">
      <!-- Avatar -->
      <view class="avatar-card">
        <view class="avatar-wrap">
          <image src="https://picsum.photos/seed/user123/100/100" class="avatar-img" mode="aspectFill" />
          <view class="camera-badge">
            <text class="camera-icon">📷</text>
          </view>
        </view>
        <text class="avatar-hint">点击更换头像</text>
      </view>

      <!-- Form -->
      <view class="form-card">
        <view class="form-item">
          <text class="form-label">昵称</text>
          <input type="text" v-model="nickname" class="form-input" />
        </view>
        <view class="form-item">
          <text class="form-label">手机号</text>
          <input type="text" v-model="phone" class="form-input" />
        </view>
        <view class="form-item">
          <text class="form-label">性别</text>
          <picker :range="genderOptions" @change="onGenderChange" :value="genderIndex">
            <text class="form-input picker-text">{{ genderOptions[genderIndex] }}</text>
          </picker>
        </view>
        <view class="form-item no-border">
          <text class="form-label">个性签名</text>
          <input type="text" v-model="signature" placeholder="介绍一下自己吧" class="form-input" />
        </view>
      </view>

      <!-- Save -->
      <view class="save-btn" @click="handleSave">
        <text class="save-text">保存修改</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const nickname = ref('潮汕食客_8899')
const phone = ref('138****5678')
const signature = ref('')
const genderOptions = ['保密', '男', '女']
const genderIndex = ref(0)

const onGenderChange = (e) => {
  genderIndex.value = e.detail.value
}

const goBack = () => uni.navigateBack()

const handleSave = () => {
  uni.showToast({ title: '保存成功', icon: 'success' })
  setTimeout(() => uni.navigateBack(), 1000)
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f9fafb;
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
.body {
  padding: 24rpx;
}
.avatar-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 48rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1rpx solid #f3f4f6;
  margin-bottom: 24rpx;
}
.avatar-wrap {
  position: relative;
  width: 160rpx;
  height: 160rpx;
}
.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.camera-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48rpx;
  height: 48rpx;
  background: #A60000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4rpx solid #fff;
}
.camera-icon {
  font-size: 22rpx;
}
.avatar-hint {
  font-size: 24rpx;
  color: #9ca3af;
  margin-top: 16rpx;
}
.form-card {
  background: #fff;
  border-radius: 20rpx;
  border: 1rpx solid #f3f4f6;
  overflow: hidden;
  margin-bottom: 40rpx;
}
.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 30rpx;
  border-bottom: 1rpx solid #f9fafb;
}
.no-border {
  border-bottom: none;
}
.form-label {
  font-size: 28rpx;
  color: #374151;
  width: 160rpx;
  flex-shrink: 0;
}
.form-input {
  flex: 1;
  text-align: right;
  font-size: 28rpx;
  color: #1f2937;
}
.picker-text {
  text-align: right;
  width: 100%;
}
.save-btn {
  background: #A60000;
  border-radius: 999rpx;
  padding: 24rpx;
  text-align: center;
}
.save-text {
  color: #fff;
  font-size: 30rpx;
  font-weight: 500;
}
</style>
